import { useQuery } from "@tanstack/react-query";
import { Table, Typography } from "antd";
import HomeButton from "./HomeButton";

const { Title } = Typography;

interface Report {
  id: number;
  month: string; // Ví dụ: "2025-07"
  totalOrders: number;
  totalRevenue: number;
  bestSellingProduct: string;
}

function ReportList() {
  
  const fetchReports = async () => {
    const res = await fetch("http://localhost:3001/reports");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Report[]>({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });

  const columns = [
    {
      title: "Tháng",
      dataIndex: "month",
    },
    {
      title: "Tổng đơn hàng",
      dataIndex: "totalOrders",
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "totalRevenue",
      render: (revenue: number) =>
        revenue.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Sản phẩm bán chạy",
      dataIndex: "bestSellingProduct",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={3}>Thống kê doanh thu</Title>
       
            
      </div>

      {error && <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>}
       <HomeButton/>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ReportList;
