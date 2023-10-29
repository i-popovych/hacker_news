import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { hn } from "../api/hn.api";
import image from './image.png';
import Comments from "./Comment.jsx";
// import styles from '/src/styles/news_page/style_news_page.css';


const NewsItem = () => {
  const { newsId } = useParams();
  const [news, setNews] = useState(null);


  useEffect(() => {
    hn.getOneNewsById(newsId)
        .then((data) => {
          setNews(data);
        })
        .catch((error) => {
          console.error("Error loading News:", error);
        });
  }, [newsId]);

    return(
        <div>
            {news ? (
                <div className="body_news">
                    <div className="container">
                        <div>
                            <img src={image} alt="Image" className="image" />
                        </div>
                        <div className="title">{news.title}</div>
                        <Comments comments={getFirstFiveComments(news.kids)} />
                        <div className="pa-text">Created by: {news.by}</div>
                        <div className="pd-text">Publication date: {new Date(news.time * 1000).toLocaleString()}</div>
                        <Link to={news.url} className="readmore-button">
                            <div className="button-text">read more</div>
                        </Link>
                        <div className="input-container">
                            <input type="text" className="input-text" placeholder="Enter the Comment here" />
                        </div>
                        <div>
                            <button type="addcomment" className="addcomment-button">
                                <div className="button-text">add comment</div>
                            </button>
                            <p className="p2-text">view all comments</p>
                        </div>
                    </div>
                </div>
            ): (
                <div>Loading News...</div>
            )}
        </div>
    );
};

function getFirstFiveComments(comments) {
    return comments.slice(0, 5);
}
export default NewsItem;

