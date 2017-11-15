import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Alert, Badge,Avatar } from 'antd';
import styles from './index.less';

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
    //const { data : {code,data:{ userList }, pagination }, loading } = this.props;
    const { data: { code, data:{userList}, pagination }, loading,onPageChange, onFormSubmit, page, onShopSubmit } = this.props;
    console.log(userList)
    const columns = [
      {
        title: '会员ID',
        dataIndex: 'id',
      },
      {
        title: '头像',
        dataIndex: 'photo',
        key: 'avatar',
        render: (text, record) => (
          <Avatar src={text} size="large" icon="user" />
        )
      },
      {
        title: '昵称',
        dataIndex: 'nickName',
      },
      {
        title: '会员卡号',
        dataIndex: 'cardNum',
      },
      {
        title: '性别',
        dataIndex: 'gender',
      },
      {
        title: '操作',
        render: () => (
          <p>
            <a href="">配置</a>
            <span className={styles.splitLine} />
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
      userList.length!==0 ?
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
        </div>
        <Table
          loading={loading}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={userList}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>:""
    );
  }
}

export default StandardTable;
