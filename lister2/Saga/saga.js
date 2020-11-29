/* eslint-disable prettier/prettier */
import {call, put, take, takeEvery} from 'redux-saga/effects';
import {fork} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {
  NEWPRODUCT,
  initDB,
  update,
  GETPRODUCTS,
  UPDATEPRODUCT,
  DELETEPRODUCT,
  ADDINGPRODUCT,
} from '../Store/actions';
import SQLite from 'react-native-sqlite-storage';

const database = SQLite.openDatabase({
  name: 'lister.db',
  location: 'default',
});

function initProducts() {
  const channel = new eventChannel((emiter) => {
    const listener = database.transaction((transaction) => {
      transaction.executeSql(
        'CREATE TABLE IF NOT EXISTS myProducts(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(40),category VARCHAR(30),price DECIMAL(8,2), purchased BIT)',
        [],
        (transaction, result) => {
          txn.executeSql('SELECT * FROM myProducts', [], function (tx, res) {
            emiter({data: res.rows.raw() || {}});
          });
        },
      );
    });
    return () => {
      listener.off();
    };
  });
  return channel;
}

function* initDatabase(action) {
  const init = initProducts();
  const products = yield take(init);
  yield put(update(products));
}

function addProductEventChannel(payload) {
  const channel = new eventChannel((emiter) => {
    const listener = database.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO myProducts (name,category,price,purchased) VALUES (?,?,?,?)',
        [payload.name, payload.category, payload.price, payload.purchased],
        (tx, results) => {
          tx.executeSql('SELECT * FROM myProducts', [], function (tx, res) {
            emiter({data: res.rows.raw() || {}});
          });
        },
      );
    });
    return () => {
      listener.off();
    };
  });
  return channel;
}

function* addProduct(action, dispatch) {
  const updatedProduct = addProductEventChannel(action.payload);
  const item = yield take(updatedProduct);
  yield put(update(item));
  yield put({type: ADDINGPRODUCT, value: true});
}

function getProductsEventChannel() {
  const channel = new eventChannel((emiter) => {
    const listener = database.transaction(function (txn) {
      txn.executeSql('SELECT * FROM myProducts', [], function (tx, res) {
        emiter({data: res.rows.raw() || {}});
      });
    });
    return () => {
      listener.off();
    };
  });
  return channel;
}

function* getProducts() {
  const updateChannel = getProductsEventChannel();
  const item = yield take(updateChannel);
  yield put(update(item));
}

function* deleteProducts() {
  database.transaction(function (txn) {
    txn.executeSql(
      'ALTER TABLE table_name ADD category VARCHAR(30);',
      [],
      function (tx, res) {},
    );
  });
}

function updateProductEventChannel(payload) {
  const channel = new eventChannel((emiter) => {
    const listener = database.transaction(function (tx) {
      tx.executeSql(
        'UPDATE myProducts SET name = ?, category = ? , price = ?, purchased = ? WHERE id = ?;',
        [
          payload.name,
          payload.category,
          payload.price,
          payload.purchased,
          payload.id,
        ],
        (tx, results) => {
          tx.executeSql('SELECT * FROM myProducts', [], function (tx, res) {
            emiter({data: res.rows.raw() || {}});
          });
        },
      );
    });
    return () => {
      listener.off();
    };
  });
  return channel;
}

function* updatedProduct(action) {
  const updateChannel = updateProductEventChannel(action.product);
  const item = yield take(updateChannel);
  yield put(update(item));
}

function deleteProductEventChannel(id) {
  const channel = new eventChannel((emiter) => {
    const listener = database.transaction(function (tx) {
      tx.executeSql(
        'DELETE FROM myProducts WHERE id=?;',
        [id],
        (tx, results) => {
          tx.executeSql('SELECT * FROM myProducts', [], function (tx, res) {
            emiter({data: res.rows.raw() || {}});
          });
        },
      );
    });
    return () => {
      listener.off();
    };
  });
  return channel;
}

function* deleteProduct(action) {
  const updateChannel = deleteProductEventChannel(action.id);
  const item = yield take(updateChannel);
  yield put(update(item));
}

export default function* rootSaga() {
  yield takeEvery(initDB, initDatabase);
  yield takeEvery(NEWPRODUCT, addProduct);
  yield takeEvery(GETPRODUCTS, getProducts);
  yield takeEvery(UPDATEPRODUCT, updatedProduct);
  yield takeEvery(DELETEPRODUCT, deleteProduct);
}
