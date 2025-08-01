// src/components/ProductCard.tsx
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Chuyển sang trang đơn hàng
    navigate("/ordersl");
  };

  return (
    <Card
      hoverable
      style={{ width: 250 }}
      cover={
        <img
          alt={product.name}
          src={product.image}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
    >
      <Meta
        title={product.name}
        description={`Giá: ${product.price.toLocaleString()}₫`}
      />
      <p style={{ marginTop: 8 }}>{product.description}</p>

      {/* Nút thêm vào giỏ hàng */}
      <Button
        type="primary"
        onClick={handleAddToCart}
        style={{ marginTop: 12, width: "100%" }}
      >
        🛒 Thêm vào giỏ
      </Button>
    </Card>
  );
};

export default ProductCard;
