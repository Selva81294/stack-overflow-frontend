import React from "react";
import "../Header/Header.css";
import soLogo from "../../images/SOlogo.png";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import HelpIcon from "@mui/icons-material/Help";
import { Link, useHistory } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {


const history = useHistory()

const logOut = async (e) => {
  localStorage.removeItem("token");
  history.push("/");
};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "black" }} position="static">
        <Toolbar>
          <Link to= '/mainPg'>
            <img
              height="50px"
              style={{ marginBottom: "10px" }}
              src={soLogo}
              alt="logo"
            />
          </Link>
          <h3>Products</h3>
          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <InboxIcon style={{ marginRight: "10px" }} />
          <HelpIcon style={{ marginRight: "10px" }} />
          <svg
            aria-hidden="true"
            className="svg-icon iconStackExchange"
            width="24"
            height="24"
            viewBox="0 0 18 18"
            fill="white"
            style={{ cursor: "pointer", marginRight: "10px" }}
          >
            <path
              d="M15 1H3a2 2 0 00-2 2v2h16V3a2 2 0 00-2-2ZM1 13c0 1.1.9 2 2 
                        2h8v313-3h1a2 2 0 002-2v-2H1v2Zm16-7H1v4h16V6Z"
            ></path>
          </svg>
          <span onClick={(e)=>logOut()}>
          <Logout style={{ marginRight: "10px", cursor:"pointer" }} />
          </span>
            
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
