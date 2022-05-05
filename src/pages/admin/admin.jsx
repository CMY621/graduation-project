import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import LeftNav from "../../components/left-nav";

import Header from "../../components/header";

import StudentManagement from "../student/management/index";
import StudentStatistics from "../student/statistics/index";
import EmploymentManagement from "../employment/management/index";
import EmploymentStatistics from "../employment/statistics/index";
import RecruitManagement from "../recruit/management/index";
import Notice from "../notice/index";
import AboutUs from "../about_us/index";
import userInformationManagement from "../userInformation/index";

const { Sider, Content } = Layout;

/*
后台管理的路由组件
 */
export default class Admin extends Component {
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: 20, backgroundColor: "#fff" }}>
            <Switch>
              <Redirect from="/" exact to="/userInformationManagement" />
              <Route path="/student/management" component={StudentManagement} />
              <Route path="/student/statistics" component={StudentStatistics} />
              <Route
                path="/employment/management"
                component={EmploymentManagement}
              />
              <Route
                path="/employment/statistics"
                component={EmploymentStatistics}
              />
              <Route path="/recruit" component={RecruitManagement} />
              <Route path="/notice" component={Notice} />
              <Route path="/aboutUs" component={AboutUs} />
              <Route
                path="/userInformationManagement"
                component={userInformationManagement}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
