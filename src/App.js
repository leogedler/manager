import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducer from './reducer';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCgDEJ2i2OJefIrMa_ltNoYhJDEP_Yx7Ps',
      authDomain: 'manager-d3b18.firebaseapp.com',
      databaseURL: 'https://manager-d3b18.firebaseio.com',
      projectId: 'manager-d3b18',
      storageBucket: 'manager-d3b18.appspot.com',
      messagingSenderId: '804812883057'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

