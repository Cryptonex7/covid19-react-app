/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
  
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
 
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.js";

import styles from "../../assets/jss/materialStyles/components/sidebarStyle.js";
import { logoutAdmin } from "../../services/auth/actions.js";
import { useDispatch } from "react-redux";


const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        listItemClasses = classNames({
          [" " + "primaryRed"]: activeRoute(prop.layout + prop.path)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        if ( prop.name === "Login")
          return (
            <ListItem 
            button 
            className={classes.itemLink + listItemClasses}
            onClick={() => dispatch(logoutAdmin())}
            >
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                />
              )}
              <ListItemText
                primary={"Logout"}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          )
        else return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                />
              )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <div className = {classes.logoLink} >
        <div className={classes.logoImage}>
          <img
            src={logo}
            className={classes.img}
          />
        </div>
        {logoText}
      </div>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true 
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          <div
            className={classes.background}
            style={{ backgroundColor: "#fd2a2a" }}
          />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="persistent"
          open = {props.isLoggedIn}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div
            className={classes.background}
            style={{ backgroundColor: "#fd2a2a" }}
          />
        </Drawer>
        <Drawer
          anchor={"left"}
          variant="persistent"
          open = {!props.isLoggedIn}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          <div className={classes.sidebarWrapper}>
            <div className={classes.whiteFont} style = {{padding: 20, fontSize: 20}}>
              <br/>
                <img
                  src={logo}
                />
              <br/>
              <br/>
              Welcome to WTF Admin Dashboard.
              <br/>
              <br/>
              Unleash Your Admin Powers by Logging In!
            </div> 
          </div>
          <div
            className={classes.background}
            style={{ backgroundColor: "#fd2a2a" }}
          />
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
