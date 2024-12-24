import { memo } from "react";
import AuthPage from "./AuthPage";

const LoginPage = () => {
  return (
    <div className="login-page">
      <AuthPage />
    </div>
  );
};

export default memo(LoginPage);
