// src/pages/ProductDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Image, Typography, Spin } from "antd";

const { Title, Paragraph } = Typography;

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Spin size="large" />;

  if (!product) return <p>Không tìm thấy sản phẩm!</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Button onClick={() => navigate(-1)}>⬅ Quay lại</Button>
      <Title level={2}>{product.name}</Title>
      <Image src={product.image} width={300} />
      <Paragraph><strong>Giá:</strong> {product.price.toLocaleString()} VND</Paragraph>
      <Paragraph><strong>Mô tả:</strong> {product.description}</Paragraph>
    </div>
  );
}

export default ProductDetail;
