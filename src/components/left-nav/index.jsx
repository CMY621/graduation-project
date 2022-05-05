import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

import logo from "../../assets/images/logo.png";
import "./index.less";
import menuList from "../../config/menuConfig.js";
const { SubMenu } = Menu;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_3355747_01j3y9s89zsb.js",
});

/*
左侧导航的组件
 */
class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
    };
    this.rootSubmenuKeys = [];
  }

  onClick = (item) => {
    console.log(item.key);
    this.props.history.push(item.key);
  };

  renderMenuNodes = (ele) => {
    const { key, name, children, icon = "icon-tongzhi" } = ele;
    return children ? (
      <SubMenu
        key={key}
        title={
          <span>
            <IconFont type={icon} />
            <span>{name}</span>
          </span>
        }
      >
        {children.map((node) => {
          const { key, name } = node;
          return (
            <Menu.Item key={key} onClick={this.onClick}>
              {name}
            </Menu.Item>
          );
        })}
      </SubMenu>
    ) : (
      <Menu.Item key={key} onClick={this.onClick}>
        <IconFont type={icon} />
        {name}
      </Menu.Item>
    );
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>毕业生就业管理系统</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          {menuList.map((ele) => {
            return this.renderMenuNodes(ele);
          })}
        </Menu>
      </div>
    );
  }
}
export default withRouter(LeftNav);
