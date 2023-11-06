import {styled, ThemeProvider} from "@mui/system";
import {Box, createMuiTheme,  Pagination, TextField, useMediaQuery} from "@mui/material";
import {NewsItem} from "./NewsBlock/NewsItem.jsx";
import {useContext, useEffect, useState} from "react";
import {NewsFilterContext} from "../App.jsx";
import {Header} from "./NewsBlock/Header.jsx";
import {WrapperLayout} from "./wrapperLayout.jsx";




export const SavedNews = () => {
  const [items, setItems] = useState(null);
  const [itemsCount, setItemsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [newsSearch, setNewsSearch] = useState('');



  const sm = useMediaQuery('(max-width:600px)')

  const {savedNews, handleSaveNews} = useContext(NewsFilterContext)
  const filtredItems = savedNews.filter(item => item.title.toLowerCase().includes(newsSearch.toLowerCase()))


  const StyledPagination = styled(Pagination)(({theme}) => ({
    "& .MuiPaginationItem-root": {
      color: theme.palette.primary.main,
      backgroundColor: "white",
      width: sm ? "18px" : "38px",
      height: sm ? "18px" : "38px",
      borderRadius: sm ? null : "50%",
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


  return (<WrapperLayout>
      <div className="news-block">
        <header className="saved-news__header">
          <div className="search">
            <div className="search__img-container">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="search__input-container">
              <input type="text" value={newsSearch} onChange={(e) => setNewsSearch(e.currentTarget.value)}/>
            </div>
          </div>

        </header>

        <main className="news-block__list news-list">
          {filtredItems.map((newsItem, index) => (
            <NewsItem
              onSaveNews={() => handleSaveNews(newsItem)}
              id={newsItem.id}
              key={newsItem.title}
              ordinalItem={index + 1 + (page - 1) * limit}
              isSelected
              {...newsItem}
            />
          ))}
        </main>
        {/*<div className="news-block__pagination pagination" style={{justifyContent: sm ? "start" : ""}}>*/}
        {/*  <StyledPagination*/}
        {/*    page={page}*/}
        {/*    count={Math.ceil(itemsCount / limit)}*/}
        {/*    onChange={onPageChange}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
  </WrapperLayout>

  );
};