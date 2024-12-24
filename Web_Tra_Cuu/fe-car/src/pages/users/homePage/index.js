import { memo } from "react";
import Banner from "./Banner";
import AccidentCarList from "./AccidentCarList";
import AddBienso from "./AddBienso";

const HomePage = () => {
  return (
    <div className="home-page">
      <Banner />
      <AddBienso />
      <AccidentCarList />
    </div>
  );
};

export default memo(HomePage);
