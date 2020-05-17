import React from 'react';
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Total, ProductTable } from './styles';
import { formatPrice } from '../../utils/format';
import {
  removeFromCart,
  updateAmountRequest,
} from '../../store/modules/cart/actions';

export default function Cart() {
  const products = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const cart = products.map(p => ({
    ...p,
    subTotal: formatPrice(p.price * p.amount),
    priceFormated: formatPrice(p.price),
  }));

  const total = formatPrice(
    cart.reduce((totalPrice, p) => {
      return totalPrice + p.price * p.amount;
    }, 0)
  );

  function increment(product) {
    dispatch(
      updateAmountRequest({ id: product.id, amount: product.amount + 1 })
    );
  }

  function decrement(product) {
    dispatch(
      updateAmountRequest({ id: product.id, amount: product.amount - 1 })
    );
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={String(index)}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormated}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      decrement(product);
                    }}
                  >
                    <MdRemoveCircleOutline color="#7159c1" size={20} />
                  </button>

                  <input type="number" readOnly value={product.amount} />

                  <button
                    type="button"
                    onClick={() => {
                      increment(product);
                    }}
                  >
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(removeFromCart(product.id));
                  }}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
