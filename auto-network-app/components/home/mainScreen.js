import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View  , Text , SafeAreaView , Platform , TouchableOpacity , Alert} from 'react-native';
import { responsiveFontSize  } from 'react-native-responsive-dimensions';
import Header from '../header/header';
export default class mainScreen extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(){
    firebase.auth().signOut().then(function(){
      this.props.navigation.navigate("Login");
    },function(error){
      console.log("error in mainScreen: ",error)
      Alert.alert(error);
    });
  }

  render(){
  return (
    <View style={styles.container}>
      <View style={styles.wave}>
              <SafeAreaView style={{backgroundColor:"#269DF9"}}>
                  <Text style={{alignSelf:"center",color:"#fff",fontSize:25,marginTop:Platform.OS === 'android' ? "4%" : "0%"}}>Home Screen</Text>
                  <Header />
              </SafeAreaView>
      </View>
      <View style={styles.logoutView}>
      <Text> Home Screen </Text> 
        <View style={{flex:0.10,backgroundColor:"#12afe3",flexDirection:"row"}}>
                     <TouchableOpacity style={{marginTop:"3%",marginLeft:"5%"}} onPress={this.logout}>
                          <Text style={{fontSize:18}}>Logout</Text>
                     </TouchableOpacity>
              </View>
      </View>
      </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1
  },
  waveView: {
    flex: 0.10
  },
  logoutView:{
    flex:0.90,
    marginTop:"23%"
  },
  Text:{
      fontSize:responsiveFontSize(5)
  }
});