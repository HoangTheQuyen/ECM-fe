import React,{Component} from 'react'
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

import ChangeProduct from './ChangeProduct'

class AddProduct extends Component{
    state = { visible: false };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    hideModal = () => {
      this.setState({
        visible: false,
      });
    };
  
    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>
            Add Product
          </Button>
          <Modal
            title="Add Product"
            visible={this.state.visible}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="Ok"
            cancelText="Cancel"
          >
            <ChangeProduct></ChangeProduct>
          </Modal>
        </div>
      );
    }
}

export default AddProduct
     