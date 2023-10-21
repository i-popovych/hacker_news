import MainPage from "./pages/MainPage";
import { Navigate, Route, Routes } from "react-router-dom";
import NewsItem from "./pages/NewsItem.jsx";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news/:newsId" element={<NewsItem />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  );
}

export default App;
