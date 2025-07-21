import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import HomeButton from "./HomeButton";


function CategoryList() {
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const columns = [
    {
      title: "So thu tu",
      dataIndex: "id",
    },
    {
      title: "Ten danh muc",
      dataIndex: "name",
    },
  ];

  return (
    <div>
        <h1>Danh sách danh mục</h1>
        <HomeButton/>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
      />
    </div>
  );
}

export default CategoryList;