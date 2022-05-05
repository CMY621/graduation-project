/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
import { Form, List, Button, Icon, Select, Spin } from "antd";
import "./index.less";
import axios from "axios";
const { Option } = Select;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = { module: "", dataSource: [], loading: true };
  }

  componentDidMount = () => {
    this.queryData("SELECT * FROM notice");
  };

  queryData = (sql) => {
    axios({
      method: "post",
      url: "/api",
      data: { sql, type: "query" },
    })
      .then((res) => {
        this.setState({
          dataSource: res.data.results,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let sql = values.module
          ? `SELECT * FROM notice where module = '${values.module}'`
          : "SELECT * FROM notice";
        this.queryData(sql);
      } else {
        console.log("检验失败!");
      }
    });
  };

  render() {
    const form = this.props.form;
    const { getFieldDecorator } = form;
    const { loading } = this.state;
    return (
      <div className="notice">
        <Form layout="inline">
          <Form.Item label="公告类型：">
            {getFieldDecorator(
              "module",
              {}
            )(
              <Select
                placeholder="请选择公告类型"
                style={{ width: 200 }}
                allowClear
              >
                <Option value="通知公告">通知公告</Option>
                <Option value="新闻快递">新闻快递</Option>
                <Option value="招聘公告">招聘公告</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handleSubmit}>
              <Icon type="search" />
              查询
            </Button>
          </Form.Item>
        </Form>
        <Spin tip="加载中..." spinning={loading}>
          <List
            className="notice_list"
            itemLayout="horizontal"
            dataSource={this.state.dataSource}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a href={item.url} target="_blank">
                      {item.title}
                    </a>
                  }
                />
              </List.Item>
            )}
          />
        </Spin>
      </div>
    );
  }
}
export default Form.create()(index);
