import React from "react";
import classNames from "classnames";
  
import { makeStyles } from "@material-ui/core/styles";
import {connect, useDispatch} from 'react-redux';
import { toggleDarkTheme } from "../../services/theme/actions.js";

import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
 
import Button from "../CustomButtons/Button.js";
import SunnyIcon from "@material-ui/icons/WbSunnyTwoTone";
import { blackColor} from "../../assets/jss/materialStyles.js";


import styles from "../../assets/jss/materialStyles/components/headerLinksStyle.js";
import { logoutAdmin } from "../../services/auth/actions.js";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(styles);

function AdminNavbarLinks(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = React.useState(null);
  
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (
    <div>
      <div className={classes.searchWrapper}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="SunnyIcon"
          className={classes.buttonLink}
          onClick={props.toggleDarkTheme}
        >
          <SunnyIcon className={classes.icons} style={{color: !props.darkTheme && blackColor}} />
        </Button>
      </div>
      
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={() => {props.history.push("/"); dispatch(logoutAdmin());}}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminNavbarLinks))