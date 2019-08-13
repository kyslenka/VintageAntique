import React from "react";
import { MenuItem } from "material-ui/Menu";
import Drawer from "material-ui/Drawer";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import List from "material-ui/List";
import ListItemText from "material-ui/List/ListItemText";
import Hidden from "material-ui/Hidden";
import LinkButton from "../LinkButton/LinkButton";
import CustomIconButton from "../CustomAppBar/CustomIconButton/CustomIconButton";
import FontAwesome from "react-fontawesome";
import { Routes, ReportTypes } from "../../constants";

import { withStyles } from "material-ui/styles";

const drawerWidth = 250;

const styles = theme => ({
  navIconHide: {
    display: "block",
    [theme.breakpoints.up("xl")]: {
      display: "none"
    }
  },

  drawerPaper: {
    width: drawerWidth,
    left: 0,
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth
    }
  }
});

const menuItemLinks = [
  {
    text: "All reports",
    path: "/"
  },
  {
    text: ReportTypes.STATIC_ANALYSIS,
    path: Routes.STATIC_ANALYSIS_DETAILS
  },
  {
    text: ReportTypes.SLOC,
    path: Routes.SLOC_DETAILS
  },
  {
    text: ReportTypes.UNIT_TEST_RESULTS,
    path: Routes.UNIT_TEST_DETAILS
  },
  {
    text: ReportTypes.UNIT_TEST_COVERAGE,
    path: Routes.UNIT_TEST_COVERAGE
  }
];

class AppBarMenu extends React.Component {
  state = {
    open: false
  };

  handleRequestClose = event => {
    this.setState({ open: false });
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  getMenuItem(menuPath, text, key) {
    const { path } = this.props;

    return (
      <MenuItem
        onClick={this.handleRequestClose}
        selected={menuPath === path}
        key={key}
        to={menuPath}
        component={LinkButton}
      >
        <ListItemText primary={text}> </ListItemText>
        {menuPath === path ? <FontAwesome name="angle-right" /> : ""}
      </MenuItem>
    );
  }

  getMenuItems() {
    return menuItemLinks.map((menuItem, key) =>
      this.getMenuItem(menuItem.path, menuItem.text, key)
    );
  }

  render() {
    return this.getDrawer();
  }

  getDrawer() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <Toolbar className={classes.drawerHeader}>
          <Typography variant="title" color="inherit">
            Reports
          </Typography>
        </Toolbar>
        <List>{this.getMenuItems()}</List>
      </div>
    );

    return (
      <div>
        <CustomIconButton
          iconName="bars"
          aria-label="open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <Hidden xlUp>
            <Drawer
              variant="temporary"
              anchor="left"
              open={this.state.open}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </CustomIconButton>
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}
export default withStyles(styles)(AppBarMenu);
