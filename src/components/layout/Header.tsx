import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<{ fullName: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <img
            src="https://toppng.com/uploads/preview/uniqlo-logo-vector-11573942521rp32cmu2vg.png"
            alt="UNIQLO"
            style={{ height: "40px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Sản phẩm
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Liên hệ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Giới thiệu
              </Link>
            </li>
          </ul>

          {/* Form tìm kiếm */}
          <form className="d-flex me-3" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>

          {/* Tài khoản, đơn hàng, giỏ hàng */}
          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  👤 {user.fullName}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        localStorage.removeItem("user");
                        setUser(null);
                        navigate("/");
                      }}
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="fas fa-user"></i> Đăng nhập
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                <i className="fas fa-box"></i> Đơn hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
