/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
import axios from "axios";
import { Card } from "antd";
import "./index.less";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = { dataSource: [] };
  }

  componentDidMount = () => {
    let sql = "SELECT * FROM about_us";
    axios({
      method: "post",
      url: "/api",
      data: { sql, type: "query" },
    })
      .then((res) => {
        console.log(res.data.results);
        this.setState({
          dataSource: res.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="about_us">
        {dataSource.map((ele) => {
          const { module, release_time, content_type, content, url } = ele;
          return (
            <Card
              title={module}
              extra={
                content_type === "a" ? (
                  <a href={url} target="_blank">
                    查看详情
                  </a>
                ) : null
              }
              style={{ width: "100%", marginBottom: "20px" }}
            >
              {content_type === "b" && (
                <div className="about_us_box">
                  <div className="about_us_time">
                    <span className="about_us_contentTitle">发布时间：</span>
                    <span className="about_us_content">{release_time}</span>
                  </div>
                  <p>{content}</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    );
  }
}
