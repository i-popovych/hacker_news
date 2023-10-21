import React from "react";
import { NewsItem } from "./NewsItem.jsx";

const news = [
  {
    rating: 3,
    authorName: "author 2",
    linkToNews: "https://google.com",
    postingHours: "6 hours ago",
    commentsCount: 50,
  },
  {
    rating: 5,
    authorName: "author 1",
    linkToNews: "https://google.com",
    postingHours: "3 hours ago",
    commentsCount: 500,
  },
  {
    rating: 5,
    authorName: "author 1",
    linkToNews: "https://google.com",
    postingHours: "3 hours ago",
    commentsCount: 500,
  },
  {
    rating: 5,
    authorName: "author 1",
    linkToNews: "https://google.com",
    postingHours: "3 hours ago",
    commentsCount: 500,
  },
  {
    rating: 5,
    authorName: "author 1",
    linkToNews: "https://google.com",
    postingHours: "3 hours ago",
    commentsCount: 500,
  },
  {
    rating: 5,
    authorName: "author 1",
    linkToNews: "https://google.com",
    postingHours: "3 hours ago",
    commentsCount: 500,
  },
  {
    rating: 5,
    authorName: "author 1",
    linkToNews: "https://google.com",
    postingHours: "3 hours ago",
    commentsCount: 500,
  },
];

export const NewsBlock = () => {
  return (
    <div className="news-block">
      <header className="news-block__header">
        <div className="news-block__logo">
          <p>News</p>
        </div>

        <div>
          <button className="news-block__submit-bth bth">
            <pre>+ Submit</pre>
          </button>
        </div>
      </header>

      <main className="news-block__list news-list">
        {news.map((newsItem, index) => (
          <NewsItem key={newsItem.linkToNews} ordinalItem={index + 1} {...newsItem} />
        ))}
      </main>
    </div>
  );
};
