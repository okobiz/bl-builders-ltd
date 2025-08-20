import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import useBrochureActions from "../hooks/useBrochureActions";
import { useState } from "react";

const Brochure = () => {
  const { brochures, loading, createBrochure, updateBrochure, deleteBrochure } =
    useBrochureActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBrochure, setEditingBrochure] = useState(null);

  // Create or Update Brochure
  const handleCreateBrochure = async (values) => {
    try {
      if (editingBrochure) {
        await updateBrochure(editingBrochure._id, values);
        setEditingBrochure(null);
      } else {
        await createBrochure(values);
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save brochure");
    }
  };

  // Edit Brochure
  const handleEditBrochure = (brochure) => {
    setEditingBrochure(brochure);
    setIsModalVisible(true);
    form.setFieldsValue(brochure);
  };

  // Delete Brochure
  const handleDeleteBrochure = async (id) => {
    try {
      await deleteBrochure(id);
    } catch (error) {
      message.error("Failed to delete brochure");
    }
  };

  // Cancel Modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingBrochure(null);
    form.resetFields();
  };

  // Table columns (Schema অনুযায়ী)
  const columns = [
    { title: "Heading", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Company Introduction",
      dataIndex: "companyIntroduction",
      key: "companyIntroduction",
    },
    { title: "Success Story", dataIndex: "successStory", key: "successStory" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditBrochure(record)}
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
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={brochures}
        columns={columns}
        rowKey="_id"
        loading={loading}
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
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="companyIntroduction" label="Company Introduction">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="successStory" label="Success Story">
            <Input.TextArea rows={3} />
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
