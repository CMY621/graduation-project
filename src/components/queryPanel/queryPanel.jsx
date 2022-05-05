/* eslint-disable default-case */
import React, { Component } from "react";
import "./index.less";
import {
  Form,
  Button,
  Input,
  Select,
  Row,
  Col,
  Icon,
  Modal,
  Cascader,
} from "antd";
import AddForm from "../addForm/addForm";
import options from "../../config/cascader-address-options";
const { Option } = Select;

class QueryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.list = this.props.list;
  }
  componentDidMount() {
    this.props.uRef(this);
  }

  // 渲染表单类型字段
  renderField(field) {
    const { type, selectValues = [], label, width } = field;
    switch (type) {
      case "DDL":
        return (
          <Select
            allowClear
            style={{ width: width }}
            showSearch
            placeholder={`请选择${label}`}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {selectValues.map((e, i) => (
              <Option key={i} value={e.value}>
                {e.title}
              </Option>
            ))}
          </Select>
        );
      case "TXT":
        return (
          <Input
            style={{ width: "100%" }}
            placeholder={`请输入${label}`}
            allowClear
          />
        );
      case "region":
        return <Cascader options={options} />;
      default:
        return <div className="form-field-error">Error Field#{type}</div>;
    }
  }
  // 渲染表单字段
  renderLayout(field) {
    const form = this.props.form;
    const { getFieldDecorator } = form;
    const { label, col, name, key } = field;
    return (
      <Col key={name} span={col || 6}>
        <div className="form-items">
          <Form.Item label={label} name={name}>
            {getFieldDecorator(key, {})(this.renderField(field))}
          </Form.Item>
        </div>
      </Col>
    );
  }

  //查询提交
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { handleSubmit } = this.props;
        Object.keys(values).forEach((ele) => {
          !values[ele] && delete values[ele];
        });
        handleSubmit && handleSubmit(values);
      } else {
        console.log("检验失败!");
      }
    });
  };

  //新增
  onClickButton = (key) => {
    this.setState({ visible: true });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  // 改变新增框的状态
  changeState = () => {
    this.setState({ visible: false });
  };

  // 清空表单

  render() {
    const { visible } = this.state;
    const { addButton, tableFields, addSubmit } = this.props;
    return (
      <div>
        <Form layout="inline" className="form">
          <Row gutter={16}>
            {this.list.map((field) => {
              return this.renderLayout(field);
            })}
          </Row>
          <Form.Item>
            <Button type="primary" onClick={this.handleSubmit}>
              <Icon type="search" />
              查询
            </Button>
            {addButton && (
              <Button
                type="primary"
                onClick={this.onClickButton}
                className="button"
              >
                <Icon type="plus" />
                新增
              </Button>
            )}
          </Form.Item>
        </Form>
        {addButton && (
          <Modal
            title="新增数据"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <AddForm fields={tableFields} addSubmit={addSubmit} />
          </Modal>
        )}
      </div>
    );
  }
}

export default Form.create()(QueryPanel);
