import React from 'react';
import * as firebase from 'firebase';
import Main from './components/Main';
import { StyleSheet, Text, View } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyD0Hc4W-ZlHj1LBDVw0283zEsEir3c0Fh4",
  authDomain: "an-app-w196e.firebaseapp.com",
  databaseURL: "https://an-app-w196e.firebaseio.com",
  projectId: "an-app-w196e",
  storageBucket: "an-app-w196e.appspot.com",
  messagingSenderId: "1040816418294",
  appId: "1:1040816418294:web:0416cf45d718e573"
};
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  }
});