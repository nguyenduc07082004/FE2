import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./styless.css";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Sai tài khoản hoặc mật khẩu!");
      }

      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      alert("Đăng nhập thành công!");
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err: any) {
      alert(err.message || "Lỗi kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-container">
        <button
          type="button"
          className="close-button"
          onClick={() => navigate("/")}
        >
          ✖
        </button>

        <h2 className="auth-title">Đăng nhập</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <input
            type="email"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            })}
            placeholder="Email *"
            className={`auth-input ${errors.email ? "input-error" : ""}`}
            disabled={loading}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          {/* Mật khẩu */}
          <input
            type="password"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            })}
            placeholder="Mật khẩu *"
            className={`auth-input ${errors.password ? "input-error" : ""}`}
            disabled={loading}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          {/* Nút đăng nhập */}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className="auth-divider">- Hoặc -</p>

        <p className="text-center">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
