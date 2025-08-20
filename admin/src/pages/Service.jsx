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
  Select,
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

const { Option } = Select;

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
      formData.append("category", values.category || "");
      formData.append("location", values.location || "");
      formData.append("status", values.status || "");
      formData.append("isActive", values.isActive ? true : false);

      if (values.image && values.image[0]?.originFileObj) {
        formData.append("image", values.image[0].originFileObj);
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
      message.error("Failed to save service");
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setIsModalVisible(true);

    form.setFieldsValue({
      ...service,
      isActive: service.isActive,
      image: service.image
        ? [
            {
              uid: "-1",
              name: service.image.split("/").pop(),
              status: "done",
              url: `${API_BASE_URL}${service.image}`,
            },
          ]
        : [],
    });

    setFileList(
      service.image
        ? [
            {
              uid: "-1",
              name: service.image.split("/").pop(),
              status: "done",
              url: `${API_BASE_URL}${service.image}`,
            },
          ]
        : []
    );
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteService(id);
    } catch (error) {
      message.error("Failed to delete service");
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

  const handleSeeMore = (id) => {
    setExpandedText((prevState) => (prevState === id ? null : id));
  };

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
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Media",
    dataIndex: "image",
    key: "image",
    render: (_, record) => (
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
    <div className="bg-white my-6 p-8 rounded-md overflow-auto">
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
          {/* Title */}
          <Form.Item
            name="title"
            label="Product Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>

          {/* Details */}
          <Form.Item name="details" label="Product Details">
            <Input.TextArea rows={3} />
          </Form.Item>

          {/* Category */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              <Option value="land">Land</Option>
              <Option value="apartment">Apartment</Option>
            </Select>
          </Form.Item>

          {/* Location */}
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>

          {/* Status */}
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="delivered">Delivered</Option>
              <Option value="running">Running</Option>
              <Option value="upcoming">Upcoming</Option>
            </Select>
          </Form.Item>

          {/* Active */}
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>

          {/* Image */}
          <Form.Item
            name="image"
            label="Upload Service Image"
            valuePropName="fileList"
            getValueFromEvent={(e) =>
              Array.isArray(e) ? e : e?.fileList || []
            }
            rules={[
              { required: !editingService, message: "Image is required" },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          {/* Submit */}
          <Button type="primary" htmlType="submit" loading={loading}>
            {editingService ? "Update Service" : "Create Service"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Service;
