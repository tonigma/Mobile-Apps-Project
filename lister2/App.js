import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import reducer from './Store/reducer';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import rootSaga from './Saga/saga';
import AppNavigation from './Containers/AppNavigation/AppNavigation';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </>
  );
};

export default App;
