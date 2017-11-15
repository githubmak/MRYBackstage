import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Avatar, Tooltip, Row, Col, Card, Icon, Button } from 'antd';
import styles from './index.less';
//import ManageShopFrom from './ManageShopForm';
import ManageCompanyForm from './ManageCompanyForm';
const statusMap = ['default', 'processing', 'success', 'error'];
class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, totalCallNo });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { selectedRowKeys, totalCallNo } = this.state;
    const { data: {code, data:{list}, pagination }, loading,onPageChange, onFormSubmit, page, onShopSubmit } = this.props;
    //const{ data: {list, pagination },loading} = this.props
    console.log(list.length)
    //const { list } = list;
    const columns = [
      {
        title: '员工ID',
        dataIndex: 'fd_id',
      },
      {
        title: '员工姓名',
        dataIndex: 'fd_key',
      },
      {
        title: '头像',
        dataIndex: 'fd_avatar',
        key: 'avatar',
        render: (text, record) => (
          <Avatar src={text} size="large" icon="user" />
        )
      },
      {
        title: '职称',
        dataIndex: 'fd_values',
      },
      {
        title: '介绍',
        dataIndex: 'fd_remark',
      },
      {
        title: '创建时间',
        dataIndex: 'fd_createDate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <p>
            <a href="">编辑</a>
          </p>
        ),
      },
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
    return (
    list.length!==0 ?
    <div>
      <Row>
        <Col span={6}>
          <Card style={{marginBottom: 20}}>
            <Icon type="shop" style={{fontSize: 16, color: '#08c'}}/>
              <strong style={{color: "#108ee9", fontSize: 16, marginRight: 5}}>店铺信息</strong>
              <p style={{fontSize: 14}}>
                <span style={{color: "#108ee9"}}>
                  <Icon type="credit-card" style={{marginRight: 5}}/>店名：
                </span>
                <Tooltip placement="topLeft" title="{page.data.shop.fd_key}">
                  <span style={{width: 250, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{/*page.data.shop.fd_key*/}</span>
                </Tooltip>
              </p>
              <p style={{fontSize: 14}}>
                <span style={{color: "#108ee9"}}>
                  <Icon type="environment-o" style={{marginRight: 5}}/>地址：
                </span>
                <Tooltip placement="topLeft" title="{page.data.shop.json.address}">
                  <span style={{width: 250, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{/*page.data.shop.json.address*/}</span>
                </Tooltip>
              </p>
              <p style={{fontSize: 14}}>
                <span style={{color: "#108ee9"}}>
                  <Icon type="phone" style={{marginRight: 5}}/>联系电话：
                </span>
                <Tooltip placement="topLeft" title="{page.data.shop.json.phone}">
                  <span style={{width: 250, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{/*page.data.shop.json.phone*/}</span>
                </Tooltip>
              </p>
              <p style={{fontSize: 14}}>
                <span style={{color: "#108ee9"}}>
                   <Icon type="message" style={{marginRight: 5}}/>微信号：
                 </span>
                 <Tooltip placement="topLeft" title="{page.data.shop.json.weChat}">
                   <span style={{width: 250, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{/*page.data.shop.json.weChat*/}</span>
                </Tooltip>
              </p>
              <p style={{fontSize: 14}}>
                 <span style={{color: "#108ee9"}}>
                   <Icon type="file-text" style={{marginRight: 5}}/>备注：
                 </span>
                 <Tooltip placement="topLeft" title="{page.data.shop.fd_remark}">
                   <span style={{width: 250, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{/*page.data.shop.fd_remark*/}</span>
                 </Tooltip>
               </p>
              {/*<ManageShopFrom formSubmit={onShopSubmit} info="{page.data.shop}">
                 <Button type="primary" icon="edit" style={{float: "right"}}>{null != page.data.shop.fd_key && null != page.data.shop.fd_values ? '编辑' : '新增'}</Button>
              </ManageShopFrom>
             */}
              </Card>
              </Col>
              <Col span={1}/>
               <Col span={17}>
                 <Card style={{marginBottom: 20, maxHeight: 550}}>
                   <Icon type="team" style={{fontSize: 16, color: '#08c'}}/>
                  <strong style={{color: "#108ee9", fontSize: 16, marginRight: 5}}>公司简介</strong>
                  {/*<div style={{width: '100%', marginBottom: 20, maxHeight: 400, overflowY: 'auto'}}dangerouslySetInnerHTML={{__html: page.data.introduce.fd_values}}/>
                  <ManageCompanyForm formSubmit={onShopSubmit}>
                    <Button type="primary" icon="edit" style={{float: "right"}}>{null != page.data.introduce ? '编辑' : '新增'}</Button>
                  </ManageCompanyForm>*/}
            </Card>
          </Col>
        </Row>
        <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <p>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </p>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.fd_id}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
      </div>:""
    );
  }
}

export default StandardTable;
