import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';

import './config/reactottronConfig';

import Routes from './routes';
import Header from './components/Header';
import GlobalStyles from './styles/global';

import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyles />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
          transition={Flip}
          style={{ color: '#7159c1', fontWeight: 'bold' }}
        />
      </Router>
    </Provider>
  );
}

export default App;
