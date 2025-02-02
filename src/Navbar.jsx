import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Icon from "@material-ui/core/Icon";
import DropdownMenu from "./DropdownMenu.jsx";

const styles = theme => ({
  root: {
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "#47474a"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: "inline-block",
    marginRight: "90px",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    fontFamily: "Georgia, Palatino, serif",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    fontSize: "18px",
    "&:hover": {
      color: "#ddd"
    }
  }
});

class Navbar extends Component {
  handleQueryChange = evt => {
    this.props.setQuery(evt);
    this.props.history.push("/searchResults");
  };
  handleIconChange = () => {
    this.props.history.push("/cart/catalogue/:catalogueId/product/:productId");
  };
  render() {
    const { classes, query, setLogout, cart } = this.props;
    console.log(classes.root);
    return (
      <>
        {this.props.login ? (
          <AppBar
            position="sticky"
            style={{ backgroundColor: "#47474a", height: "10vh" }}
          >
            <Toolbar>
              <Typography
                className={classes.title}
                style={{ fontFamily: "Parisienne, cursive", fontSize: 24 }}
                variant="h6"
                color="inherit"
                noWrap
              >
                VintageAntique
              </Typography>
              <div className={classes.navLink}>
                <Link className={classes.link} to="/">
                  Home
                </Link>
                <h4>
                  <DropdownMenu />
                </h4>
                <Link className={classes.link} to="/sellItem">
                  Sell Product
                </Link>
              </div>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  type="text"
                  onChange={this.handleQueryChange}
                  value={query}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
              <div className={classes.navLink}>
                <Link onClick={setLogout} className={classes.link} to="/logout">
                  Log out
                </Link>
              </div>
              <div>
                <Icon
                  onClick={this.handleIconChange}
                  style={{ cursor: "pointer" }}
                >
                  shopping_cart
                </Icon>
              </div>
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar
            position="sticky"
            style={{ backgroundColor: "#47474a", height: "10vh" }}
          >
            <Toolbar>
              <Typography
                className={classes.title}
                style={{ fontFamily: "Parisienne, cursive", fontSize: 24 }}
                variant="h6"
                color="inherit"
                noWrap
              >
                VintageAntique
              </Typography>
            </Toolbar>
          </AppBar>
        )}
      </>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

function handleLogout(dispatch) {
  fetch("/logout", { method: "POST", credentials: "same-origin" });
  dispatch({ type: "LOGOUT" });
}

const mapDispatchToProps = dispatch => ({
  setLogout: () => handleLogout(dispatch),
  setQuery: evt => dispatch({ type: "SET_QUERY", query: evt.target.value })
});

const mapStateToProps = state => {
  return { query: state.query, login: state.loggedIn };
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Navbar)
  )
);
