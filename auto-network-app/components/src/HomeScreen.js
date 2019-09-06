import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import  { WebBrowser } from 'expo';
import Header from '../header/header';
import { MonoText } from './StyledText';

export default class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: "Home"
  // };

  render() {
    return (

  <View style={styles.container}>
    <View style={styles.header} >
        <SafeAreaView style={{backgroundColor:"#269DF9"}}>
                <Text style={{alignSelf:"center",color:"#fff",fontSize:25,marginTop:Platform.OS === 'android' ? "4%" : "0%"}}>Home</Text>
                <Header />
        </SafeAreaView>
    </View>
    <ScrollView style={{marginTop:"15%",flex:0.83}}>
      <Text>Home Screen</Text> 
      <Text>Home Screen</Text> 
      <Text>Home Screen</Text> 
      <Text>Home Screen</Text> 
      <Text>Home Screen</Text> 
      <Text>Home Screen</Text> 
      <Text>Home Screen</Text> 
      <Text>Home Screen</Text> 
      <Text>Home Screen</Text> 
      <Text>Home Screen</Text> 
    </ScrollView>
  </View>
    )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    flex:0.17,
  }
});
