import React, {useContext, useEffect, useState} from "react";
import { NewsItem } from "./NewsItem.jsx";
import { hn } from "../../api/hn.api.js";
import { getPreparedNewsItems } from "./helpers/getPreparedNewsItems.js";
import {CircularProgress, Pagination, useMediaQuery} from "@mui/material";
import { styled } from "@mui/system";
import {NewsFilterContext} from "../../App.jsx";
import {fetchDataType} from "../../helpers/constants/index.js";
import {isNewsExist} from "../../helpers/index.js";

const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export const NewsBlock = () => {
  const [items, setItems] = useState(null);
  const [itemsCount, setItemsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [newsSearch, setNewsSearch] = useState('');

  const sm = useMediaQuery('(max-width:600px)')

  const {fetchDataName, savedNews, handleSaveNews} = useContext(NewsFilterContext)


  const StyledPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
      color: theme.palette.primary.main,
      backgroundColor: "white",
      width: sm ? "18px" : "38px",
      height: sm ? "18px" : "38px",
      borderRadius: sm  ? null : "50%",
      fontSize: sm ? "10px" : "20px",
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

  useEffect(() => {
    const f = async () => {
      setItems(null);
      let items;
      let itemsCount;

      switch (fetchDataName) {
        case fetchDataType.TOP_NEWS: {
          const res = await hn.getPopularNews(limit, page)
          items = res.itemsList
          itemsCount = res.itemsCount
          break;
        }

        case fetchDataType.ASKS: {
          const res = await hn.getPopularAsks(limit, page)
          items = res.itemsList;
          itemsCount = res.itemsCount
          break
        }
      }

      if (items) {
        setItems(getPreparedNewsItems(items));
        setItemsCount(itemsCount);
      }
    };

    f();
  }, [page, fetchDataName]);

  const onPageChange = (event, value) => {
    setPage(value);
  };
  const handleSearchChange = (e) => {
    setNewsSearch(e.target.value);
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
        {!items && (
          <div className="news-block__loading-box">
            <CircularProgress />
          </div>
        )}
        {items && items.map((newsItem, index) => (
          <NewsItem
            onSaveNews={() => handleSaveNews(newsItem)}
            isSelected={isNewsExist(savedNews, newsItem.id)}
            id={newsItem.id}
            key={newsItem.title}
            ordinalItem={index + 1 + (page - 1) * limit}
            {...newsItem}
          />
        ))}
      </main>
      <div>

        <Input 
          value={newsSearch}
          onChange={handleSearchChange}
          placeholder="Search"
        />
        {/* Кнопка для пошуку */}
        <button onClick={() => setNewsPage(1)}>Search</button>
      </div>
      <div className="news-block__pagination pagination" style={{justifyContent: sm ? "start" : ""}}>
        <StyledPagination
          page={page}
          count={Math.ceil(itemsCount / limit)}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};