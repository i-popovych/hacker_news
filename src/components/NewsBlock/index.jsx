import React, { useEffect, useState } from "react";
import { NewsItem } from "./NewsItem.jsx";
import { hn } from "../../api/hn.api.js";
import { getPreparedNewsItems } from "./helpers/getPreparedNewsItems.js";
import { CircularProgress, Pagination } from "@mui/material";
import { styled } from "@mui/system";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: theme.palette.primary.main,
    backgroundColor: "white",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    fontSize: "20px",
    margin: "0 5px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  "& .Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

export const NewsBlock = () => {
  const [news, setNews] = useState(null);
  const [newsCounts, setNewsCount] = useState(0);
  const [newsPage, setNewsPage] = useState(1);
  const [newsLimit, setNewsLimit] = useState(10);

  useEffect(() => {
    const f = async () => {
      setNews(null);
      const result = await hn.getPopularNews(newsLimit, newsPage);

      if (result) {
        setNews(getPreparedNewsItems(result.newsList));
        setNewsCount(result.newsCount);
      }
    };

    f();
  }, [newsPage]);

  const onPageChange = (event, value) => {
    setNewsPage(value);
  };

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
        {!news && (
          <div className="news-block__loading-box">
            <CircularProgress />
          </div>
        )}
        {news && news.map((newsItem, index) => (
          <NewsItem
            key={newsItem.title}
            ordinalItem={index + 1 + (newsPage - 1) * newsLimit}
            {...newsItem}
          />
        ))}
      </main>

      <div className="news-block__pagination pagination">
        <StyledPagination
          count={newsCounts / newsLimit}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};
