import { Table, Button, InputNumber } from "antd";
import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId?: string;
  quantity?: number;
};

const OrderPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const handleDelete = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, record: CartItem) => (
        <InputNumber
          min={1}
          value={record.quantity || 1}
          onChange={(value) =>
            handleQuantityChange(record.id, value as number)
          }
        />
      ),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_: any, record: CartItem) =>
        `${(record.price * (record.quantity || 1)).toLocaleString()}₫`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: CartItem) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>🛒 Đơn hàng của bạn</h2>
      <Table
        dataSource={cartItems}
        columns={columns}
        rowKey="id"
        pagination={false}
        footer={() => (
          <div style={{ textAlign: "right", fontWeight: "bold" }}>
            Tổng tiền: {total.toLocaleString()}₫
          </div>
        )}
      />
    </div>
  );
};

export default OrderPage;
