import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import './Upload.css';
import * as CONST from '../../constants';

function getUserToken() {
    return sessionStorage.getItem('accessToken');
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Avatar extends Component {
    state = {};

    handleChange = (info) => {
        //console.log(info)
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
            if(this.props.onChange){
                this.props.onChange(info)
            }
        }
    };

    render() {
        const {url} = this.props;
        const imageUrl = this.state.imageUrl ? this.state.imageUrl : url;
        console.log(url);
        return (
            <Upload
                className="avatar-uploader"
                name="image"
                showUploadList={false}
                action={CONST.BASIC_URL+"/api/company/uploadOne/accessToken/"+getUserToken()}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={{fontSize:"25px"}}
            >
                {
                    imageUrl ?
                        <img src={imageUrl} alt="" className="avatar" style={{maxWidth:"100px",maxHeight:"100px"}}/> :
                        <Icon type="plus" className="avatar-uploader-trigger" />
                }
            </Upload>
        );
    }
}

export default Avatar;