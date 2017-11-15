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
    const { data: {code, data:{list}, pagination }, loading,onPageChange, onFormSubmit, page, onShopSubmit } = this.props;
    //const{ data: {list, pagination },loading} = this.props
    console.log(list.length)
    //console.log(list);

    const columns = [
      {
        title: '产品ID',
        dataIndex: 'fd_id',
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
        title: '封面图',
        dataIndex: 'fd_imgUrl',
        key: 'imgUrl',
        render: (text, record) => (
          <img src={text} style={{width:'100px'}}/>
        )
      },
      {
        title: '标题',
        dataIndex: 'fd_title',
      },
      {
        title: '介绍',
        dataIndex: 'fd_introduce',
      },
      {
        title: '状态',
        dataIndex: 'fd_status',
      },
      {
        title: '分类',
        dataIndex: 'category',
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
      </div>:""
    );
  }
}

export default StandardTable;
