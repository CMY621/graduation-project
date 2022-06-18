/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Button, Descriptions, Icon, Modal, Card, message } from "antd";
import "./index.less";
import moment from "moment";
import AddForm from "../../components/addForm/addForm";
import EditForm from "../../components/editForm/editForm";
import axios from "axios";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      addBtn: false,
      registerVisible: false,
      editVisible: false,
      editModalTitle: "用户信息", // 修改信息的title值
      registerFields: [
        {
          title: "账号",
          dataIndex: "account",
        },
        {
          title: "密码",
          dataIndex: "password",
        },
      ],
      editFields: {
        //信息修改表单字段
        用户信息: [
          {
            title: "籍贯",
            dataIndex: "native_place",
            type: "TXT",
          },
          {
            title: "联系方式",
            dataIndex: "phone",
            type: "TXT",
          },
          {
            title: "民族",
            dataIndex: "nation",
            type: "TXT",
          },
          {
            title: "出生年月",
            dataIndex: "birth",
            type: "date",
          },
        ],
        就业信息: [
          {
            title: "工作地点",
            dataIndex: "working_place",
            type: "TXT",
          },
          {
            title: "工作行业",
            dataIndex: "working_industry",
            type: "TXT",
          },
          {
            title: "企业名称",
            dataIndex: "enterprise_name",
            type: "TXT",
          },
          {
            title: "企业类别",
            dataIndex: "enterprise_category",
            type: "TXT",
          },
        ],
      },
      fields: {
        // 信息展示字段
        账户信息: [
          {
            title: "账号",
            dataIndex: "account",
          },
          {
            title: "用户名",
            dataIndex: "user_name",
          },
          {
            title: "身份权限",
            dataIndex: "authority",
          },
        ],
        用户信息: [],
        就业信息: [],
      },
    };
    // 注册字段
    this.registerFields = [
      {
        title: "账号",
        dataIndex: "account",
        type: "TXT",
      },
      {
        title: "用户名",
        dataIndex: "user_name",
        type: "TXT",
      },
      {
        title: "密码",
        dataIndex: "password",
        type: "TXT",
      },
      {
        title: "身份权限",
        dataIndex: "authority",
        type: "radio",
        selectValues: [
          { title: "管理员", value: "1" },
          { title: "普通用户", value: "2" },
        ],
      },
    ];
  }

  componentDidMount = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const { fields } = this.state;
    if (userInfo.authority === "1") {
      // 管理员则可编辑用户信息
      this.setState({ addBtn: true });
    }
    let addFields = { ...fields };
    if (userInfo.college)
      addFields = {
        ...addFields,
        用户信息: [
          {
            title: "姓名",
            dataIndex: "user_name",
          },
          {
            title: "学号",
            dataIndex: "student_id",
          },
          {
            title: "性别",
            dataIndex: "gender",
          },
          {
            title: "学院",
            dataIndex: "college",
          },
          {
            title: "专业班级",
            dataIndex: "professional_class",
          },
          {
            title: "级别",
            dataIndex: "level",
          },
          {
            title: "籍贯",
            dataIndex: "native_place",
          },
          {
            title: "联系方式",
            dataIndex: "phone",
          },
          {
            title: "民族",
            dataIndex: "nation",
          },
          {
            title: "出生年月",
            dataIndex: "birth",
          },
        ],
      };
    if (userInfo.working_place)
      addFields = {
        ...addFields,
        就业信息: [
          {
            title: "工作地点",
            dataIndex: "working_place",
          },
          {
            title: "工作行业",
            dataIndex: "working_industry",
          },
          {
            title: "企业名称",
            dataIndex: "enterprise_name",
          },
          {
            title: "企业类别",
            dataIndex: "enterprise_category",
          },
        ],
      };
    this.setState({ userInfo, fields: addFields });
  };

  // 修改用户信息
  editUserBtn = (title) => {
    this.setState({ editVisible: true, editModalTitle: title });
  };
  editClick = (values) => {
    console.log(values);
    const { editModalTitle } = this.state;
    const userInfo = JSON.parse(localStorage.getItem("user"));
    let sql =
      editModalTitle === "用户信息"
        ? "UPDATE student SET "
        : "UPDATE employment SET ";
    let value = {
      ...values,
    };
    if (editModalTitle === "用户信息") {
      value = {
        ...value,
        birth: moment(values.birth).format("YYYY-MM-DD"),
      };
    }
    Object.keys(value).forEach((ele, i) => {
      i === Object.values(value).length - 1
        ? (sql += `${ele}='${value[ele]}'`)
        : (sql += `${ele}='${value[ele]}',`);
    });
    sql += ` WHERE student_id='${userInfo.student_id}'`;
    axios({
      method: "post",
      url: "/api",
      data: { sql, type: "edit" },
    })
      .then((res) => {
        if (res.data.results.status === 200) {
          // 修改成功后再更新用户信息
          this.upDateUserInfo(userInfo.student_id);
          message.success(res.data.results.res);
        } else {
          message.error("添加失败，请重试！");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 修改信息后的更新登录者信息并储存
  upDateUserInfo = (id) => {
    axios({
      method: "post",
      url: "/api/loginInfo",
      data: { id },
    }).then((info) => {
      localStorage.removeItem("user");
      const newUserInfo = {
        ...this.state.userInfo,
        ...info.data.results[0],
      };
      localStorage.setItem("user", JSON.stringify(newUserInfo));
      this.setState({ userInfo: newUserInfo, editVisible: false });
    });
  };

  // 注册新用户
  testRegisterId = async (id) => {
    const sql = `SELECT * FROM user WHERE account = '${id}'`;
    const res = await axios({
      method: "post",
      url: "/api",
      data: { sql, type: "query" },
    });
    if (res.data.results.length === 0) {
      return true;
    } else {
      message.error("此账号已注册，请重试！");
      return false;
    }
  };
  // 注册新用户
  addUserBtn = () => {
    this.setState({ registerVisible: true });
  };
  addSubmit = async (values) => {
    let value = {
      ...values,
    };
    const flag = await this.testRegisterId(values.account);
    if (!flag) return;
    let sql = `INSERT INTO user (${Object.keys(value)}) VALUES `;
    let row = "";
    Object.values(value).forEach((ele, i) => {
      i === Object.values(value).length - 1
        ? (row += `'${ele}'`)
        : (row += `'${ele}',`);
    });
    sql += `(${row})`;
    axios({
      method: "post",
      url: "/api",
      data: { sql, type: "add" },
    })
      .then((res) => {
        if (res.data.results.status === 200) {
          this.setState({
            editVisible: false,
            registerVisible: false,
          });
          message.success("注册成功！");
        } else {
          message.error("注册失败，请重试！");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("注册失败，请重试！");
      });
  };

  handleOk = (e) => {
    this.setState({
      editVisible: false,
      registerVisible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      editVisible: false,
      registerVisible: false,
    });
  };

  render() {
    const {
      userInfo,
      addBtn,
      fields,
      editVisible,
      registerVisible,
      editModalTitle,
      editFields,
    } = this.state;
    return (
      <div className="userInformation">
        <div className="buttonArea">
          {addBtn && (
            <Button type="primary" onClick={this.addUserBtn}>
              <Icon type="plus" />
              注册新用户
            </Button>
          )}
        </div>
        {Object.keys(fields).map((title) => {
          return (
            fields[title].length !== 0 && (
              <Card
                title={title}
                extra={
                  title !== "账户信息" && (
                    <Button
                      type="primary"
                      onClick={() => {
                        this.editUserBtn(title);
                      }}
                    >
                      {`修改${title}`}
                    </Button>
                  )
                }
                className="UserCard"
              >
                <Descriptions title="" className="panel">
                  {fields[title].map((ele) => {
                    const { dataIndex } = ele;
                    let theValue;
                    if (dataIndex === "authority")
                      theValue =
                        userInfo[dataIndex] === "1" ? "管理员" : "普通用户";
                    else if (dataIndex === "birth")
                      theValue = moment(userInfo[dataIndex]).format(
                        "YYYY-MM-DD"
                      );
                    else theValue = userInfo[dataIndex];
                    return userInfo[dataIndex] ? (
                      <Descriptions.Item label={ele.title}>
                        {theValue}
                      </Descriptions.Item>
                    ) : null;
                  })}
                </Descriptions>
              </Card>
            )
          );
        })}
        <Modal
          title={`修改${editModalTitle}`}
          visible={editVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <EditForm
            editValues={userInfo}
            tableFields={editFields[editModalTitle]}
            editSubmit={this.editClick}
          />
        </Modal>
        <Modal
          title="注册新用户"
          visible={registerVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <AddForm fields={this.registerFields} addSubmit={this.addSubmit} />
        </Modal>
      </div>
    );
  }
}
