import MainPage from "./pages/MainPage";
import {Navigate, Route, Routes} from "react-router-dom";
import NewsItem from "./pages/NewsItem.jsx";
import {createContext, useState} from "react";
import {fetchDataType} from "./helpers/constants/index.js";
import {isNewsExist} from "./helpers/index.js";
import {SavedNews} from "./components/SavedNews.jsx";

export const NewsFilterContext = createContext(null)

function App() {
  const [fetchDataName, setFetchDataName] = useState(fetchDataType.TOP_NEWS)
  const [savedNews, setSavedNews] = useState([])

  const handleSaveNews = (news) => {
    let newsCopy = savedNews

    newsCopy = isNewsExist(newsCopy, news.id)
      ? savedNews.filter(newsItem => newsItem.id !== news.id)
      : [...newsCopy, news]

    setSavedNews(newsCopy)
  }

  return (
      <NewsFilterContext.Provider value={{fetchDataName, setFetchDataName, savedNews, handleSaveNews}}>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/saved-news" element={<SavedNews />}/>
          <Route path="/news/:newsId" element={<NewsItem/>}/>
          <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
      </NewsFilterContext.Provider>
  );
}

export default App;
