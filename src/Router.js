import React, { Fragment, Suspense, useEffect } from "react";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";

import DashboardPage from "./views/Dashboard/Dashboard.js";
import LoginPage from "./views/Login/Login.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
// import TableList from "./views/TableList/TableList.js";
// import Typography from "./views/Typography/Typography.js";
import Icons from "./views/Icons/Icons.js";
import Maps from "./views/Maps/Maps.js";
import { CircularProgress } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
// import NotificationsPage from "./views/Notifications/Notifications.js";

import {connect, useSelector, useDispatch} from 'react-redux';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/Navbars/Navbar.js";
import Sidebar from "./components/Sidebar/Sidebar.js";

import styles from "./assets/jss/materialStyles/layouts/adminStyle.js";

import logo from "./assets/img/logo192.png";
import { getDashboardData } from "./services/dashboard/actions.js";
import { withRouter } from "react-router-dom";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "#",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: Dashboard,
    component: LoginPage,
    layout: "/admin"
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  {
    path: "#",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
];

let ps;

const useStyles = makeStyles(styles);

function Router({ darkTheme, isLoggedIn, history, ...rest }) {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const authData = useSelector(state => state.auth.authData);
  const dispatch = useDispatch();
  
  const goToDashboard = () => {
    dispatch(getDashboardData());
  }

  useEffect(() => {
    console.log("authData",authData);
    if (window.adminChannel) {
      window.adminChannel.attach();
      window.adminChannel.once("attached", () => {
        console.log("%cAbly Attached.", "color: orange;")
        window.adminChannel.subscribe(message => {
          console.log("%cAll --->",message.data, "color: blue;")
          if(message.data && message.data.length > 0){
            dispatch();
          }
        });
      });
    }
    isLoggedIn && goToDashboard();
  }, []);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const isRouteMaps = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={dashboardRoutes}
        logoText={"Admin Dashboard"}
        logo={logo}
        isLoggedIn={isLoggedIn}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        {...rest}
      />
    
      <div className={classes.mainPanel} style = {{backgroundColor: darkTheme ? "#222" : "initial" }} ref={mainPanel}>
        <Navbar
          routes={dashboardRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {isRouteMaps() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Fragment>
                <Suspense
                  fallback={<CircularProgress />}
                >
                  <Switch>
                    {dashboardRoutes.map((prop, key) => {
                      return (
                        <Route
                          path={prop.layout + prop.path}
                          component={prop.component}
                          key={key}
                        />
                      );
                    })}
                    {isLoggedIn ?
                      <Redirect from="/" to="/admin/dashboard" />
                    : <Redirect from="/" to="/admin/login" />
                    }
                  </Switch>
                </Suspense>
              </Fragment>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Fragment>
              <Suspense
                fallback={<CircularProgress />}
              >
                <Switch>
                  {dashboardRoutes.map((prop, key) => {
                    return (
                      <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                      />
                    );
                  })}
                  <Redirect from="/" to="/admin" />
                  <Redirect from="/admin" to="/admin/login" />
                </Switch>
              </Suspense>
            </Fragment>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    darkTheme: state.theme.darkTheme,
    isLoggedIn: state.auth.isLoggedIn
  }
}
export default connect(mapStateToProps)(withRouter(Router));