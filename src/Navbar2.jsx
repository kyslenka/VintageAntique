import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: "inline-block",
    // fontFamily: "brillantregular!important",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
});

class Navbar2 extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className="nav" position="static">
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              VintageAntique
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar2);
