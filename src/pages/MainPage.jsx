import React from "react";
import Footer from "../components/Footer.jsx";
import { NewsBlock } from "../components/NewsBlock/index.jsx";
import {Header} from "../components/NewsBlock/Header.jsx";

const MainPage = () => {
  return (
    <div className="wrapper">
      <Header />
      <NewsBlock />
      <Footer />
    </div>
  );
};

export default MainPage;
