import {
  // Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  // Switch,
  Table,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useBrochureActions from "../hooks/useBrochureActions";
import { truncateText } from "../helpers/truncateText";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";
import { extractYouTubeId } from "../helpers/extractYouTubeId";

const Brochure = () => {
  const { brochures, loading, createBrochure, updateBrochure, deleteBrochure } =
    useBrochureActions();
  const [expandedDetailsText, setExpandedDetailsText] = useState(null);
  const [expandedDescriptionText, setExpandedDescriptionText] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBrochure, setEditingBrochure] = useState(null);
  const [imageFileList, setImageFileList] = useState([]);
  const [imageTwoFileList, setImageTwoFileList] = useState([]);
  const [pdfFileList, setPdfFileList] = useState([]);

  const handleCreateBrochure = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("detail", values.detail || "");
      formData.append("description", values.description || "");
      formData.append("quote", values.quote || "");
      formData.append("honorName", values.honorName || "");
      formData.append("honorDesignation", values.honorDesignation || "");
      formData.append("video", values.video || "");
      // formData.append("isActive", values.isActive);

      // Only append the photo if it's being changed
      if (values.image1 && values.image1.file) {
        formData.append("image1", values.image1.file);
      }

      if (values.image2 && values.image2.file) {
        formData.append("image2", values.image2.file);
      }

      if (values.pdf && values.pdf.file) {
        formData.append("pdf", values.pdf.file);
      }

      if (editingBrochure) {
        await updateBrochure(editingBrochure._id, formData);
        setEditingBrochure(null);
      } else {
        await createBrochure(formData);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save brochure", error);
    }
  };

  const handleEditBrochure = (brochure) => {
    setEditingBrochure(brochure);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...brochure,
      isActive: brochure.isActive,
    });

    const image1Url = `${API_BASE_URL}${brochure.image1}`;
    setImageFileList([
      {
        uid: "-1",
        name: brochure.image1.split("/").pop(),
        status: "done",
        url: image1Url,
      },
    ]);
    const image2Url = `${API_BASE_URL}${brochure.image2}`;
    setImageTwoFileList([
      {
        uid: "-1",
        name: brochure.image1.split("/").pop(),
        status: "done",
        url: image2Url,
      },
    ]);
    const pdf = `${API_BASE_URL}${brochure.pdf}`;
    setPdfFileList([
      {
        uid: "-1",
        name: brochure.pdf.split("/").pop(),
        status: "done",
        url: pdf,
      },
    ]);
  };

  const handleDeleteBrochure = async (id) => {
    try {
      await deleteBrochure(id);
    } catch (error) {
      message.error("Failed to delete brochure", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingBrochure(null);
    setImageFileList([]);
    setImageTwoFileList([]);
    setPdfFileList([]);
  };

  const handleImageFileChange = ({ fileList: newFileList }) => {
    setImageFileList(newFileList);
  };
  const handleImageTwoFileChange = ({ fileList: newFileList }) => {
    setImageTwoFileList(newFileList);
  };
  const handlePdfFileChange = ({ fileList: newFileList }) => {
    setPdfFileList(newFileList);
  };

  // Function to handle the toggle of expanded text
  const handleDetailsSeeMore = (id) => {
    setExpandedDetailsText((prevState) => (prevState === id ? null : id));
  };

  const handleDescriptionSeeMore = (id) => {
    setExpandedDescriptionText((prevState) => (prevState === id ? null : id));
  };

  const columns = [
    {
      title: "Heading",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        const isExpanded = expandedDescriptionText === record._id;
        const safeText = text || "";
        return (
          <div>
            <span>
              {isExpanded ? text : truncateText(text, 50)}{" "}
              {safeText.length > 50 && (
                <a
                  onClick={() => handleDescriptionSeeMore(record._id)}
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
      title: "Details",
      dataIndex: "detail",
      key: "detail",
      render: (text, record) => {
        const isExpanded = expandedDetailsText === record._id;
        const safeText = text || "";
        return (
          <div>
            <span>
              {isExpanded ? text : truncateText(text, 50)}{" "}
              {safeText.length > 50 && (
                <a
                  onClick={() => handleDetailsSeeMore(record._id)}
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
      title: "Quote",
      dataIndex: "quote",
      key: "quote",
    },
    {
      title: "Honor Name",
      dataIndex: "honorName",
      key: "honorName",
    },
    {
      title: "Honor Designation",
      dataIndex: "honorDesignation",
      key: "honorDesignation",
    },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      render: (_, record) => {
        const videoId = extractYouTubeId(record.video);
        return (
          <div>
            {videoId ? (
              <iframe
                className="h-full w-full object-cover rounded duration-300"
                title={`Video player for ${record.title}`}
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                className="h-full w-full object-cover rounded duration-300"
                src={API_BASE_URL + record.video}
                controls
                aria-label="Video player"
              ></video>
            )}
          </div>
        );
      },
    },
    {
      title: "Image",
      render: (_, record) => (
        <div className="flex flex-col gap-4 rounded">
          <img
            src={`${API_BASE_URL}${record.image1}`}
            alt={record.title}
            style={{ width: "100px" }}
          />
          <img
            src={`${API_BASE_URL}${record.image2}`}
            alt={record.title}
            style={{ width: "100px" }}
          />
        </div>
      ),
    },
    {
      title: "Brochure",
      dataIndex: "pdf",
      key: "pdf",
      render: (_, record) =>
        record.pdf ? (
          <Button type="link">
            <a
              href={API_BASE_URL + record.pdf}
              download
              target="_blank"
              // rel="noopener noreferrer"
            >
              Download
            </a>
          </Button>
        ) : (
          <p>No Files.</p>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditBrochure(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this brochure?"
            onConfirm={() => handleDeleteBrochure(record._id)}
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
    <div className="w-full bg-white my-6 p-8 rounded-md">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Full Profile</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={brochures}
        columns={columns}
        rowKey="_id"
        loading={loading}
        scroll={{ x: "max-content" }}
      />

      <Modal
        title={editingBrochure ? "Edit Brochure" : "Create Brochure"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateBrochure} layout="vertical">
          <Form.Item name="title" label="Heading" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="detail"
            label="Details"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quote"
            label="Quote"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="honorName"
            label="Honor Name"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="honorDesignation"
            label="Honor Designation"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="video"
            label="Youtube Video URL"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item> */}
          <Form.Item
            name="image1"
            label="Upload Brochure Section Image no.: 1"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              rules={[{ required: true }]}
              fileList={imageFileList}
              onChange={handleImageFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="image2"
            label="Upload Brochure Section Image no.: 2"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              rules={[{ required: true }]}
              fileList={imageTwoFileList}
              onChange={handleImageTwoFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="pdf"
            label="Upload Brochure (.pdf)"
            valuePropName="file"
          >
            <Upload
              listType="pdf"
              beforeUpload={() => false}
              rules={[{ required: true }]}
              fileList={pdfFileList}
              onChange={handlePdfFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            {editingBrochure ? "Update Brochure" : "Create Brochure"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Brochure;
