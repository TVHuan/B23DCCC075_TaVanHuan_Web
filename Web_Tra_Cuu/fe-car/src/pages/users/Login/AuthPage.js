import React, { useState } from "react";
import axios from "axios";
import "./AthPage.scss";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Quản lý trạng thái đăng nhập hoặc đăng ký
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        ten_dang_nhap: tenDangNhap,
        mat_khau: matKhau,
      });
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setMessage(error.response?.data?.error || "Lỗi không xác định");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        ten_dang_nhap: tenDangNhap,
        mat_khau: matKhau,
        vai_tro: "user", // Vai trò mặc định là "user"
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Lỗi không xác định");
    }
  };

  return (
    <div className="form-container">
      {isLogin ? (
        <div className="form-wrapper">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Tên đăng nhập:</label>
              <input
                type="text"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu:</label>
              <input
                type="password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Đăng nhập
            </button>
          </form>
          {message && <p className="message">{message}</p>}
          <p onClick={() => setIsLogin(false)} className="toggle-link">
            Chưa có tài khoản? Đăng ký
          </p>
        </div>
      ) : (
        <div className="form-wrapper">
          <h2>Đăng ký tài khoản</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Tên đăng nhập:</label>
              <input
                type="text"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu:</label>
              <input
                type="password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Đăng ký
            </button>
          </form>
          {message && <p className="message">{message}</p>}
          <p onClick={() => setIsLogin(true)} className="toggle-link">
            Đã có tài khoản? Đăng nhập
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
