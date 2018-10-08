import React, {Component} from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

class ProductItem extends Component<Props> {
  render() {
    const { product, handleDeleteProduct, index } = this.props
    return (
      <View>
        <Text>{product.productName}</Text>
        <Text>{product.price}</Text>
        <Text>{product.tax}</Text>
        <Text>{moment(product.expiryDate).format('DD-MM-YYYY')}</Text>
        <Text>{product.description}</Text>
        <TouchableOpacity onPress={handleDeleteProduct(index)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProductItem
