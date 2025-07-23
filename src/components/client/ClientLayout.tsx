import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styles from "./ClientLayout.module.css";
import Banner from "../layout/Baner";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const { Content } = Layout;

const ClientLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Banner />
      <Header />
      <Content className={styles.content} style={{ minHeight: 400, padding: 24 }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default ClientLayout;