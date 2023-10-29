import MainPage from "./pages/MainPage";
import { Navigate, Route, Routes } from "react-router-dom";
import NewsItem from "./pages/NewsItem.jsx";
import {createContext, useState} from "react";
import {fetchDataType} from "./helpers/constants/index.js";

export const NewsFilterContext = createContext(null)

function App() {
  const [fetchDataName, setFetchDataName] = useState(fetchDataType.TOP_NEWS)

  return (
    <div>
      <NewsFilterContext.Provider value={{fetchDataName, setFetchDataName}}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news/:newsId" element={<NewsItem />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </NewsFilterContext.Provider>
    </div>
  );
}

export default App;
