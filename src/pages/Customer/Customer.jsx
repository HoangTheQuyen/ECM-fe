import react, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Divider, Tag, Card, Row, Button } from 'antd';
import { connect } from 'dva';
import styles from './customer.less';

import AddCustomer from './AddCustomer';
import { callbackify } from 'util';

const { Column, ColumnGroup } = Table;

const mapStateToProps = state => ({
  customers: state.customer.customers.map(customer => ({
    ...customer,
    rowKey: customer.userId,
  })),
});

@connect(mapStateToProps)
class Customer extends Component {
  constructor(props) {
    super(props);
    this.fetchAllCustomers = this.fetchAllCustomers.bind(this);
  }

  componentDidMount() {
    this.fetchAllCustomers(0, 0, '');
  }

  // methods process handler through FE' BE
  fetchAllCustomers(limit, offset, keyword) {
    const { dispatch } = this.props;

    dispatch({
      type: 'customer/fetchAllCustomers',
      payload: {
        limit: limit,
        offset: offset,
        keyword: keyword,
      },
    });
  }

  fetchRemoveOneCustomer(userId) {
    const { dispatch } = this.props;

    dispatch({
      type: 'customer/fetchRemoveOneCustomer',
      payload: {
        userId: userId,
      },
      callback: () => this.fetchAllCustomers(0, 0, ''),
    });
  }

  // methods handler in This Component

  handlerRemoveOneCustomr = userId => {
    this.fetchRemoveOneCustomer(userId);
  };

  render() {
    return (
      <Card>
        <Row>
          <AddCustomer />
        </Row>
        <Row>
          <Table
            dataSource={this.props.customers}
            bordered
            rowKey={record => {
              return record.rowKey;
            }}
            style={{ marginTop: '15px' }}
          >
            <Column
              className={styles.columImageCenter}
              title="Image"
              key="image"
              render={(text, record) => (
                <img className={styles.imgAvatart} src={record.image} alt="asd" />
              )}
            />
            <Column title="Name" key="name" dataIndex="userName" />
            <Column title="Email" key="email" dataIndex="email" />
            <Column title="Gender" key="gender" dataIndex="gender" />
            <Column title="Phone" key="phone" dataIndex="phone" />
            <Column title="Created" key="createTime" render={(text, record) => record.createTime} />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Row>
                  <Button style={{ margin: 10 }} type="primary">
                    Update
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => {
                      this.handlerRemoveOneCustomr(record.userId);
                    }}
                  >
                    Delete
                  </Button>
                </Row>
              )}
            />
          </Table>
        </Row>
      </Card>
    );
  }
}

export default Customer;
