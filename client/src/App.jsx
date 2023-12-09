import { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { serverAPI } from "./api/server.api.js";
import { SavedNews } from "./components/SavedNews.jsx";
import { fetchDataType } from "./helpers/constants/index.js";
import { isNewsExist } from "./helpers/index.js";
import MainPage from "./pages/MainPage";
import NewsItem from "./pages/NewsItem.jsx";
import { UserDetails } from "./pages/UserDetails/UserDetails.jsx";
import { SubmitFormPage } from "./submit_form_page/submit_form_page.jsx";
import { CreateAccount } from "./create_login/Create.jsx";
import Login from "./create_login/Login.jsx";

export const NewsFilterContext = createContext(null);
export const UserDataContext = createContext(null);

function App() {
  const [fetchDataName, setFetchDataName] = useState(fetchDataType.TOP_NEWS);
  const [savedNews, setSavedNews] = useState([]);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      try {
        setIsLoading(true);
        const authToken = localStorage.getItem("token");


        if (!authToken) return;
        const { user, token } = await serverAPI.getUser();
        localStorage.setItem("token", token);
        setUser(user);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    f();
  }, []);

  const handleSaveNews = (news) => {
    let newsCopy = savedNews;

    newsCopy = isNewsExist(newsCopy, news.id)
      ? savedNews.filter((newsItem) => newsItem.id !== news.id)
      : [...newsCopy, news];

    setSavedNews(newsCopy);
  };

  if (isLoading) return;

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <NewsFilterContext.Provider
        value={{ fetchDataName, setFetchDataName, savedNews, handleSaveNews }}
      >
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<MainPage />} />
              <Route path="/saved-news" element={<SavedNews />} />
              <Route path="/news/:newsId" element={<NewsItem />} />
              <Route path="/submit-form" element={<SubmitFormPage />} />
              <Route path="/user/:userId" element={<UserDetails />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<CreateAccount />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </NewsFilterContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
