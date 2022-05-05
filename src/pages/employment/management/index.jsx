/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import QueryPanel from "../../../components/queryPanel/queryPanel";
import { Table, Popconfirm, Modal, message, Button } from "antd";
import axios from "axios";
import "./index.less";
import EditForm from "../../../components/editForm/editForm";
import moment from "moment";
import collegeList from "../../../config/collegeConfig";
const ButtonGroup = Button.Group;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.queryPanelRef = null;
    this.state = {
      total: 0,
      dataSource: [],
      editBtn: false,
      editValues: {}, // 编辑行信息
      columns: [
        {
          title: "姓名",
          dataIndex: "user_name",
          width: "8%",
          type: "TXT",
        },
        {
          title: "学号",
          dataIndex: "student_id",
          width: "7%",
          type: "TXT",
        },
        {
          title: "学院",
          dataIndex: "college",
          width: "8%",
          type: "DDL",
          selectValues: collegeList.map((ele) => {
            return { title: ele.title, value: ele.key };
          }),
        },
        {
          title: "专业班级",
          dataIndex: "professional_class",
          width: "10%",
          type: "TXT",
        },
        {
          title: "级别",
          dataIndex: "level",
          width: "6%",
          type: "TXT",
        },
        {
          title: "职位名称",
          dataIndex: "position",
          width: "15%",
          type: "TXT",
        },
        {
          title: "工作地点",
          dataIndex: "working_place",
          width: "10%",
          type: "TXT",
        },
        {
          title: "工作行业",
          dataIndex: "working_industry",
          width: "10%",
          type: "TXT",
        },
        {
          title: "企业名称",
          dataIndex: "enterprise_name",
          width: "10%",
          type: "TXT",
        },
        {
          title: "企业类别",
          dataIndex: "enterprise_category",
          width: "10%",
          type: "TXT",
        },
      ],
    };
    this.panelList = [
      {
        label: "学号",
        key: "student_id",
        type: "TXT",
        defaultValue: "",
      },
      {
        label: "学院",
        key: "college",
        type: "DDL",
        width: 200,
        defaultValue: "",
        selectValues: collegeList.map((ele) => {
          return { title: ele.title, value: ele.key };
        }),
      },
      {
        label: "专业班级",
        key: "professional class",
        type: "TXT",
        width: 200,
        defaultValue: "",
      },
      {
        label: "级别",
        key: "level",
        type: "TXT",
        width: 200,
        defaultValue: "",
      },
      {
        label: "职位名称",
        key: "position",
        type: "TXT",
        width: 200,
        defaultValue: "",
      },
      {
        label: "工作地点",
        key: "working_place",
        type: "TXT",
        width: 200,
        defaultValue: "",
      },
      {
        label: "工作行业",
        key: "working_industry",
        type: "TXT",
        width: 200,
        defaultValue: "",
      },
    ];
  }

  componentDidMount = () => {
    // 查询学生就业信息
    this.queryStudent(
      "SELECT * FROM employment,student where student.student_id = employment.student_id"
    );
    this.renderColumns();
  };

  // 表头渲染、
  renderColumns = () => {
    this.setState({
      columns: [
        {
          title: "序号",
          dataIndex: "id",
          width: "6%",
          render: (value, row, index) => {
            return index + 1;
          },
        },
        ...this.state.columns,
        {
          title: "操作",
          dataIndex: "operation",
          width: "10%",
          render: (value, row, index) => {
            return (
              <div className="operation">
                <ButtonGroup>
                  <Button
                    type="primary"
                    icon="edit"
                    onClick={() => {
                      this.tableEdit(row);
                    }}
                  />
                  <Popconfirm
                    title="确定删除这条数据吗？"
                    placement="topRight"
                    onConfirm={() => {
                      this.tableDelete(row);
                    }}
                    onCancel={this.cancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="danger" icon="delete" />
                  </Popconfirm>
                </ButtonGroup>
              </div>
            );
          },
        },
      ],
    });
  };

  // 查询学生信息
  queryStudent = (sql, type) => {
    axios({
      method: "post",
      url: "/api",
      data: { sql, type },
    })
      .then((res) => {
        this.setState({
          dataSource: res.data.results,
          total: res.data.results.length,
          addVisible: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 条件查询事件
  handleSubmit = (values) => {
    let sql =
      "SELECT * FROM ( SELECT b.*,a.position,a.working_place,a.working_industry,a.enterprise_name,a.enterprise_category FROM employment a, student b WHERE a.student_id = b.student_id ) AS total";
    let queryCon = "";
    Object.keys(values).forEach((ele, i) => {
      i === Object.keys(values).length - 1
        ? (queryCon += `${ele} like '%${values[ele]}%'`)
        : (queryCon += `${ele} like '%${values[ele]}%' and `);
    });
    if (queryCon !== "") sql += ` where ${queryCon}`;
    this.queryStudent(sql);
  };

  // 检查新增的学号是否在学生表中存在的，在学生就业表中不存在
  checkStudentId = async (id) => {
    const sql = `SELECT * FROM student WHERE student_id = '${id}'`;
    const res = await axios({
      method: "post",
      url: "/api",
      data: { sql, type: "query" },
    });
    if (res.data.results.length > 0) {
      const theSql = `SELECT * FROM employment WHERE student_id = '${id}'`;
      const employmentRes = await axios({
        method: "post",
        url: "/api",
        data: { sql: theSql, type: "query" },
      });
      if (employmentRes.data.results.length === 0) {
        return true;
      } else {
        message.error("该学号学生就业信息已存在！");
        return false;
      }
    } else {
      message.error("该学号学生信息不存在！");
      return false;
    }
  };

  // 新增事件
  add = async (values) => {
    let value = {
      ...values,
    };
    // 新增前先判断新增的学号是否存在
    const flag = await this.checkStudentId(values.student_id);
    if (!flag) {
      this.queryPanelRef.changeState();
      return;
    }
    let sql = `INSERT INTO employment (${Object.keys(value)}) VALUES `;
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
          this.queryStudent(
            "SELECT * FROM employment,student where student.student_id = employment.student_id"
          );
          this.queryPanelRef.changeState();
          message.success(res.data.results.res);
        } else {
          message.error("添加失败，请重试！");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 编辑事件
  edit = (values) => {
    let sql = "UPDATE employment SET ";
    let value = {
      ...values,
    };
    Object.keys(value).forEach((ele, i) => {
      i === Object.values(value).length - 1
        ? (sql += `${ele}='${value[ele]}'`)
        : (sql += `${ele}='${value[ele]}',`);
    });
    sql += ` WHERE student_id='${this.state.editValues.student_id}'`;
    axios({
      method: "post",
      url: "/api",
      data: { sql, type: "edit" },
    })
      .then((res) => {
        if (res.data.results.status === 200) {
          // 修改成功后更新数据
          this.queryStudent(
            "SELECT * FROM employment,student where student.student_id = employment.student_id"
          );
          this.setState({
            editBtn: false,
          });
          message.success(res.data.results.res);
        } else {
          message.error("修改失败，请重试！");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 编辑
  tableEdit = (row) => {
    this.setState({ editValues: row, editBtn: true });
  };

  // 删除
  tableDelete = (row) => {
    console.log(row);
    let sql = `DELETE FROM employment WHERE student_id = '${row.student_id}'`;
    axios({
      method: "post",
      url: "/api",
      data: { sql, type: "delete" },
    })
      .then((res) => {
        if (res.data.results.status === 200) {
          this.queryStudent(
            "SELECT * FROM employment,student where student.student_id = employment.student_id"
          );
          this.setState({
            editBtn: false,
          });
          message.success(res.data.results.res);
        } else {
          message.error("删除失败，请重试！");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  cancel = (e) => {};

  handleOk = (e) => {
    this.setState({
      editBtn: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      editBtn: false,
    });
  };

  render() {
    const { columns, dataSource, total, editBtn, editValues } = this.state;
    return (
      <div className="studentManagement">
        <div id="panel">
          <QueryPanel
            uRef={(ref) => {
              this.queryPanelRef = ref;
            }}
            list={this.panelList}
            addButton={true}
            handleSubmit={this.handleSubmit}
            tableFields={columns.filter((f) => {
              return (
                f.dataIndex === "student_id" ||
                f.dataIndex === "position" ||
                f.dataIndex === "working_place" ||
                f.dataIndex === "working_industry" ||
                f.dataIndex === "enterprise_name" ||
                f.dataIndex === "enterprise_category"
              );
            })}
            addSubmit={this.add}
          />
        </div>
        <div className="table" style={{ height: "475px" }}>
          <Table
            scroll={{ y: 320 }}
            columns={columns}
            dataSource={dataSource}
            Pagination={{
              pageSize: 8,
              total: total,
              showTotal: (total) => `总共 ${total} 条`,
            }}
          />
        </div>
        <Modal
          title="编辑信息"
          visible={editBtn}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <EditForm
            editValues={editValues}
            tableFields={columns.filter((f) => {
              return (
                f.dataIndex === "position" ||
                f.dataIndex === "working_place" ||
                f.dataIndex === "working_industry" ||
                f.dataIndex === "enterprise_name" ||
                f.dataIndex === "enterprise_category"
              );
            })}
            editSubmit={this.edit}
          />
        </Modal>
      </div>
    );
  }
}
