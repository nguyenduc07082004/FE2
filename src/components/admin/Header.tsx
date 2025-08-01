import React, { useState } from "react";
import {
  ShopFilled,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Products",
    key: "/products",
    icon: <ShopFilled />,
  },
  {
    label: "Create Product",
    key: "/products/create",
    icon: <ShopFilled />,
  },
  {
    label: "Users",
    key: "/users",
    icon: <UserOutlined />,
  },
  {
    label: "Categories",
    key: "/categories",
    icon: <UnorderedListOutlined />,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

 const onClick: MenuProps["onClick"] = (e) => {
  setCurrent(e.key as string);
  navigate(e.key as string);
};

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;