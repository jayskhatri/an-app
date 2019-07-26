import React from 'react';
import * as firebase from 'firebase';
import Main from './components/Main';
import { StyleSheet, Text, View } from 'react-native';
const firebaseConfig = {
  apiKey: "AIzaSyA68K655CaYZII6PqOu9YXzUqncmSGIcNA",
  authDomain: "react-login-1682a.firebaseapp.com",
  databaseURL: "https://react-login-1682a.firebaseio.com",
  projectId: "react-login-1682a",
  storageBucket: "",
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
  },
});