import { Layout, Menu, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.css";

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar bên trái */}
      <Sider width={250} theme="dark" className={styles.sider}>
        <div className={styles.logo}>
          <h2>Admin Panel</h2>
        </div>
        <Menu theme="dark" mode="vertical" className={styles.menu}>
          <Menu.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="categories">
            <Link to="/categories">Quản lý danh mục</Link>
          </Menu.Item>
          <Menu.Item key="products">
            <Link to="/products">Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="users">
            <Link to="/users">Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key="orders">
            <Link to="/orders">Quản lý đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="brands">
            <Link to="/brands">Quản lý thương hiệu</Link>
          </Menu.Item>
          <Menu.Item key="reports">
            <Link to="/reports">Thống kê doanh thu</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Nội dung bên phải */}
      <Layout className={styles.mainLayout}>
        <div className={styles.header}>
          <h2>Admin Dashboard</h2>
          <Button danger onClick={handleLogout}>Đăng xuất</Button>
        </div>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
