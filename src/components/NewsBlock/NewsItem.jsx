import React from "react";
import { getMainUrlName } from "../helpers/index.js";
import {NavLink} from "react-router-dom";

export const NewsItem = ({
  ordinalItem,
  rating,
  authorName,
  linkToNews,
  postingHours,
  commentsCount,
  title,
  id
}) => {
  const linkTitle = getMainUrlName(linkToNews);

  return (
    <article className="news-block__item news-item">
      <div className="news-item__ordinal-number">
        <p>{ordinalItem}</p>
      </div>
      <div className="news-item__rating">
        <i className="fa-solid fa-play"></i>
        <p>{rating}</p>
      </div>
      <div className="news-item__main-text">
        <NavLink to={"/news/" + id}>{title}</NavLink>
      </div>
      <div className="news-item__author-name">
        <i className="fa-solid fa-user"></i>
        <p>{authorName}</p>
      </div>
      <div className="news_item__link">
        <i className="fa-solid fa-link"></i>
        <a href={linkToNews}>{linkTitle}</a>
      </div>
      <div className="news-item__posting-hours">
        <i className="fa-solid fa-clock"></i>
        <p>{postingHours}</p>
      </div>
      <div className="news-item__comments-num">
        <i className="fa-solid fa-comment"></i>
        <p>{commentsCount}</p>
      </div>
      <div className="news-item__bookmark">
        <i className="fa-solid fa-bookmark"></i>
      </div>
    </article>
  );
};
