import { saveAddProduct } from '../actions/products'

export function product(state = [], action) {
  switch(action.type) {
    case 'SAVE_ADD_PRODUCT':
      return action.product
    default:
      return state
  }

}
