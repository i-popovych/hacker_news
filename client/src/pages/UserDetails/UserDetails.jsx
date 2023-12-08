import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {WrapperLayout} from "../../components/wrapperLayout.jsx";
import './index.css'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {hn} from "../../api/hn.api.js";
import {getTimeAgo} from "../../components/NewsBlock/helpers/getPreparedNewsItems.js";
import parse from 'html-react-parser';

export const UserDetails = () => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState(null)


  const {userId} = useParams()

  useEffect(() => {
    const f = async () => {
      const {data: user} = await hn.getUserById(userId)
      setUser(user)
    }

    f()
  }, [userId])


  useEffect(() => {
    if (!user) return
    const f = async () => {
      const {itemsList} = await hn.getUserComments(user.submitted.slice(0, 10))
      setComments(itemsList)
    }

    f()
  }, [user])

  if (!user) return


  return (
    <WrapperLayout>
      <div className="user-details">
        <div className="user-details__container">
          <div className="user-details__photo">
            <AccountCircleIcon style={{fontSize: '250px', color: 'white'}}/>
          </div>
          <div className="user-details__user-name">
            <span>{user.id}</span>

          </div>
          <div className="user-details__info">
            <div className="user-details__carma"><span>Karma: {user.karma}</span></div>
            <div className="user-details__created"><span>Created: {getTimeAgo(user.created)}</span></div>
          </div>
          <div className={`user-details__accordion`} onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
            <div className="user-details__accordion__title">
              <div><span>See all user comments</span></div>
              <div><i className={`fa-solid ${isCommentsOpen ? 'fa-caret-down' : 'fa-caret-right'}`}></i></div>
            </div>


            <div
              className={`user-details__accordion__content ${isCommentsOpen ? "" : "user-details__accordion__content--hidden"}`}>

              {comments && comments.filter(item => item.text).map(commentItem => {
                return (
                  <div className="comment-item">
                    <div>
                      <span>{parse(commentItem.text)}</span>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </div>
    </WrapperLayout>

  )
}