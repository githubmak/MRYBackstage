/**
 * Created by kissy on 2017/10/17.
 */
import React, { Component } from 'react';
import { Modal, Form, Input,Radio } from 'antd';
import Avatar from './Upload';
import './Upload.css';

const FormItem = Form.Item;
class ManageShopForm extends Component{
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

  handleImageUrl = (Url) =>{
    console.log(Url)
  };

  render(){
    const { children,form,info} = this.props;
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
        <Modal visible={this.state.visible} title="编辑店铺信息" okText="提交" afterClose={this.handleFormClear} onCancel={this.hideModelHandler} onOk={this.submitHandler}>
          <Form layout="vertical">
            <FormItem {...formItemLayout} label="店名" hasFeedback>
              {getFieldDecorator('shop_key', {
                initialValue:info.fd_key ? info.fd_key : '',
                rules: [
                    { required: true, message: '请输入店名！'},
                    {max:50, message:'店名不能大于50个字符'},
                    {pattern: '^\\S*$',message:'只能是中文、英文、数字或符号'}
                    ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="店铺地址" hasFeedback>
              {getFieldDecorator('shop_value',{
                initialValue:info.json.address ? info.json.address : '',
                rules: [{ required: true, message: '请输入店铺地址！'}],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="联系电话" hasFeedback>
              {getFieldDecorator('shop_phone',{
                  initialValue:info.json.phone ? info.json.phone : '',
                  rules: [{ required: true, message: '请输入联系电话！'},{pattern: '^\\S*$',message:'不能有空格'}],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="微信号" hasFeedback>
              {getFieldDecorator('shop_weChat',{
                  initialValue:info.json.weChat ? info.json.weChat : '',
                  rules: [{ required: true, message: '请输入微信号！'},{pattern: '^\\S*$',message:'不能有空格'}],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="备注" hasFeedback>
              {getFieldDecorator('shop_remark',{
                  initialValue:info.fd_remark ? info.fd_remark : '',
                  rules: [{ required: false},{max:255, message:'备注不能大于255个字符'}],
              })(<Input type="textarea" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="店铺标志" hasFeedback>
              {getFieldDecorator('image',{
                  initialValue:info.json.image ? info.json.image : '',
                  rules: [{ required: false}],
              })(<Avatar onChange={this.handleImageUrl.bind(this)} url={info.json.image}/>)}
            </FormItem>
            <FormItem {...formItemLayout} >
              {getFieldDecorator('shop_field', {
                  initialValue:'shop',
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

export default Form.create()(ManageShopForm);
