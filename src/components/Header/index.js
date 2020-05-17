import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg';

function Header() {
  const ammount = useSelector(state => state.cart.length || 0);

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rockeseat" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{ammount} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

export default Header;
