import React from "react";
import {
  ExpoConfigView,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  TextInput,
  Button
} from "react-native";
import  Header from '../header/header';
import  firebase from "firebase/app";
import "firebase/auth";


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  onSignOut () {
    firebase.auth().signOut();
    this.props.navigation.navigate("Loading");
    console.log("Logout");
  }
  render() {
    return (
      // <ScrollView style={{ padding: 20, marginTop: 20 }}>
      //   <Text>Settings Screen</Text>
      //   <Text>You signed in</Text>
      //   <Button onPress={() => this.onSignOut()} title="Sign out" />
      // </ScrollView>
      <View style={styles.container}>
      <View style={styles.header} >
          <SafeAreaView style={{backgroundColor:"#269DF9"}}>
                  <Text style={{alignSelf:"center",color:"#fff",fontSize:25,marginTop:Platform.OS === 'android' ? "4%" : "0%"}}>Home</Text>
                  <Header />
          </SafeAreaView>
      </View>
      <ScrollView style={{marginTop:"15%",flex:0.83}}>
            <Text>Settings Screen</Text>
           <Text>You signed in</Text>
         <Button onPress={() => this.onSignOut()} title="Sign out" />
      </ScrollView>
    </View>
    );
  }
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
