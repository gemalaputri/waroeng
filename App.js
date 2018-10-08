import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './components/store/configureStore';
import ProductForm from './components/products/productForm';
import { saveAddProduct } from './components/actions';

type Props = {};
export default class App extends Component<Props> {
  render() {

    const store = configureStore()
    return (
      <Provider store={store}>
        <ProductForm />
      </Provider>
    );
  }
}
