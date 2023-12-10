import React from "react";
import Footer from "../components/Footer.jsx";
import { NewsBlock } from "../components/NewsBlock/index.jsx";
import {Header} from "../components/NewsBlock/Header.jsx";
import {WrapperLayout} from "../components/wrapperLayout.jsx";

const MainPage = () => {

  return (
    <WrapperLayout >
      <div style={{flexGrow: 2}}>
        <NewsBlock/>
      </div>

    </WrapperLayout>
  );
};

export default MainPage;
