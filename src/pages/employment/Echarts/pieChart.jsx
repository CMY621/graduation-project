import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "0%",
          left: "center",
        },
        series: [],
      },
    };
  }

  componentDidUpdate = (nextProps, thisState) => {
    const { data } = this.props;
    if (nextProps.data !== data) {
      const xData = Array.from(
        new Set(
          data.map((f) => {
            return f.position;
          })
        )
      );
      const seriesData = xData.map((ele) => {
        return data.filter((t) => {
          return t.position === ele;
        }).length;
      });
      this.handleData(xData, seriesData);
    } else {
      return true;
    }
  };

  handleData = (xData, seriesData) => {
    let data = [];
    xData.forEach((ele, i) => {
      data.push({ value: seriesData[i], name: `${ele}` });
    });
    this.setState({
      option: {
        ...this.state.option,
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "80%"],
            avoidLabelOverlap: false,
            colorStops: [
              "#5470c6",
              "#91cc75",
              "#fac858",
              "#ee6666",
              "#73c0de",
              "#3ba272",
              "#fc8452",
              "#9a60b4",
              "#ea7ccc",
            ],
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      },
    });
  };

  render() {
    const { option } = this.state;
    return (
      <div
        style={{ width: "100%", height: `calc(100% - 80px)`, marginTop: 30 }}
      >
        <ReactEcharts
          style={{ width: "100%", height: "100%" }}
          option={option}
          notMerge
        />
      </div>
    );
  }
}
