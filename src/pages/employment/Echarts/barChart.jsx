import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // option: {
      //   tooltip: {},
      //   legend: {
      //     show: true,
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "3%",
      //     bottom: "5%",
      //     top: "8%",
      //     containLabel: true,
      //   },
      //   xAxis: {
      //     type: "category",
      //     data: ["16级", "17级", "18级"],
      //   },
      //   yAxis: {
      //     type: "value",
      //   },
      //   series: [
      //     {
      //       name: "新增用户数量",
      //       type: "bar",
      //       stack: "account",
      //       barWidth: 26,
      //       itemStyle: {
      //         color: {
      //           x: 0,
      //           y: 0,
      //           x2: 0,
      //           y2: 1,
      //           type: "linear",
      //           global: false,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: "#017ebb",
      //             },
      //             {
      //               offset: 1,
      //               color: "#06fbfe",
      //             },
      //           ],
      //         },
      //       },
      //       data: [320, 302, 120, 100, 540, 123, 345, 667, 333, 122, 211, 99],
      //     },
      //     {
      //       name: "邀请新用户数量",
      //       type: "bar",
      //       stack: "account",
      //       barWidth: 26,
      //       itemStyle: {
      //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           { offset: 0, color: "#ffae88" },
      //           { offset: 1, color: "#ff7388" },
      //         ]),
      //       },
      //       data: [120, 102, 90, 150, 120, 123, 145, 167, 133, 172, 111, 199],
      //     },
      //     {
      //       z: 3,
      //       type: "pictorialBar",
      //       symbolPosition: "end",
      //       data: [320, 302, 120, 100, 540, 123, 345, 667, 333, 122, 211, 99],
      //       symbol: "diamond",
      //       symbolOffset: [0, "-50%"],
      //       symbolSize: [26, 10],
      //       itemStyle: {
      //         normal: {
      //           borderWidth: 0,
      //           color: "#10e6ff",
      //         },
      //       },
      //     },
      //     {
      //       z: 3,
      //       type: "pictorialBar",
      //       symbolPosition: "end",
      //       data: [440, 404, 210, 250, 660, 246, 490, 834, 466, 294, 322, 298],
      //       symbol: "diamond",
      //       symbolOffset: [0, "-50%"],
      //       symbolSize: [26, 10],
      //       itemStyle: {
      //         normal: {
      //           borderWidth: 0,
      //           color: "#ffcf90",
      //         },
      //       },
      //     },
      //   ],
      // },
      option: {
        tooltip: {},
        legend: {
          show: true,
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "5%",
          top: "12%",
          containLabel: true,
        },
        xAxis: {},
        yAxis: {
          type: "value",
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
    const seriesColor = [
      ["#017ebb", "#06fbfe", "#10e6ff"],
      // ["#ffae88", "#ff7388", "#ffcf90"],
    ];
    let series = [];
    series.push(
      {
        name: "职位",
        type: "bar",
        stack: "account",
        barWidth: 26,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: seriesColor[0][0],
              },
              {
                offset: 1,
                color: seriesColor[0][1],
              },
            ],
          },
        },
        data: seriesData,
      },
      {
        z: 3,
        type: "pictorialBar",
        symbolPosition: "end",
        data: seriesData,
        symbol: "diamond",
        symbolOffset: [0, "-50%"],
        symbolSize: [26, 10],
        itemStyle: {
          normal: {
            borderWidth: 0,
            color: seriesColor[0][2],
          },
        },
      }
    );
    this.setState({
      option: {
        ...this.state.option,
        xAxis: {
          ...{
            type: "category",
            axisLabel: {
              //x轴文字的配置
              show: true,
              interval: 0, //使x轴文字显示全
            },
            data: xData,
          },
        },
        series: [...series],
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
