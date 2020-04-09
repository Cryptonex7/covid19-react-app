import React, { useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import FastFood from "@material-ui/icons/Fastfood";
import AllInboxRounded from "@material-ui/icons/AllInboxRounded";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
 
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Tasks from "../../components/Tasks/Tasks.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Primary from "../../components/Typography/Primary.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import { bugs, website, server } from "../../variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  confirmedChart
} from "../../variables/charts.js";

import styles from "../../assets/jss/materialStyles/views/dashboardStyle.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGraphDataConfirmed, getAPIStatus } from "../../services/graph/actions.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const graphState = useSelector(state => state.graph.graphData);
  const loaderState = useSelector(state => state.misc.loader);
  const [ypoints, setYpoints] = useState([]);
  const [xpoints, setXpoints] = useState([]);
  const [APIDown, setAPIDown] = useState(false);

  useEffect(() => {
    dispatch(getAPIStatus)
    .then(res => {
      res ? dispatch(getGraphDataConfirmed)
      .then(res => {
        setYpoints(res.yPoints);
        var xData = res.xPoints.map(timestamp => {
          const date = new Date(timestamp * 1000);
          console.log("DATE: ", date)
          return date.getDate() % 5 === 0 && date.getDate() + '/' + (date.getMonth()+1)
        });
        setXpoints(xData);
        // setData({labels: xData, series: yData});
      }) : setAPIDown(true);
    });
  }, [])
  return (
    <div style={APIDown ? {display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%"} : {}}>
      { !APIDown ?
        <> 
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <Icon>person_add</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>New Users</p>
                  <h3 className={classes.cardTitle}>
                    102,406 
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Primary>
                      <AllInboxRounded />
                    </Primary>
                      For all Restaurants
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <FastFood />
                  </CardIcon>
                  <p className={classes.cardCategory}>Orders</p>
                  <h3 className={classes.cardTitle}>34,245</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    Last 24 Hours
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <Icon>chrome_reader_mode</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Bills</p>
                  <h3 className={classes.cardTitle}>75</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Icon>attach_money</Icon>
                    Last Bill: $549.25
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
                  <h3 className={classes.cardTitle}>$2,450,876</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                    Just Updated
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <Icon>monetization_on</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Average Ticket Size</p>
                  <h3 className={classes.cardTitle}>
                    $247.43
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
            <GridItem xs={12} sm={6} md={6}>
              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <Store />
                  </CardIcon>
                  <p className={classes.cardCategory}>Live Restaurants</p>
                  <h3 className={classes.cardTitle}>245</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    Total Restaurants: 3,456 
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12}>
              <Card chart>
                <CardHeader color="primary" chartCard>
                  <ChartistGraph
                    className="ct-chart"
                    style={{height: 300}}
                    data={{labels: xpoints, series: [ypoints]}}
                    type="Line"
                    options={confirmedChart.options}
                    listener={confirmedChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Confirmed Cases</h4>
                  <p className={classes.cardCategory}>
                    <span className={classes.primaryText}>
                      <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                    </span>{" "}
                    increase in today Cases.
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="primary">
                  <ChartistGraph
                    className="ct-chart"
                    data={dailySalesChart.data}
                    type="Line"
                    options={dailySalesChart.options}
                    listener={dailySalesChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Daily Sales</h4>
                  <p className={classes.cardCategory}>
                    <span className={classes.primaryText}>
                      <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                    </span>{" "}
                    increase in today sales.
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="primary">
                  <ChartistGraph
                    className="ct-chart"
                    data={emailsSubscriptionChart.data}
                    type="Bar"
                    options={emailsSubscriptionChart.options}
                    responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                    listener={emailsSubscriptionChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                  <p className={classes.cardCategory}>Last Campaign Performance</p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> campaign sent 2 days ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="primary">
                  <ChartistGraph
                    className="ct-chart"
                    data={completedTasksChart.data}
                    type="Line"
                    options={completedTasksChart.options}
                    listener={completedTasksChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  <p className={classes.cardCategory}>Last Campaign Performance</p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> campaign sent 2 days ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <CustomTabs
                title="Tasks:"
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Bugs",
                    tabIcon: BugReport,
                    tabContent: (
                      <Tasks
                        checkedIndexes={[0, 3]}
                        tasksIndexes={[0, 1, 2, 3]}
                        tasks={bugs}
                      />
                    )
                  },
                  {
                    tabName: "Website",
                    tabIcon: Code,
                    tabContent: (
                      <Tasks
                        checkedIndexes={[0]}
                        tasksIndexes={[0, 1]}
                        tasks={website}
                      />
                    )
                  },
                  {
                    tabName: "Server",
                    tabIcon: Cloud,
                    tabContent: (
                      <Tasks
                        checkedIndexes={[1]}
                        tasksIndexes={[0, 1, 2]}
                        tasks={server}
                      />
                    )
                  }
                ]}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                  <p className={classes.cardCategoryWhite}>
                    New employees on 15th September, 2016
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["ID", "Name", "Salary", "Country"]}
                    tableData={[
                      ["1", "Dakota Rice", "$36,738", "Niger"],
                      ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                      ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                      ["4", "Philip Chaney", "$38,735", "Korea, South"]
                    ]}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </> : <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Icon>trending_down</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>DATA SOURCES DOWN</p>
                <h3 className={classes.cardTitle}>
                  We apologise for the Delay, <br/>Data sources currently under maintenence. 
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Primary>
                    <AllInboxRounded />
                  </Primary>
                    We are pinging them constantly, We will be back soon.
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      }
    </div>
  );
}
