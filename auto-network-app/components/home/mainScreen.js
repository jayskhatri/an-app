import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View  , Text , TouchableOpacity , Alert} from 'react-native';
import { responsiveFontSize  } from 'react-native-responsive-dimensions';
export default class mainScreen extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(){
    const {navigation} = this.props;
    firebase.auth().signOut().then(function(){
      navigation.navigate("Login");
    },function(error){
      console.log("error in mainScreen: ",error)
      Alert.alert(error);
    });
  }

  render(){
  return (
    <View style={styles.container}>
        <Text> Home Screen </Text> 
        <View style={{flex:0.10,backgroundColor:"#12afe3",flexDirection:"row"}}>
                     <TouchableOpacity style={{marginTop:"3%",marginLeft:"5%"}} onPress={this.logout}>
                          <Text style={{fontSize:18}}>Logout</Text>
                     </TouchableOpacity>
              </View>
      </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1
  },
  Text:{
      fontSize:responsiveFontSize(5)
  }
});