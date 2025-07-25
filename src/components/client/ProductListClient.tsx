import { useQuery } from "@tanstack/react-query";
import { Row, Col, Spin, Alert } from "antd";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId?: string;
};

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:3001/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const ProductListClient = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Spin tip="Đang tải sản phẩm..." />;

  if (isError)
    return (
      <Alert
        message="Lỗi khi tải sản phẩm"
        description={(error as Error).message}
        type="error"
      />
    );

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col span={6} key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductListClient;