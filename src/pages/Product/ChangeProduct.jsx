import React, {Component} from 'react'
import 'antd/dist/antd.css';
import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;

@Form.create()
class ChangeProduct extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    
      handleSelectChange = value => {
        console.log(value);
        this.props.form.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} onSubmit={this.handleSubmit}>
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input product name!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description', {
                rules: [{message: 'Please input product description!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Quantity">
              {getFieldDecorator('quantity', {
                rules: [{ required: true, message: 'Please input product quantity!' }],
              })(<Input />)}
            </Form.Item>
          
            <Form.Item label="Gender">
              {getFieldDecorator('gender', {
                rules: [{ required: true, message: 'Please select your gender!' }],
              })(
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={this.handleSelectChange}
                >
                  <Option value="male">ádasdsa</Option>
                  <Option value="female">ádasd</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        );
      }
}

export default ChangeProduct

