import HomePage from "./pages/users/homePage/index";
import LoginPage from "./pages/users/Login/index";
import MasterLayout from "./pages/users/theme/masterLayout";
import { ROUTERS } from "./utils/router";
import { Routes, Route } from "react-router-dom";

const renderUserRouter = () => {
  const userRouter = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />,
      layout: true,
    },
    {
      path: ROUTERS.USER.LOGIN,
      component: <LoginPage />,
      layout: false,
    },
  ];

  return (
    <Routes>
      {userRouter.map((item, key) => {
        const Page = item.layout ? (
          <MasterLayout>{item.component}</MasterLayout>
        ) : (
          item.component
        );

        return <Route key={key} path={item.path} element={Page} />;
      })}
    </Routes>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
