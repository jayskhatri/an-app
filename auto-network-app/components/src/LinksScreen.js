import React from "react";
import {
  ScrollView,
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  Text
} from "react-native";
// import { ExpoLinksView } from "@expo/samples";
import Header from '../header/header';
export default class LinksScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
    <View style={styles.header} >
        <SafeAreaView style={{backgroundColor:"#269DF9"}}>
                <Text style={{alignSelf:"center",color:"#fff",fontSize:25,marginTop:Platform.OS === 'android' ? "4%" : "0%"}}>Link</Text>
                <Header />
        </SafeAreaView>
    </View>
    <ScrollView style={{marginTop:"15%",flex:0.83}}>
    <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
        <Text>Link Screen</Text>
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
