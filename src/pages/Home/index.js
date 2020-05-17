import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import { addToCartRequest } from '../../store/modules/cart/actions';

import { ProducList } from './styles';
import { formatPrice } from '../../utils/format';

function Home() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(p => ({
        ...p,
        priceFormated: formatPrice(p.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  const cart = useSelector(state => state.cart);
  const amount = cart.reduce((amountProduct, p) => {
    amountProduct[p.id] = p.amount;

    return amountProduct;
  }, {});

  function handleAddProduct(id) {
    dispatch(addToCartRequest(id));
  }

  return (
    <ProducList>
      {products.map(product => (
        <li key={String(product.id)}>
          <img src={product.image} alt={product.title} />

          <strong>{product.title}</strong>
          <span>{product.priceFormated}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProducList>
  );
}

export default Home;
