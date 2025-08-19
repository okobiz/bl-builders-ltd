import {
  Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Switch,
  Table,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useServiceActions from "../hooks/useServiceActions";
import { truncateText } from "../helpers/truncateText";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";

const Service = () => {
  const { services, loading, createService, updateService, deleteService } =
    useServiceActions();
  const [expandedText, setExpandedText] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingService, setEditingService] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleCreateService = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("details", values.details || "");
      formData.append("isActive", values.isActive);

      // Only append the photo if it's being changed
      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingService) {
        await updateService(editingService._id, formData);
        setEditingService(null);
      } else {
        await createService(formData);
      }

      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Failed to save service", error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...service,
      isActive: service.isActive,
    });

    const imageUrl = `${API_BASE_URL}${service.image}`;
    setFileList([
      {
        uid: "-1",
        name: service.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteService(id);
    } catch (error) {
      message.error("Failed to delete service", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingService(null);
    setFileList([]);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Function to handle the toggle of expanded text
  const handleSeeMore = (id) => {
    setExpandedText((prevState) => (prevState === id ? null : id));
  };
  // console.log(services, "from services");

  const columns = [
    {
      title: "Product Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Product Details",
      dataIndex: "details",
      key: "details",
      render: (text, record) => {
        const isExpanded = expandedText === record._id;
        const safeText = text || "";
        return (
          <div>
            <span>
              {isExpanded ? text : truncateText(text)}{" "}
              {safeText.length > 100 && (
                <a
                  onClick={() => handleSeeMore(record._id)}
                  className="text-blue-500 hover:text-blue-600 cursor-pointer hover:border-b hover:border-b-blue-500"
                >
                  {isExpanded ? "See Less" : "See More"}
                </a>
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: "Media",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        // console.log(record)
        <img
          src={`${API_BASE_URL}${record.image}`}
          alt={record.title}
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Badge
          count={isActive ? "Yes" : "No"}
          style={{
            backgroundColor: isActive ? "#52c41a" : "#ff4d4f",
            color: "white",
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditService(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this service?"
            onConfirm={() => handleDeleteService(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div className="bg-white my-6 p-8 rounded-md">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All Product</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={services}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingService ? "Edit Service" : "Create Service"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateService} layout="vertical">
          <Form.Item name="title" label="Product Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="details"
            label="Product Details"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Service Image"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              rules={[{ required: true }]}
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            {editingService ? "Update Service" : "Create Service"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Service;
