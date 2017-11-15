/**
 * Created by kissy on 2017/10/17.
 */
import React, {Component} from 'react';
import {Modal, Form, Input, Radio} from 'antd';
import UploadFile from "../Common/UploadFile";

const FormItem = Form.Item;

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false, imgUrl:undefined};
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
        debugger
        const {formSubmit} = this.props;
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
    handleFormClear = () => {
        const {form} = this.props;
        form.resetFields();
    };

    getimgurl=(url)=>{
        this.setState({
            imgUrl:url
        })
    }

    render() {
        const {children, form, detail, pageNum} = this.props;
        const {getFieldDecorator} = form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 10},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal visible={this.state.visible} title="修改技师" okText="提交" afterClose={this.handleFormClear}
               onCancel={this.hideModelHandler} onOk={this.submitHandler}>
          <Form layout="vertical">
            <FormItem {...formItemLayout} >
              {getFieldDecorator('fd_id', {
                  initialValue: detail.fd_id,
                  rules: [{required: true}],
              })(
                  <Input type="hidden"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} >
              {getFieldDecorator('page', {
                  initialValue: pageNum,
                  rules: [{required: true}],
              })(
                  <Input type="hidden"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名" hasFeedback>
              {getFieldDecorator('fd_key', {
                  initialValue: detail.fd_key,
                  rules: [
                      {required: true, message: '请输入技师姓名！'},
                      {max: 50, message: '姓名不能大于50个字符'},
                      {pattern: '^\\S*$', message: '只能是中文、英文、数字或符号'}
                  ],
              })(
                  <Input/>
              )}
            </FormItem>
              <FormItem {...formItemLayout} label="技师头像" hasFeedback>
              {getFieldDecorator('fd_avatar', {
                  initialValue: this.state.imgUrl ? this.state.imgUrl : detail.fd_avatar,
              })(<UploadFile getimgurl={this.getimgurl} url={detail.fd_avatar}/>)}

            </FormItem>
            <FormItem {...formItemLayout} label="技师介绍" hasFeedback>
              {getFieldDecorator('fd_values', {
                  initialValue: detail.fd_values,
                  rules: [{required: true, message: '请输技师介绍！'}],
              })(<Input type="textarea"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="备注" hasFeedback>
              {getFieldDecorator('fd_remark', {
                  initialValue: detail.fd_remark,
                  rules: [{required: false}, {max: 255, message: '备注不能大于255个字符'}],
              })(<Input type="textarea"/>)}
            </FormItem>
          </Form>
        </Modal>
      </span>
        );
    }
}

export default Form.create()(EditForm);
