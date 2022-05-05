import React, { Component } from "react";
import axios from "axios";
import "./index.less";
import BarChart from "../Echarts/barChart";
import PieChart from "../Echarts/pieChart";
import collegeList from "../../../config/collegeConfig";
import { Radio } from "antd";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      seriesTitle: [{ title: "学院", key: "college" }],
      seriesData: {},
      xData: [],
    };
  }
  componentDidMount = () => {
    //请求数据
    this.queryData("计信");
  };

  queryData = (value) => {
    axios({
      method: "post",
      url: "/api",
      data: {
        sql: `SELECT * FROM student where college = '${value}'`,
      },
    })
      .then((res) => {
        const xData = Array.from(
          new Set(
            res.data.results.map((f) => {
              return Number(f.level);
            })
          )
        ).sort();
        let seriesData = { college: [] };
        xData.forEach((ele) => {
          seriesData["college"].push(
            res.data.results.filter((f) => {
              return f.level === `${ele}`;
            }).length
          );
        });
        this.setState({
          data: res.data.results,
          xData: xData,
          seriesData,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onchange = (e) => {
    this.queryData(e.target.value);
  };

  renderRadio = () => {
    return (
      <Radio.Group
        defaultValue="计信"
        className="studentStatisticsRadio"
        onChange={this.onchange}
      >
        {collegeList.map((ele) => {
          return <Radio.Button value={ele.title}>{ele.title}</Radio.Button>;
        })}
      </Radio.Group>
    );
  };

  render() {
    const { seriesTitle, data, xData, seriesData } = this.state;
    return (
      <div className="studentStatistics">
        {this.renderRadio()}
        <div className="studentStatisticsCharts">
          <div className="barCharts">
            <BarChart
              data={data}
              title={seriesTitle}
              xData={xData}
              seriesData={seriesData}
            />
          </div>
          <div className="pieCharts">
            <PieChart
              data={data}
              title={seriesTitle}
              xData={xData}
              seriesData={seriesData}
            />
          </div>
        </div>
      </div>
    );
  }
}
