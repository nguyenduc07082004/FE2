import { useQuery } from "@tanstack/react-query";
import { Row, Col, Spin, Alert } from "antd";
import ProductCard from "./ProductCard";
import { useProductSearch } from "../hook/search";
import ProductSearchForm from "../form/SearchForm";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId?: string;
};

function removeVietnameseTones(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

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

  const { searchText, setSearchText, handleSearch, rawKeyword } = useProductSearch();

  const filteredData = products.filter((product) => {
    const name = removeVietnameseTones(product.name || "");
    const keyword = removeVietnameseTones(rawKeyword);
    return name.includes(keyword);
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
    <div>
      <ProductSearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
      />
      <Row gutter={[16, 16]}>
        {filteredData.map((product) => (
          <Col span={6} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductListClient;