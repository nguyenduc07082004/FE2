import { Card } from "antd";

const { Meta } = Card;

type Product = {
  id: string
  name: string;
  price: number;
  image: string;
  description: string;
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  if (!product) return null;

  return (
    <Card
      hoverable
      style={{ width: 250 }}
      cover={
        <img
          alt={product.name}
          src={product.image || "https://via.placeholder.com/250x200"}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
    >
      <Meta
        title={product.name}
        description={`Giá: ${product.price.toLocaleString()}₫`}
      />
      <p style={{ marginTop: 8 }}>{product.description}</p>
    </Card>
  );
};

export default ProductCard;
