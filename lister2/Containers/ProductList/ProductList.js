/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Text, Card, Button} from 'react-native-elements';
import ProductItem from '../../Components/ProductItem/ProductItem';
import {connect, useDispatch} from 'react-redux';

const ProductList = (props) => {
  const {title, showButtons, products, updateProduct, deleteProduct} = props;

  const items = products.map((product, index) => {
    return (
      <ProductItem
        product={product}
        subtitle="title"
        showButtons={showButtons}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
      />
    );
  });
  const calcTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].price;
    }
    return total.toFixed(2);
  };
  return (
    <>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        {items.length > 0 ? (
          items
        ) : (
          <Text style={{textAlign: 'center'}}>No products</Text>
        )}
        <Card.Divider />
        <Text style={{textAlign: 'center'}}>
          Total price {calcTotalPrice()}
        </Text>
      </Card>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (product) => {
      return dispatch({type: 'UPDATEPRODUCT', product});
    },
    deleteProduct: (id) => {
      return dispatch({type: 'DELETEPRODUCT', id});
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductList);
