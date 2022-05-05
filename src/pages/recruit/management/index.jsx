/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import QueryPanel from "../../../components/queryPanel/queryPanel";
import { Table, Popconfirm, Modal, message, Button } from "antd";
import axios from "axios";
import "./index.less";
import EditForm from "../../../components/editForm/editForm";
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
          title: "职位名称",
          dataIndex: "position",
          width: "10%",
          type: "TXT",
        },
        {
          title: "职位类别",
          dataIndex: "job_category",
          width: "8%",
          type: "TXT",
        },
        {
          title: "公司名称",
          dataIndex: "enterprise_name",
          width: "10%",
          type: "TXT",
        },
        {
          title: "工作地点",
          dataIndex: "working_place",
          width: "10%",
          type: "TXT",
        },
        {
          title: "薪资待遇",
          dataIndex: "salary",
          width: "8%",
          type: "TXT",
        },
        {
          title: "岗位职责",
          dataIndex: "job_responsibilities",
          width: "20%",
          type: "textArea",
        },
        {
          title: "任职要求",
          dataIndex: "job_requirements",
          width: "20%",
          type: "textArea",
        },
      ],
    };
    this.panelList = [
      {
        label: "职位名称",
        key: "position",
        width: 200,
        type: "TXT",
        defaultValue: "",
      },
      {
        label: "职位类别",
        key: "job_category",
        type: "TXT",
        width: 200,
        defaultValue: "",
      },
      {
        label: "公司名称",
        key: "enterprise_name",
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
    ];
  }

  componentDidMount = () => {
    // 查询学生信息
    this.queryStudent("SELECT * FROM recruit");
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
  // 查询企业招聘信息
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

  // 查询事件
  handleSubmit = (values) => {
    let sql = "SELECT * FROM recruit ";
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
    };
    let sql = `INSERT INTO recruit (${Object.keys(value)}) VALUES `;
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
          this.queryStudent("SELECT * FROM recruit");
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
    let sql = "UPDATE recruit SET ";
    let value = {
      ...values,
    };
    Object.keys(value).forEach((ele, i) => {
      i === Object.values(value).length - 1
        ? (sql += `${ele}='${value[ele]}'`)
        : (sql += `${ele}='${value[ele]}',`);
    });
    sql += ` WHERE id='${this.state.editValues.id}'`;
    axios({
      method: "post",
      url: "/api",
      data: { sql, type: "edit" },
    })
      .then((res) => {
        if (res.data.results.status === 200) {
          this.queryStudent("SELECT * FROM recruit");
          this.setState({
            editBtn: false,
          });
          message.success(res.data.results.res);
        } else {
          message.error("编辑失败，请重试！");
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
    let sql = `DELETE FROM recruit WHERE id='${row.id}'`;
    axios({
      method: "post",
      url: "/api",
      data: { sql, type: "delete" },
    })
      .then((res) => {
        if (res.data.results.status === 200) {
          this.queryStudent("SELECT * FROM recruit");
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
