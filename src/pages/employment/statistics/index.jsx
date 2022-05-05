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
      defaultValue: "湖北武汉",
      data: [],
      radioList: [],
    };
  }
  componentDidMount = () => {
    //请求数据
    this.queryData();
  };

  queryData = (value) => {
    const { radioList } = this.state;
    const sql = value
      ? `SELECT * FROM employment where working_place = '${value}'`
      : "SELECT * FROM employment";
    axios({
      method: "post",
      url: "/api",
      data: {
        sql,
      },
    })
      .then((res) => {
        const radioList = Array.from(
          new Set(
            res.data.results.map((f) => {
              return f.working_place;
            })
          )
        );
        const data = !value
          ? res.data.results.filter((t) => {
              return t.working_place === this.state.defaultValue;
            })
          : res.data.results;
        console.log(data);
        !value && this.setState({ radioList });
        this.setState({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onchange = (e) => {
    this.setState({ defaultValue: e.target.value });
    this.queryData(e.target.value);
  };

  renderRadio = () => {
    const { radioList, defaultValue } = this.state;
    return (
      <Radio.Group
        defaultValue={defaultValue}
        className="employmentStatisticsRadio"
        onChange={this.onchange}
      >
        {radioList.map((ele) => {
          return <Radio.Button value={ele}>{ele}</Radio.Button>;
        })}
      </Radio.Group>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div className="employmentStatistics">
        {this.renderRadio()}
        <div className="employmentStatisticsCharts">
          <div className="barCharts">
            <BarChart data={data} />
          </div>
          <div className="pieCharts">
            <PieChart data={data} />
          </div>
        </div>
      </div>
    );
  }
}
