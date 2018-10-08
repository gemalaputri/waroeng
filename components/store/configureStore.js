import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { product } from '../reducers/products';

const rootReducer = combineReducers({
  product,
  form: formReducer
});

export default function configureStore() {

  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );

	return store
  console.log(store.getState());
}
