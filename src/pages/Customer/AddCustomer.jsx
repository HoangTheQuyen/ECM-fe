import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Card } from 'antd';
import { connect } from 'dva';
import ChangeCustomerForm from './ChangeCustomerForm';


class AddCustomer extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Customer
        </Button>
        <Modal
          title="Add Customer"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Card>
            <ChangeCustomerForm />
          </Card>
        </Modal>
      </div>
    );
  }
}

export default AddCustomer;
