import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      icon={<HomeOutlined />}
      onClick={() => navigate("/")}
    >
      Trang chủ
    </Button>
  );
};

export default HomeButton;
