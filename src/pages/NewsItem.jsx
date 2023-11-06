import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { hn } from "../api/hn.api";
import image from './image.png';
import Comment from "./Comment.jsx";


const NewsItem = () => {
    const { newsId } = useParams();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([])


    useEffect(() => {
        hn.getOneItemById(newsId)
            .then((data) => {
                setNews(data);
            })
            .catch((error) => {
                console.error("Error loading News:", error);
            });
    }, [newsId]);

    useEffect(() => {
        if (!news) return


        const commentsIds = news.kids.slice(0, 5)

        Promise.all(commentsIds.map(async commentId => {
            return await hn.getOneItemById(commentId)
        })).then((comments) => {
            setComments(comments)
        }).catch((error) => {
            console.error("Error loading comments:", error);
        })




    }, [newsId, news])

    return(
        <div>
            {news ? (
                <div className="body_news">
                    <div className="container">
                        <div>
                            <img src={image} alt="Image" className="image" />
                        </div>
                        <div className="title">{news.title}</div>
                        {/*{*/}
                        {/*    comments.length && comments.map(commentItem => <Comment className="pa-text" {...commentItem}/>)*/}
                        {/*}*/}

                        {
                            comments.slice(0, 1).map((commentItem, index) => (<Comment key={index} className="comments" {...commentItem} />
                        ))
                        }

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
                            {/*<p className="p2-text">view all comments</p>*/}
                            <p className="p2-text">
                                <Link to="/comments">view all comments</Link>
                            </p>
                        </div>
                    </div>
                </div>
            ): (
                <div>Loading News...</div>
            )}
        </div>
    );
};

export default NewsItem;
