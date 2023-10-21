import MainPage from "./pages/MainPage";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  );
}

export default App;
