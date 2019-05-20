import react, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Divider, Tag, Card, Row, Button } from 'antd';
import { connect } from 'dva';
import { callbackify } from 'util';
import styles from './product.less';
import AddProduct from './AddProduct';

const { Column, ColumnGroup } = Table;

const mapStateToProps = state => ({
  products: state.product.products.map(product => ({
    ...product,
    rowKey: product.productId,
  })),
});

@connect(mapStateToProps)
class Product extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchAllProducts(0, 0, '');
  }

  fetchAllProducts(limit, offset, keyword) {
    const { dispatch } = this.props;

    dispatch({
      type: 'product/fetchAllProducts',
      payload: {
        limit: limit,
        offset: offset,
        keyword: keyword,
      },
    });
  }

  render() {
    console.log(this.props.products);
    return (
      <Card>
        <Row>
          <AddProduct />
        </Row>
        <Row>
          <Table
            dataSource={this.props.products}
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
            <Column title="productId" key="productId" dataIndex="productId" />
            <Column title="Name" key="productName" dataIndex="productName" />
            <Column title="Price" key="price" dataIndex="price" />
            <Column title="Quantity" key="quantity" dataIndex="quantity" />
            <Column title="Created" key="created" dataIndex="created" />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Row>
                  <Button style={{ margin: 10 }} type="primary">
                    Update
                  </Button>
                  <Button type="danger">Delete</Button>
                </Row>
              )}
            />
          </Table>
        </Row>
      </Card>
    );
  }
}

export default Product;
