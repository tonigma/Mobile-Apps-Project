/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Products from '../Products/Products';
import AddProducts from '../AddProducts/AddProducts';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Products"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Add product" component={AddProducts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
