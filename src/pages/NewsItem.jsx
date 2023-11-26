import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {hn} from "../api/hn.api";
import image from './image.png';
import ReactHtmlParser from 'react-html-parser';
import { v4 as uuidv4 } from 'uuid';


const NewsItem = () => {
  const {newsId} = useParams();
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([])
  const [visibleComments, setVisibleComments] = useState([])
  const [commentsLimit, setCommentsLimit] = useState(5)
  const [commentInputValue, setCommentInputValue] = useState('')

  console.log(comments)


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


    const commentsIds = commentsLimit ? news.kids.slice(0, commentsLimit) : news.kids

    Promise.all(commentsIds.map(async commentId => {
      return await hn.getOneItemById(commentId)
    })).then((comments) => {
      setComments(comments)
    }).catch((error) => {
      console.error("Error loading comments:", error);
    })


  }, [newsId, news, commentsLimit])

  const onCommentsVisibleChange = (id) => {
    if (visibleComments.includes(id)) {
      const visibleCommentsFiltred = visibleComments.filter(commentId => commentId !== id)
      setVisibleComments(visibleCommentsFiltred)
    } else {
      setVisibleComments([...visibleComments, id])
    }
  }


  return (
    <>
      {news ? (
        <div className="body_news">
          <div className="container">
            <div className="left-container">
              <div className="img-container">
                <img src={image} alt="Image" className="image"/>
              </div>
              <div className="pa-text">Created by: {news.by}</div>
              <div className="pd-text">Publication date: {new Date(news.time * 1000).toLocaleString()}</div>
            </div>

            <div className="right-container">
              <div className="title">{news.title}</div>
              <div>
                <Link to={news.url} className="readmore-button read-more-bth">
                  <div className="button-text">read more</div>
                </Link>
              </div>

              <div className="comments-container">
                {comments && comments.map(commentItem => {
                  return (
                    <div className="comment-item-container" key={commentItem.id}>
                      <div className="comment-item-hide-bth">
                        <span onClick={() => onCommentsVisibleChange(commentItem.id)}>{visibleComments.includes(commentItem.id) ? 'Hide comment' : 'Show comment'}</span>
                      </div>
                      <div className={`comment-item-content ${visibleComments.includes(commentItem.id) ? '' : 'comment-item-content-hidden'}`}>
                        Author: {commentItem.by} <br />
                        {ReactHtmlParser(commentItem.text).slice(0, 20)}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div>
                <p className="p2-text">
                  <Link to="#" onClick={() => setCommentsLimit(0)}> view all comments</Link>
                </p>
              </div>
              <div className="add-comment-container">
                <div className="input-container">
                  <div>
                    <input type="text" className="input-container__input-text" placeholder="Enter the Comment here" value={commentInputValue} onChange={e => setCommentInputValue(e.target.value)}/>
                  </div>
                </div>
                <button type="addcomment" className="addcomment-button" onClick={() => setComments([{
                  id: uuidv4(),
                  by: 'me',
                  text: commentInputValue
                }, ...comments])}>
                  <div className="button-text">add comment</div>
                </button>
              </div>


            </div>


          </div>
        </div>
      ) : (
        <div>Loading News...</div>
      )}
    </>
  );
};

export default NewsItem;
