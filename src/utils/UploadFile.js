import { Upload, Icon, message } from 'antd';
import {BASIC_URL} from "../constants";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        message.error('目前支持jpg/png图片类型!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
}

class UploadFile extends React.Component {
    state = {
        aims: ''
    };

    handleChange = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
        if(info.file.response && info.file.response.code === 200) {
            this.props.getimgurl(info.file.response.data.imgUrl)
        }
    };

    render() {
        const {url} = this.props;
        const imageUrl = this.state.imageUrl ? this.state.imageUrl : url;
        console.log(this.state.imageUrl);
        return (
            <Upload
                className="avatar-uploader"
                name="fd_avatar"
                showUploadList={false}
                action={this.props.actionName || BASIC_URL + '/front/upload/upload'}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >

                {
                    imageUrl ?
                        <img src={imageUrl} alt="image" style={{width:'150px'}} />

                    :
                        <Icon type="plus" className="avatar-uploader-trigger" />
                }

            </Upload>
        );
    }
}

export default UploadFile;
