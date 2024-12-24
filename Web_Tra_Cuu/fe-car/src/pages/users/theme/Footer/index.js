import { memo } from "react";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Tra cứu biển số xe</h2>
          <p>
            Cam kết không chịu trách nhiệm cho bất cứ trường hợp nào <br />
            Vì đây chỉ là tham khảo để đảm bảo rằng xe hoàn toàn bình thường thì
            nên đến gara kiểm tra
          </p>
        </div>
        <div className="footer-links">
          <h3>Liên Kết</h3>
          <ul>
            <li>
              <a href="#home">Trang chủ</a>
            </li>
            <li>
              <a href="#about">Giới thiệu</a>
            </li>
            <li>
              <a href="#contact">Liên hệ</a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Mạng Xã Hội</h3>
          <ul>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Tra Cứu Biển Số Xe. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default memo(Footer);
