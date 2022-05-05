import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import "./login.less";
import logo from "../../assets/images/logo.png";
import axios from "axios";

const Item = Form.Item;

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { account, password } = values;
        axios({
          method: "post",
          url: "/api/login",
          data: {
            account: account,
            password: password,
          },
        })
          .then((res) => {
            if (!res.data.results.length) {
              message.error("用户名不存在！");
            } else {
              if (res.data.results[0].password !== values.password)
                message.error("用户密码错误！");
              else {
                // 连表查询登录用户的信息
                axios({
                  method: "post",
                  url: "/api/loginInfo",
                  data: {
                    id: res.data.results[0].account,
                  },
                }).then((info) => {
                  localStorage.removeItem("user");
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      ...info.data.results[0],
                      ...res.data.results[0],
                    })
                  );
                  this.props.history.replace("/");
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("检验失败!");
      }
    });
  };

  render() {
    const form = this.props.form;
    const { getFieldDecorator } = form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <p>毕业生就业管理系统</p>
        </header>
        <section className="login-content">
          <p>用户登录</p>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator("account", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "账号必须输入",
                  },
                  // { min: 4, message: "用户名至少4位" },
                  // { max: 12, message: "用户名最多12位" },
                  // {
                  //   pattern: /^[a-zA-Z0-9_]+$/,
                  //   message: "用户名必须是英文、数字或下划线组成",
                  // },
                ],
                initialValue: "", // 初始值
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "请输入密码!",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
const WrapLogin = Form.create()(Login);
export default WrapLogin;
