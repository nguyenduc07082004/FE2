import { useQuery } from "@tanstack/react-query";
import { Image, Input, Table } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import HomeButton from "./HomeButton";

const { Search } = Input;

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

// 🔍 Hàm loại bỏ dấu tiếng Việt
function removeVietnameseTones(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function ProductList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Lấy keyword từ URL
  const rawKeyword = searchParams.get("name") || "";
  const [searchText, setSearchText] = useState(rawKeyword);

  // Fetch toàn bộ product từ json-server
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // 🔍 Lọc theo từ khóa không dấu
  const filteredData = data?.filter((product) => {
    const name = removeVietnameseTones(product.name || "");
    const keyword = removeVietnameseTones(rawKeyword);
    return name.includes(keyword);
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => <Link to={`/product/detail/${id}`}>ID: {id}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (src: string, record: Product) => (
        <Image src={src} width={100} alt={record.name} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];


  const handleSearch = (value: string) => {
    setSearchText(value);
    navigate(`?name=${value}`);
  };

  return (
    <div>
      <div style={{ padding: 20 }}>
        <Search
          placeholder="Tìm sản phẩm (có dấu hoặc không dấu)..."
          allowClear
          enterButton="Tìm"
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ maxWidth: 400, marginBottom: 20 }}
        />
        <h1>Quản lý sản phẩm</h1>
        <HomeButton/>


        {error && <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>}

        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

export default ProductList;
