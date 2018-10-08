import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset, change } from 'redux-form';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import {StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import RenderInput from '../partials/renderInput';
import ProductItem from './productItem';

import { saveAddProduct } from '../actions/products';

type Props = {};
class ProductForm extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      isDatePickerVisible: false,
      products: []
    }
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true })
  }

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false })
  }

  handleDatePicked = (expiryDate) => {
    this.setState({ expiryDate })
    this.hideDatePicker()
  }

  handleSaveProduct = values => {
    const { resetForm, saveAddProduct } = this.props
    if (this.state.products) {
      this.state.products.push({
        'productId' : uniqueId(),
        'productName': values.productName,
        'price': values.price,
        'tax': values.tax,
        'expiryDate': values.expiryDate,
        'description': values.description,
      })
      this.setState({products: this.state.products})
      return saveAddProduct(this.state.products);

      resetForm('createProduct');
    }
  }

  handleDeleteProduct = (id) => {
    console.log(id);

  }

  render() {
    const {
      handleSubmit,
      product
    } = this.props;

    let productList = null
    if(!isEmpty(this.props.product)) {
        productList = this.props.product.map((_product, index) => {
          return (
            <ProductItem
              product={_product}
              key={_product.productId}
              index={index}
              handleDeleteProduct={this.handleDeleteProduct}
            />
          );
        })
    }

    return (
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
          <Field
            name={'productName'}
            component={RenderInput}
            placeholder="Enter your Product Name"
          />
          <Field
            name={'price'}
            component={RenderInput}
            placeholder="Price"
            keyboardType="numeric"
          />
          <Field
            name={'tax'}
            component={RenderInput}
            placeholder="Tax"
            editable={false}
          />
          <Text>{moment(this.state.expiryDate).format('DD-MM-YYYY')}</Text>
          <Button
            onPress={this.showDatePicker}
            title="Change Expiry Date"
          />
          <DateTimePicker
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDatePicker}
          />
          <Field
            name={'description'}
            component={RenderInput}
            placeholder="Product description"
          />
        <TouchableOpacity onPress={handleSubmit(this.handleSaveProduct)}>
            <Text>Save</Text>
          </TouchableOpacity>
          <View>{productList}</View>
      </View>
      </SafeAreaView>
    );
  }
}

ProductForm = reduxForm({
  form: 'createProduct'
})(ProductForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAddProduct: (product) => dispatch(saveAddProduct(product)),
    resetForm: (form_name) => dispatch(reset(form_name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
