import { memo } from "react";
import { Link } from "react-router-dom";
import "../Header/style.scss";
import { FaFacebookSquare, FaUserAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="header_top">
        <div className="container">
          <div className="header-top-left">
            <ul>
              <li>
                <span>Chào mừng đến với hệ thống tra cứu biển số xe!</span>
              </li>
            </ul>
          </div>
          <div className="header-top-right">
            <ul>
              <li>
                <Link to={"https://www.facebook.com/share/g/42D8yxgkHYtAaxz2/"}>
                  <FaFacebookSquare className="social-icon" />
                </Link>
              </li>
              <li>
                <Link to={"/Login"}>
                  <FaUserAlt className="user-icon" />
                  <span> ĐĂNG NHẬP</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
