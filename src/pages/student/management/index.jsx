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
          width: "8%",
          type: "TXT",
        },
        {
          title: "性别",
          dataIndex: "gender",
          width: "5%",
          type: "DDL",
          selectValues: [
            { title: "男", value: "男" },
            { title: "女", value: "女" },
          ],
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
          width: "12%",
          type: "TXT",
        },
        {
          title: "级别",
          dataIndex: "level",
          width: "5%",
          type: "TXT",
        },
        {
          title: "籍贯",
          dataIndex: "native_place",
          width: "10%",
          type: "TXT",
        },
        {
          title: "联系方式",
          dataIndex: "phone",
          width: "10%",
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
          width: "12%",
          type: "date",
          render: (value, row, index) => {
            return moment(value).format("YYYY-MM-DD");
          },
        },
      ],
    };
    this.panelList = [
      {
        label: "学号",
        key: "student_id",
        type: "TXT",
        vague: true,
        defaultValue: "",
      },
      {
        label: "学院",
        key: "college",
        type: "DDL",
        width: 200,
        vague: true,
        defaultValue: "",
        selectValues: collegeList.map((ele) => {
          return { title: ele.title, value: ele.key };
        }),
      },
      {
        label: "专业班级",
        key: "professional_class",
        type: "TXT",
        vague: true,
        width: 200,
        defaultValue: "",
      },
      {
        label: "级别",
        key: "level",
        type: "TXT",
        vague: true,
        width: 200,
        defaultValue: "",
      },
    ];
  }

  componentDidMount = () => {
    // 查询学生信息
    this.queryStudent("SELECT * FROM student");
    this.renderColumns();
  };

  // 表头渲染、
  renderColumns = () => {
    this.setState({
      columns: [
        {
          title: "序号",
          dataIndex: "id",
          width: "5%",
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
          dataSource: res.data.results.reverse(),
          total: res.data.results.length,
          addVisible: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 查询事件
  handleSubmit = (values) => {
    let sql = "SELECT * FROM student ";
    let queryCon = "";
    Object.keys(values).forEach((ele, i) => {
      i === Object.keys(values).length - 1
        ? (queryCon += `${ele} like '%${values[ele]}%'`)
        : (queryCon += `${ele} like '%${values[ele]}%' and `);
    });
    if (queryCon !== "") sql += `where ${queryCon}`;
    this.queryStudent(sql);
  };

  // 新增事件
  add = (values) => {
    let value = {
      ...values,
      birth: moment(values.birth).format("YYYY-MM-DD"),
    };
    let sql = `INSERT INTO student (${Object.keys(value)}) VALUES `;
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
          this.queryStudent("SELECT * FROM student");
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
    let sql = "UPDATE student SET ";
    let value = {
      ...values,
      birth: moment(values.birth).format("YYYY-MM-DD"),
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
          this.queryStudent("SELECT * FROM student");
          this.setState({
            editBtn: false,
          });
          message.success(res.data.results.res);
        } else {
          message.error("添加失败，请重试！");
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
    let sql = `DELETE FROM student WHERE student_id = '${row.student_id}'`;
    axios({
      method: "post",
      url: "/api",
      data: { sql, type: "delete" },
    })
      .then((res) => {
        if (res.data.results.status === 200) {
          this.queryStudent("SELECT * FROM student");
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
              return f.dataIndex !== "operation" && f.dataIndex !== "id";
            })}
            addSubmit={this.add}
          />
        </div>
        <div className="table" style={{ height: "475px" }}>
          <Table
            scroll={{ y: 350 }}
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
                f.dataIndex !== "operation" &&
                f.dataIndex !== "id" &&
                f.dataIndex !== "student_id"
              );
            })}
            editSubmit={this.edit}
          />
        </Modal>
      </div>
    );
  }
}
