/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import MyHeader from '../../Components/MyHeader/MyHeader';
import {Input, Button, Overlay, Text} from 'react-native-elements';

class AddProducts extends Component {
  state = {
    productName: '',
    productPrice: '',
    category: '',
  };

  handleStoreProductChange = (item) => {
    this.setState({
      ...this.state,
      productName: item.value,
      productPrice: item.price,
      category: item.category,
    });
  };

  handleCategoryChange = (item) => {
    this.setState({
      ...this.state,
      category: item.value,
    });
  };

  handleProductNameChange = (value) => {
    this.setState({...this.state, productName: value});
  };

  handleProductPriceChange = (value) => {
    this.setState({...this.state, productPrice: value});
  };

  handleAdd = () => {
    if (
      this.state.productName &&
      !isNaN(this.state.productPrice) &&
      this.state.category
    ) {
      const newProduct = {
        name: this.state.productName,
        purchased: false,
        price: this.state.productPrice,
        category: this.state.category,
      };
      this.props.addProduct(newProduct);
      this.setState({
        ...this.state,
        modalVisibility: true,
        productName: '',
        productPrice: '',
      });
    }
  };
  checkError = (value) => {
    if (isNaN(this.state.productPrice)) {
      return 'ENTER A NUMBER';
    }
    return '';
  };

  render() {
    return (
      <>
        <MyHeader
          title="Add product"
          leftBtnIcon="arrow-back"
          leftBtnAction={() => this.props.navigation.goBack()}
        />
        <View style={{margin: 20}}>
          <Input
            placeholder="product name*"
            value={this.state.productName}
            onChangeText={(value) => this.handleProductNameChange(value)}
          />
          <Input
            placeholder="product price*"
            value={this.state.productPrice}
            onChangeText={(value) => this.handleProductPriceChange(value)}
            errorMessage={this.checkError()}
          />
          <DropDownPicker
            placeholder="select category*"
            items={this.props.categories}
            containerStyle={{height: 60, marginBottom: 30}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => this.handleCategoryChange(item)}
            defaultValue={this.state.category}
          />
          <DropDownPicker
            placeholder="select store product"
            items={this.props.storeProducts}
            containerStyle={{height: 60}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => this.handleStoreProductChange(item)}
          />
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Button
              icon={{
                name: 'add',
                size: 25,
                color: 'white',
              }}
              buttonStyle={{marginLeft: 10}}
              onPress={() => this.handleAdd()}
            />
            <Button
              icon={{
                name: 'cancel',
                size: 25,
                color: 'white',
              }}
              buttonStyle={{marginLeft: 10}}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <Overlay
            isVisible={this.props.addingProduct}
            onBackdropPress={() => this.props.setModalVisibility(false)}
            F>
            <Text h5>Product was added</Text>
          </Overlay>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storeProducts: state.storeProducts,
    categories: state.categories,
    addingProduct: state.addingProduct,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (payload) => {
      return dispatch({type: 'NEWPRODUCT', payload});
    },
    setModalVisibility: (value) => {
      return dispatch({type: 'ADDINGPRODUCT', value});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
