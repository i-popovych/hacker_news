import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NewsFilterContext, UserDataContext } from "../../App.jsx";
import img from "../../assets/logo.png";
import { fetchDataType } from "../../helpers/constants/index.js";

export const Header = () => {
  const { setFetchDataName } = useContext(NewsFilterContext);
  const { user, setUser } = useContext(UserDataContext);

  console.log(user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const onSelectMenuItem = (linkKey) => {
    navigate("/");
    setFetchDataName(linkKey);
  };

  return (
    <header className="header">
      <div className="header__body">
        <div className="header__logo">
          <img src={img} alt="logo" />
          <div>
            <span>The front page</span>
            <span>Powered by Hacker News</span>
          </div>
        </div>

        <div className="header__navigation">
          <nav className="navigation">
            <ul className="navigation__list">
              <li>
                <a
                  href="#"
                  onClick={() => onSelectMenuItem(fetchDataType.TOP_NEWS)}
                >
                  News
                </a>
              </li>
              <li>
                <a href="#">Comments</a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => onSelectMenuItem(fetchDataType.SHOW)}
                >
                  Show
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => onSelectMenuItem(fetchDataType.ASKS)}
                >
                  Ask
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => onSelectMenuItem(fetchDataType.JOBS)}
                >
                  Jobs
                </a>
              </li>
              <div className="navigation__search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </ul>
          </nav>
        </div>

        <div className="header__person-block person-block">
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
          <Menu
            sx={{ mt: 7 }}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>{user?.username || "no authorized"}</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/saved-news");
                handleClose();
              }}
            >
              Saved news
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose()
                setUser(null)
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};
