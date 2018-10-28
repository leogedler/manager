import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducer from './reducer';

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
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <Text>Hello!</Text>
        </View>
      </Provider>
    );
  }
}

export default App;

