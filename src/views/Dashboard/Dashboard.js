import React, { useEffect } from "react";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import FastFood from "@material-ui/icons/Fastfood";
import AllInboxRounded from "@material-ui/icons/AllInboxRounded";
import DateRange from "@material-ui/icons/DateRange";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
 
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
// import Table from "../../components/Table/Table.js";
// import Tasks from "../../components/Tasks/Tasks.js";
// import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Primary from "../../components/Typography/Primary.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
// import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

// import { bugs, website, server } from "../../variables/general.js";

import {
  // dailySalesChart,
  // emailsSubscriptionChart,
  // completedTasksChart
} from "../../variables/charts.js";

import styles from "../../assets/jss/materialStyles/views/dashboardStyle.js";
import { useSelector, useDispatch } from "react-redux";
import { getDashboardData } from "../../services/dashboard/actions"
import { getAllRestaurants } from "../../services/restaurants/actions.js";
import SearchBox from "../../components/Navbars/SearchBox.js";
import { Button, Divider, CircularProgress } from "@material-ui/core";
import Search from "@material-ui/icons/Search";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const dashFilterState = useSelector(state => state.dashboardFilter.dashboardFilter);
  const dashFilterPending = useSelector(state => state.dashboardFilter.filterPending);
  const dashState = useSelector(state => state.dashboard.dashboardData);
  const dashPending = useSelector(state => state.dashboard.dashboardPending);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(getAllRestaurants());
  }, [])
  return (
      <div>
        { dashPending ?
          <CircularProgress
            className={classes.loginProgress}
            size={24}
            thickness={4}
          />
        : <>
            <GridContainer>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Icon>person_add</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Total Users</p>
                    <h3 className={classes.cardTitle}>
                      {dashState.total_users.toLocaleString()} 
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Primary>
                        <AllInboxRounded />
                      </Primary>
                        {`Active Users: ${dashState.active_users.toLocaleString()}`}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Icon>monetization_on</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Average Ticket Size</p>
                    <h3 className={classes.cardTitle}>
                      ₹ {dashState.avg_ticker_size.toLocaleString()}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Primary>
                        <AllInboxRounded />
                      </Primary>
                        <b style={{color: "lightgreen"}}>+7.9%</b>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Store />
                    </CardIcon>
                    <p className={classes.cardCategory}>Restaurants</p>
                    <h3 className={classes.cardTitle}>{dashState.restaurant_count.toLocaleString()}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Active Restaurants: __<i>yet to get data</i>__
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Icon>attach_money</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Total Bill Value</p>
                    <h3 className={classes.cardTitle}>
                      ₹ {dashState.order_total.total_amount.toLocaleString()}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Icon>ballot</Icon>
                      For Total Orders: {dashState.order_total.count}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <FastFood />
                    </CardIcon>
                    <p className={classes.cardCategory}>Orders*</p>
                    <h3 className={classes.cardTitle}>
                      {(dashState.order_rest_user.count + dashState.order_user_only.count).toLocaleString()}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      {`User: ${dashState.order_user_only.count} 
                      | Restaurant: ${dashState.order_rest_only.count} 
                      | Mixed: ${dashState.order_rest_user.count}`}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Icon>chrome_reader_mode</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Bills (by user)</p>
                    <h3 className={classes.cardTitle}>{dashState.kot_total_user.toLocaleString()}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Icon>attach_money</Icon>
                      {`Bills by Restaurant: ${dashState.kot_total_rest.toLocaleString()} | 
                      Total Bills: ${dashState.kot_total.toLocaleString()}`}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Icon>deck</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Active Tables</p>
                    <h3 className={classes.cardTitle}>{dashState.tables_count_active.toLocaleString()}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Icon>emoji_food_beverage</Icon>
                      {`Total Tables: ${dashState.tables_count.toLocaleString()}`}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </>
        }
        <Divider className = {classes.margin + " " + classes.search}/>
        <br/>
        <SearchBox className = {classes.search}/>
        { dashFilterPending ? <CircularProgress
            className={classes.loginProgress}
            size={24}
            thickness={4}
          />
          : dashFilterState.restaurant_count >= 1 && 
          <>
            {dashFilterState.restaurant_count === 1 ?
              <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader color="primary" stats icon>
                      <CardIcon color="primary">
                        <Icon>person_add</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Total Users</p>
                      <h3 className={classes.cardTitle}>
                        {dashState.total_users.toLocaleString()} 
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Primary>
                          <AllInboxRounded />
                        </Primary>
                          {`Active Users: ${dashState.active_users.toLocaleString()}`}
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader color="primary" stats icon>
                      <CardIcon color="primary">
                        <Icon>monetization_on</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Average Ticket Size</p>
                      <h3 className={classes.cardTitle}>
                        {dashFilterState.avg_ticker_size ? `₹ ${dashFilterState.avg_ticker_size.toLocaleString()}` : "Not Available"}
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Primary>
                          <AllInboxRounded />
                        </Primary>
                          <b style={{color: "lightgreen"}}>+7.9%</b>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader color="primary" stats icon>
                      <CardIcon color="primary">
                        <Icon>attach_money</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Total Bill Value</p>
                      <h3 className={classes.cardTitle}>
                        {dashFilterState.order_total ? `₹ ${dashFilterState.order_total.total_amount.toLocaleString()}` : "Not Available"}
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Icon>ballot</Icon>
                        {dashFilterState.order_total ? `For Total Orders: ${dashFilterState.order_total.count}` : "Not Available"}
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            : <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="primary" stats icon>
                      <CardIcon color="primary">
                        <Store />
                      </CardIcon>
                      <p className={classes.cardCategory}>Restaurants</p>
                      <h3 className={classes.cardTitle}>{dashState.restaurant_count.toLocaleString()}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <DateRange />
                        Active Restaurants: __<i>yet to get data</i>__
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="primary" stats icon>
                      <CardIcon color="primary">
                        <Icon>person_add</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Total Users</p>
                      <h3 className={classes.cardTitle}>
                        {dashState.total_users.toLocaleString()} 
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Primary>
                          <AllInboxRounded />
                        </Primary>
                          {`Active Users: ${dashState.active_users.toLocaleString()}`}
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="primary" stats icon>
                      <CardIcon color="primary">
                        <Icon>monetization_on</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Average Ticket Size</p>
                      <h3 className={classes.cardTitle}>
                        {dashFilterState.avg_ticker_size ? `₹ ${dashFilterState.avg_ticker_size.toLocaleString()}` : "Not Available"}
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Primary>
                          <AllInboxRounded />
                        </Primary>
                          <b style={{color: "lightgreen"}}>+7.9%</b>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="primary" stats icon>
                      <CardIcon color="primary">
                        <Icon>attach_money</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Total Bill Value</p>
                      <h3 className={classes.cardTitle}>
                        {dashFilterState.order_total ? `₹ ${dashFilterState.order_total.total_amount.toLocaleString()}` : "Not Available"}
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Icon>ballot</Icon>
                        {dashFilterState.order_total ? `For Total Orders: ${dashFilterState.order_total.count}` : "Not Available"}
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            }
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <FastFood />
                    </CardIcon>
                    <p className={classes.cardCategory}>Orders*</p>
                    <h3 className={classes.cardTitle}>
                      {dashFilterState.order_total && dashFilterState.order_rest_only ? 
                        `${(dashFilterState.order_total.count -  dashFilterState.order_rest_only.count).toLocaleString()}` 
                      : dashFilterState.order_total ? dashFilterState.order_total.count.toLocaleString() : "Not Available"}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      {
                        `User: ${dashFilterState.order_user_only ? dashFilterState.order_user_only.count : "Not Available"} 
                        | Restaurant: ${dashFilterState.order_rest_only ? dashFilterState.order_rest_only.count : "Not Available"} 
                        | Mixed: ${dashFilterState.order_rest_user ? dashFilterState.order_rest_user.count : "Not Available"}`
                      }
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Icon>chrome_reader_mode</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Bills (by user)</p>
                    <h3 className={classes.cardTitle}>
                      {dashFilterState.kot_total_user ? `${dashFilterState.kot_total_user.toLocaleString()}` : "Not Available"}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Icon>attach_money</Icon>
                      {
                        `Bills by Restaurant: ${dashFilterState.kot_total_rest ?dashFilterState.kot_total_rest.toLocaleString() : "Not Available"} | 
                        Total Bills: ${dashFilterState.kot_total ? dashFilterState.kot_total.toLocaleString() : "Not Available"}`
                      }
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Icon>deck</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Active Tables</p>
                    <h3 className={classes.cardTitle}>{dashFilterState.tables_count_active ? dashFilterState.tables_count_active.toLocaleString() : "Not Available"}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Icon>emoji_food_beverage</Icon>
                      {dashFilterState.tables_count ? `Total Tables: ${dashFilterState.tables_count.toLocaleString()}` : "Not Applicable for Date Ranges"}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </>
        }
      </div>
  );
}
