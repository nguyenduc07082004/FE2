// src/pages/ProductEdit.tsx
import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

type ProductForm = {
  name: string;
  price: number;
  image?: string;
  description?: string;
};

function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3001/products/${id}`);
      const data = await res.json();
      form.setFieldsValue(data);
    };
    fetchProduct();
  }, [id, form]);

  const onFinish = async (values: ProductForm) => {
    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      message.success("Cập nhật sản phẩm thành công!");
      navigate("/products");
    } catch {
      message.error("Lỗi khi cập nhật sản phẩm!");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Chỉnh sửa sản phẩm</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[
            { required: true, message: "Tên sản phẩm là bắt buộc" },
            { min: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá"
          rules={[
            { required: true, message: "Giá là bắt buộc" },
            {
              validator: (_, value) =>
                value >= 0
                  ? Promise.resolve()
                  : Promise.reject("Giá phải là số không âm"),
            },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="image" label="Ảnh (URL)">
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductEdit;
