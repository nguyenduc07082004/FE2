import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Input, Popconfirm, Space, Table, message } from "antd";
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

// 🔍 Loại bỏ dấu tiếng Việt
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
  const queryClient = useQueryClient();

  const rawKeyword = searchParams.get("name") || "";
  const [searchText, setSearchText] = useState(rawKeyword);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // 🔥 Mutation: Xoá sản phẩm
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      message.success("Đã xoá sản phẩm");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Xoá thất bại");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const filteredData = data?.filter((product) => {
    const name = removeVietnameseTones(product.name || "");
    const keyword = removeVietnameseTones(rawKeyword);
    return name.includes(keyword);
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => <Link to={`/detail/${id}`}>ID: {id}</Link>,
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
    {
      title: "Actions",
      render: (_: unknown, record: Product) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/edit/${record.id}`)}>Sửa</Button>
          <Popconfirm
            title="Xác nhận xoá?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger type="link">Xoá</Button>
          </Popconfirm>
        </Space>
      ),
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
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <h1>Quản lý sản phẩm</h1>
          <Space>
            <HomeButton />
            <Button type="primary" onClick={() => navigate("/create")}>+ Thêm sản phẩm</Button>
          </Space>
        </div>

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
