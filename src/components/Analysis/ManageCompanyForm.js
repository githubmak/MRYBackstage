/**
 * Created by kissy on 2017/10/17.
 */
import React, { Component } from 'react';
import { Modal, Form, Input,Radio } from 'antd';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';

const FormItem = Form.Item;
class ManageCompanyForm extends Component{
  constructor(props) {
    super(props);
    this.state = {visible: false};
  }

  /**
   * 打开添加窗口
   * @param e
   */
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({visible: true});
  };
  /**
   *  隐藏窗口
   */
  hideModelHandler = () => {
    this.setState({visible: false});
  };
  /**
   *  提交表单数据
   */
  submitHandler = () => {
    const { formSubmit } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        formSubmit(values);
        this.hideModelHandler();
      }
    });
  };
  /**
   * 清除表单数据
   */
  handleFormClear = () =>{
    const { form } = this.props;
    form.resetFields();
  };

  render(){
    const { children,form,introduce} = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <span>

        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal visible={this.state.visible} title="编辑公司简介" okText="提交" afterClose={this.handleFormClear}
               onCancel={this.hideModelHandler} onOk={this.submitHandler}
               width={1000}
        >
          <Form layout="vertical">
            <FormItem {...formItemLayout} label="公司简介" hasFeedback>
              {getFieldDecorator('introduce_value',{
                  initialValue:introduce.fd_values ? introduce.fd_values : '',
                  rules: [{ required: true, message: '请输入公司简介！'}],
              })(<ReactQuill  />)}
            </FormItem>
            <FormItem {...formItemLayout} >
              {getFieldDecorator('introduce_field', {
                  initialValue:'introduce',
                  rules: [{ required: true}],
              })(
                  <Input type="hidden"/>
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ManageCompanyForm);
