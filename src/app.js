import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/initialize';

import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import { firebase } from './firebase/firebase';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// Will run when a user first visits the web page and when page refresh
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);

    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      // Impt: Only redirect to dashboard when the current page is the login page
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
      
      // history.push('/dashboard');
    });
  } else {
    console.log('Logged out');
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
