// src/pages/ProductCreate.tsx
import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";
type ProductForm = {
  name: string;
  price: number;
  image?: string;
  description?: string;
};


function ProductCreate() {
  const navigate = useNavigate();

  const onFinish = async (values: ProductForm) => {
    try {
      await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      message.success("Thêm sản phẩm thành công!");
      navigate("/products");
    } catch  {
      message.error("Lỗi khi thêm sản phẩm!");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Thêm sản phẩm</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
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
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductCreate;
