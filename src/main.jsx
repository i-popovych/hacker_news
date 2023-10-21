import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/reset.css"
import "./styles/general.css"
import "./styles/main-page/general.css"
import "./styles/main-page/news-block.css"
import "./styles/main-page/header.css"
import "./styles/main-page/footer.css"
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
