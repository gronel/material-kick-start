import React from "react";
import Link from "next/link";
import api from "../Services/api";
import { IconButton, Badge, MenuItem, Menu, Toolbar } from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AccountCircle from "@material-ui/icons/AccountCircle";
const AuthIndicator = ({ setLogin }) => {
  const [auth, setAuth] = React.useState(true);
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  if (!setLogin) {
    return (
      <Toolbar>
        <IconButton>
          <Badge badgeContent={4} color="secondary">
            <NotificationsNoneIcon fontSize="small" />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge badgeContent={3} color="secondary">
            <ChatBubbleOutlineIcon fontSize="small" />
          </Badge>
        </IconButton>

        {auth && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    );
  }
  return (
    <Link href="/login">
      <a className="">Logout</a>
    </Link>
  );
};

export default AuthIndicator;
