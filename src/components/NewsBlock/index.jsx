import React, {useContext, useEffect, useState} from "react";
import {NewsItem} from "./NewsItem.jsx";
import {hn} from "../../api/hn.api.js";
import {getPreparedNewsItems} from "./helpers/getPreparedNewsItems.js";
import {CircularProgress, Pagination, useMediaQuery} from "@mui/material";
import {styled} from "@mui/system";
import {NewsFilterContext} from "../../App.jsx";
import {fetchDataType, fetchDataTypeNames} from "../../helpers/constants/index.js";
import {isNewsExist} from "../../helpers/index.js";
import {useNavigate} from "react-router-dom";
import {CustomSelector} from "../../pages/ui/CustomSelector.jsx"


const filterOptions = [
  {value: 'default', name: 'Set filter option'},
  {value: "title", name: "Title"},
  {value: "postingHours", name: "Time"},
  {value: 'rating', name: 'Rating'},
  {value: 'commentsCount', name: 'Comments'},
]

const limitOptions = [
  {value: 5, name: 'Limit of news 5'},
  {value: 10, name: "Limit of news 10"},
  {value: 15, name: "Limit of news 15"},
  {value: 20, name: 'Limit of news 20'},
  {value: 30, name: 'Limit of news 30'},
]


const Input = ({value, onChange, placeholder}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

const sortItemsByField = (items, field) => {
  if (!isNaN(items[0][field])) {
    return items.sort((a, b) => b[field] - a[field])
  }
  return items.sort((a, b) => a[field].localeCompare((b[field])))
}

export const NewsBlock = () => {
  const [items, setItems] = useState(null);
  const [itemsCount, setItemsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [newsSearch, setNewsSearch] = useState("");
  const [filterOption, setFilterOption] = useState('default')


  const sm = useMediaQuery("(max-width:600px)");

  const {fetchDataName, savedNews, handleSaveNews} = useContext(
    NewsFilterContext
  );

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

  useEffect(() => {
    const f = async () => {
      setItems(null);
      let items;
      let itemsCount;

      switch (fetchDataName) {
        case fetchDataType.TOP_NEWS: {
          const res = await hn.getPopularNews(limit, page);
          items = res.itemsList;
          itemsCount = res.itemsCount;
          break;
        }

        case fetchDataType.ASKS: {
          const res = await hn.getPopularAsks(limit, page);
          items = res.itemsList;
          itemsCount = res.itemsCount;
          break;
        }

        case fetchDataType.JOBS: {
          const res = await hn.getPopularJobs(limit, page);
          items = res.itemsList;
          itemsCount = res.itemsCount;
          break;
        }

        case fetchDataType.SHOW: {
          const res = await hn.getPopularShows(limit, page);
          items = res.itemsList;
          itemsCount = res.itemsCount;
          break;
        }
      }

      if (items) {
        setItems(getPreparedNewsItems(items));
        setItemsCount(itemsCount);
      }
    };

    f();
  }, [page, fetchDataName, limit]);

  const onPageChange = (event, value) => {
    setPage(value);
  };


  // Фільтруємо новини за назвою
  let filteredItems = items
    ? items.filter((newsItem) =>
      newsItem.title.toLowerCase().includes(newsSearch.toLowerCase())
    )
    : null;

  filteredItems = (!filteredItems || filterOption === 'default') ? filteredItems : sortItemsByField(filteredItems, filterOption)

  const handleSearchChange = (e) => {
    setNewsSearch(e.target.value);
  };

  const navigator = useNavigate()
  return (
    <div className="news-block">
      <header className="news-block__header">
        <div className="news-block__logo">
          <p>{fetchDataTypeNames[fetchDataName]}</p>
        </div>

        <div>
          <button className="news-block__submit-bth bth" onClick={() => navigator('submit-form')}>
            <pre>+ Submit</pre>
          </button>
        </div>
      </header>

      <section className="filter-block">
        <div className="filter-block__content">
          <div className="selectFilter"><CustomSelector options={filterOptions} value={filterOption}
                                                        handleChange={setFilterOption}/></div>
          <div className="selectFilter"><CustomSelector options={limitOptions} value={limit}
                                                        handleChange={setLimit}/></div>
        </div>
      </section>

      <main className="news-block__list news-list">
        {!filteredItems && (
          <div className="news-block__loading-box">
            <CircularProgress/>
          </div>
        )}
        {filteredItems &&
          filteredItems.map((newsItem, index) => (
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
        <button onClick={() => setPage(1)}>Seearch</button>
      </div>
      <div
        className="news-block__pagination pagination"
        style={{justifyContent: sm ? "start" : ""}}
      >
        <StyledPagination
          page={page}
          count={Math.ceil(itemsCount / limit)}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};
