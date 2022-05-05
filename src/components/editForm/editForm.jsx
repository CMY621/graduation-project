/* eslint-disable default-case */
import React, { Component } from "react";
import { Form, Button, Input, DatePicker, Select } from "antd";
import "./index.less";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;
class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFormItem = (field) => {
    const { editValues = {}, form } = this.props;
    const { getFieldDecorator } = form;
    const { title, dataIndex } = field;
    const initialValue =
      field.dataIndex === "birth"
        ? moment(editValues[field.dataIndex], "YYYY-MM-DD")
        : editValues[field.dataIndex] || "";
    return (
      <Form.Item label={title} name={title}>
        {getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `请输入${title}`,
            },
          ],
          initialValue: initialValue, // 初始值
        })(this.renderField(field))}
      </Form.Item>
    );
  };

  renderField = (field) => {
    const { title, type, selectValues = [] } = field;
    switch (type) {
      case "DDL":
        return (
          <Select
            showSearch
            placeholder={`请选择${title}`}
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
          <Input style={{ width: "100%" }} placeholder={`请输入${title}`} />
        );
      case "date":
        return <DatePicker format="YYYY-MM-DD" />;
      case "textArea":
        return <TextArea row={6} placeholder={`请输入${title}`} />;
    }
    return <div className="form-field-error">Error Field#{type}</div>;
  };

  //确认新增
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { editSubmit } = this.props;
        Object.keys(values).forEach((ele) => {
          !values[ele] && delete values[ele];
        });
        editSubmit && editSubmit(values);
      } else {
        console.log("检验失败!");
      }
    });
  };

  render() {
    const { tableFields } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 18 },
      },
    };
    return (
      <div className="editForm">
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          {tableFields.map((field) => {
            return this.renderFormItem(field);
          })}
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 2 },
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(EditForm);
