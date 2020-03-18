import React from "react";
import classNames from "classnames";
import {connect, useDispatch} from 'react-redux';
import PropTypes from "prop-types";
  
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
 
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import Button from "../CustomButtons/Button.js";
import SunnyIcon from "@material-ui/icons/WbSunnyTwoTone";

import styles from "../../assets/jss/materialStyles/components/headerStyle.js";
import { toggleDarkTheme } from "../../services/theme/actions.js";
import {  blackColor, whiteColor, primaryColor } from "../../assets/jss/materialStyles.js";
import Refresh from "@material-ui/icons/Refresh";
import { getDashboardData } from "../../services/dashboard/actions.js";

const useStyles = makeStyles(styles);

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  function makeBrand() {
    var name;
    props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = prop.name;
      }
      return null;
    });
    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-label="SunnyIcon"
              className={classes.buttonLink}
              onClick={() => dispatch(getDashboardData())}
            >
              <Refresh className={classes.icons} style={{color: primaryColor[0]}} />
            </Button>
          </Button>

        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
  return {
    darkTheme: state.theme.darkTheme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDarkTheme: () => dispatch(toggleDarkTheme()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)