/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  LogBox,
} from 'react-native';
import {connect} from 'react-redux';
import MyHeader from '../../Components/MyHeader/MyHeader';
import ProductList from '../ProductList/ProductList';
import DropDownPicker from 'react-native-dropdown-picker';

class Products extends Component {
  state = {
    editProduct: false,
    category: 'All',
  };

  handleEditProduct = () => {
    this.setState({editProduct: !this.state.editProduct});
  };

  componentDidMount() {
    this.props.initDB().then(() => this.props.getProducts());
  }

  handleFilterChange(item) {
    this.setState({
      ...this.state,
      category: item.value,
    });
  }

  getProductByCategory(products, category) {
    if (category !== 'All') {
      return products.filter((product) => product.category === category);
    }
    return products;
  }

  getProductsByNeed(products, needed) {
    return products.filter((product) => product.purchased === needed);
  }

  render() {
    const filterdPoducts = this.getProductByCategory(
      this.props.myProducts,
      this.state.category,
    );
    const productNeeded = this.getProductsByNeed(filterdPoducts, 0);

    const productBought = this.getProductsByNeed(filterdPoducts, 1);

    const body = () => {
      return this.props.fetchingData ? (
        <View style={[styles.container]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <ScrollView>
          <ProductList
            title="Products needed"
            showButtons={this.state.editProduct}
            products={productNeeded}
          />
          <ProductList
            title="Products bought"
            showButtons={this.state.editProduct}
            products={productBought}
          />
        </ScrollView>
      );
    };
    return (
      <>
        <MyHeader
          title="Products"
          leftBtnIcon="edit"
          rightBtnIcon="add"
          rightBtnAction={() => this.props.navigation.navigate('Add product')}
          leftBtnAction={() => this.handleEditProduct()}
        />
        <DropDownPicker
          items={this.props.categories}
          containerStyle={{height: 60}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => this.handleFilterChange(item)}
          placeholder="Filter"
          defaultValue="All"
        />
        {body()}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    myProducts: state.myProducts,
    fetchingData: state.fetchingData,
    categories: [
      {
        label: 'All',
        value: 'All',
      },
      ...state.categories,
    ],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => {
      return dispatch({type: 'GETPRODUCTS'});
    },
    initDB: async () => {
      return await dispatch({type: 'initDB'});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
