const Footer = () => {
  return (
    <footer className="bg-light text-dark py-5 border-top">
      <div className="container">
        <div className="row">
          {/* Cột 1: Về Uniqlo */}
          <div className="col-md-3">
            <h6 className="fw-bold">Về Uniqlo</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Thông tin</a></li>
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Danh sách cửa hàng</a></li>
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Cơ hội nghề nghiệp</a></li>
            </ul>
          </div>

          {/* Cột 2: Trợ giúp */}
          <div className="col-md-3">
            <h6 className="fw-bold">Trợ giúp</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>FAQ</a></li>
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Chính sách trả hàng</a></li>
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Chính sách bảo mật</a></li>
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Tiếp cận</a></li>
            </ul>
          </div>

          {/* Cột 3: Tài khoản */}
          <div className="col-md-3">
            <h6 className="fw-bold">Tài khoản</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Tư cách thành viên</a></li>
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Hồ sơ</a></li>
              <li><a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Coupons</a></li>
            </ul>
          </div>

          {/* Cột 4: Bản tin điện tử */}
          <div className="col-md-3">
            <h6 className="fw-bold">Bản tin điện tử</h6>
            <p className="small">
              Đăng ký ngay để nhận thông tin về sản phẩm mới, chương trình khuyến mãi & sự kiện.
            </p>
            <a href="#" className="fw-bold text-dark" onClick={e => e.preventDefault()}>ĐĂNG KÝ NGAY</a>
          </div>
        </div>

        <hr className="border-dark my-4" />

        {/* Tài khoản xã hội */}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0 small">
              Cài đặt cookies | <a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>English</a> | <a href="#" className="text-dark text-decoration-none" onClick={e => e.preventDefault()}>Tiếng Việt</a>
            </p>
          </div>
          <div>
            <a href="#" className="text-dark me-3" onClick={e => e.preventDefault()}><i className="fab fa-facebook fa-lg"></i></a>
            <a href="#" className="text-dark me-3" onClick={e => e.preventDefault()}><i className="fab fa-instagram fa-lg"></i></a>
            <a href="#" className="text-dark me-3" onClick={e => e.preventDefault()}><i className="fab fa-youtube fa-lg"></i></a>
            <a href="#" className="text-dark" onClick={e => e.preventDefault()}><i className="fab fa-tiktok fa-lg"></i></a>
          </div>
        </div>

        <hr className="border-dark my-4" />

        {/* Bản quyền */}
        <div className="text-center">
          <p className="mb-0 small">BẢN QUYỀN THUỘC CÔNG TY TNHH UNIQLO. BẢO LƯU MỌI QUYỀN.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;