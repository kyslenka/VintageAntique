import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing.unit * 2
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
    padding: "10px",
    fontSize: "18px",
    "&:hover": {
      color: "#ccc"
    }
  }
});

class DropdownMenu extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button
            style={{
              textTransform: "none",
              color: "#fff",
              fontSize: 18,
              fontFamily: "Georgia, Palatino, serif"
            }}
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            Catalogues
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList style={{ backgroundColor: "lightBlue" }}>
                      <MenuItem onClick={this.handleClose}>
                        <Link
                          className={classes.link}
                          to="/catalogue/furniture"
                        >
                          Furniture
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <Link
                          className={classes.link}
                          to="/catalogue/paintings"
                        >
                          Paintings
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <Link
                          className={classes.link}
                          to="/catalogue/jewellery"
                        >
                          Jewellery
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropdownMenu);
