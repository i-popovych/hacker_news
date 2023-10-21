import React from "react";
import { useParams } from "react-router-dom";

const NewsItem = () => {
  const { newsId } = useParams();

  return <div>{newsId}</div>;
};

export default NewsItem;
