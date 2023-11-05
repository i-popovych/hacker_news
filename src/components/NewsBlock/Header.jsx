import React, {useContext} from 'react';
import img from "../../assets/logo.png";
import {NewsFilterContext} from "../../App.jsx";
import {fetchDataType} from "../../helpers/constants/index.js";

export const Header = () => {
  const {setFetchDataName} = useContext(NewsFilterContext)

  return (
    <header className="header">
      <div className="header__body">
        <div className="header__logo">
          <img src={img} alt="logo"/>
          <div>
            <span>The front page</span>
            <span>Powered by Hacker News</span>
          </div>
        </div>

        <div className="header__navigation">
          <nav className="navigation">
            <ul className="navigation__list">
              <li><a href="#" onClick={() => setFetchDataName(fetchDataType.TOP_NEWS)}>News</a></li>
              <li><a href="#">Comments</a></li>
              <li><a href="#" onClick={() => setFetchDataName(fetchDataType.SHOW)}>Show</a></li>
              <li><a href="#" onClick={() => setFetchDataName(fetchDataType.ASKS)}>Ask</a></li>
              <li><a href="#">Jobs</a></li>
            </ul>
            <div className="navigation__search search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </nav>
        </div>

        <div className="header__person-block person-block">
          <div className="person-block__left">
            <div className="person-block__img"><i className="fa-regular fa-circle-user"></i></div>
            <div className="person-block__name"><span>Lola T.</span></div>
          </div>
          <div className="person-block__expand-arrow"><i className="fa-solid fa-chevron-down"></i></div>
        </div>
      </div>
    </header>
  );
};

