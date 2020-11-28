/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Modal} from 'react-native';
import {
  ListItem,
  CheckBox,
  Button,
  Icon,
  Overlay,
  Text,
  Input,
  Card,
} from 'react-native-elements';

const ProductItem = (props) => {
  const {product, showButtons, updateProduct, deleteProduct} = props;
  const {name, purchased} = product;
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleOpenModal = () => {
    setEditValue(product.name);
    setModalVisibility(true);
  };

  const editButton = () => {
    return (
      <Button
        icon={<Icon name="edit" size={15} color="white" />}
        onPress={() => handleOpenModal()}
      />
    );
  };

  const deleteButton = () => {
    return (
      <Button
        icon={<Icon name="delete" size={15} color="white" />}
        onPress={() => deleteProduct(product.id)}
      />
    );
  };

  const buttons = () => {
    return purchased ? (
      <>{deleteButton()}</>
    ) : (
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'space-between',
        }}>
        {editButton()}
        {deleteButton()}
      </View>
    );
  };

  const changeBought = () => {
    const newProduct = {...product};
    newProduct.purchased = !newProduct.purchased;
    console.log(newProduct);
    updateProduct(newProduct);
  };

  const updateName = () => {
    const newProduct = {...product};
    newProduct.name = editValue;
    updateProduct(newProduct);
    setModalVisibility(false);
  };

  return (
    <ListItem key={product.id} bottomDivider>
      <CheckBox checked={Boolean(purchased)} onPress={() => changeBought()} />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
      </ListItem.Content>
      {showButtons && buttons()}
      <Overlay
        isVisible={modalVisibility}
        onBackdropPress={() => setModalVisibility(false)}
        overlayStyle={{width: 300, height: 170}}>
        <Input
          placeholder="product"
          value={editValue}
          onChangeText={(value) => setEditValue(value)}
        />
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Button
            icon={{
              name: 'edit',
              size: 25,
              color: 'white',
            }}
            buttonStyle={{marginLeft: 10}}
            onPress={() => updateName()}
          />
          <Button
            icon={{
              name: 'cancel',
              size: 25,
              color: 'white',
            }}
            buttonStyle={{marginLeft: 10}}
            onPress={() => setModalVisibility(false)}
          />
        </View>
      </Overlay>
    </ListItem>
  );
};

export default ProductItem;
