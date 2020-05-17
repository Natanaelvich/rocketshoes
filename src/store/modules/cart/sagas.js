import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ payload }) {
  const productExits = yield select(state =>
    state.cart.find(p => p.id === payload)
  );

  const stock = yield call(api.get, `stock/${payload}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExits ? productExits.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.warn('🤷‍♂️ Sem estoque!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

  if (productExits) {
    yield put(updateAmountSuccess({ id: payload, amount }));
  } else {
    const response = yield call(api.get, `products/${payload}`);

    const data = {
      ...response.data,
      amount: 1,
    };
    yield put(addToCartSuccess(data));

    history.push('/cart');
  }
}

function* updateAmount({ payload }) {
  if (payload.amount <= 0) {
    return;
  }

  const stock = yield call(api.get, `stock/${payload.id}`);
  const stockAmount = stock.data.amount;

  if (payload.amount > stockAmount) {
    toast.warn('🤷‍♂️ Sem estoque!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return;
  }

  yield put(updateAmountSuccess({ id: payload.id, amount: payload.amount }));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
