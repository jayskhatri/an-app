import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View  , Text  , TextInput , Platform , SafeAreaView, TouchableOpacity , ImageBackground , Alert , Image , Dimensions} from 'react-native';
import {widthPercentageToDP  , heightPercentageToDP  } from 'react-native-responsive-screen';
import { responsiveWidth , responsiveHeight , responsiveFontSize  } from 'react-native-responsive-dimensions';
const { width , height } = Dimensions.get('window');
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginHeader from './loginheader';
import Header from '../header/header';
// import console = require('console');
// import console = require('console');

export default class Login extends React.Component {

constructor(){
  super();
  this.state={
     email:"",
     password:""
     
  };
  this.handleSetEmail = this.handleSetEmail.bind(this);
  this.handleSetPassword = this.handleSetPassword.bind(this);
  this.signUpEvent = this.signUpEvent.bind(this);
  this.signInEvent = this.signInEvent.bind(this);
}

handleSetEmail(e){
    const text = e.nativeEvent.text;
    this.setState({email:text});
}

handleSetPassword(e){
   const text = e.nativeEvent.text;
   this.setState({password:text});
  //  console.log(this.state.password);
}

signUpEvent(e){
  this.props.navigation.navigate("signUp");
}

signInEvent(e){

 firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( function()  {

  firebase.auth().onAuthStateChanged(function(user) {
      
    if (user) 
    {
      // User is signed in.
      if(user.emailVerified)
      {
        Alert.alert("Login successful");
        this.props.navigation.navigate("ProfilePageOne");
      }
      else
      {
        Alert.alert("verify your email for signing in");
      }
    }
   else 
    {
      // No user is signed in.
      Alert.alert("Invalid Username or password");
    }
  }.bind(this));

  }.bind(this))

  .catch(function(error){
    // console.log(error);
  });
  
 }

  render(){
  return (
<View style={styles.container}>
      <View style={styles.header}>
          {/* <LoginHeader /> */}
          <SafeAreaView style={{backgroundColor:"#269DF9"}}>
                <Text style={styles.headerText}>Sign in</Text>
                <Header />
          </SafeAreaView>
      </View>
      <View style={styles.signInView} >
         <Text style={styles.signInlableOne} >Email Id / Phone No.</Text>
         <View style={styles.outterLookOfInputBox}>
          <TextInput 
             style={styles.signInTextInputOne}
             placeholder="Enter Email "
             placeholderTextColor="#988c8c"
             fontSize={16}
             onChange={this.handleSetEmail}
         />
         </View>
         <Text style={styles.signInlableOne} >Password</Text>
         <View style={styles.outterLookOfSecondInputBox}>
          <TextInput 
             style={styles.signInTextInputOne}
             placeholder="Enter Password "
             placeholderTextColor="#988c8c"
              secureTextEntry
             fontSize={16}
             onChange={this.handleSetPassword}
         />
         </View>
      </View>
      <View style={styles.signInButtonView}>
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
               <TouchableOpacity style={styles.goAutoButtonCss} onPress={this.signInEvent}>
                          <Text style={{alignSelf:"center",fontSize:25,color:"#fff"}}>Go Auto</Text>
                </TouchableOpacity>  
            </View>
      </View>
      <View style={styles.linkSignUpView}>
          <View style={{flex:1,marginTop:Platform.OS === 'ios' ? "1%" : "0%"}}>
                <TouchableOpacity>
                    <Text style={{color:"#269DF9",alignSelf:"center"}}> Forgot Password ? </Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row",marginTop:Platform.OS==='ios'?"5%":"3%",alignSelf:"center"}} >
                    <Text> Not joined Yet ? </Text>
                    <TouchableOpacity onPress={this.signUpEvent}>
                        <Text style={{color:"#269DF9"}}> create Your account </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row",marginTop:Platform.OS==='ios'?"5%":"3%",alignSelf:"center"}} >
                    <Text> Know Our  </Text>
                    <TouchableOpacity>
                        <Text style={{color:"#269DF9"}}> Privacy Policy and Terms & condition </Text>
                    </TouchableOpacity>
                </View>
          </View>
      </View>
      <View style={styles.logoView} >
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <Image
                    style={{
                      height: "90%",
                      width: "90%",
                      marginLeft:"10%",marginBottom:"10%",marginRight:"10%",marginTop:"5%",
                      resizeMode:"contain"
                    }}
                  source={require("../../assets/lastLogo.png")}
                />
          </View>
      </View>
      
</View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header:{
    flex:0.20
  },
  headerText:{
    alignSelf:"center",
    color:"#fff",
    fontSize:25,
    marginTop:Platform.OS === 'android' ? "4%" : "0%"
  },
  signInView:{
    flex:Platform.OS === 'ios' ? 0.18 : 0.23,
    // backgroundColor:"red"
  },
  signInlableOne:{
    flex:0.15,
    fontSize:15,
    marginTop:"4%",
    marginLeft:"15.5%",
  },
  outterLookOfInputBox:{
    flex:0.35,
    borderWidth:0.5,
    marginLeft:"10%",
    marginTop:"1%",
    marginRight:"10%",
    borderRadius:25
  },
  outterLookOfSecondInputBox:{
    flex:0.35,
    borderWidth:0.5,
    marginTop:"1%",
    marginLeft:"10%",
    marginRight:"10%",
    borderRadius:25
  },
  signInTextInputOne:{
    flex:1,
    paddingLeft:"2%",
    marginTop:"5%",
    marginLeft:"5%",
    marginBottom:"1.8%",
    marginRight:"3%",
    borderRadius:15,
    borderBottomColor:"#988c8c",
    borderBottomWidth:1,
  },
  linkSignUpView:{
    flex:Platform.OS === 'ios' ? 0.15 : 0.15,
    // backgroundColor:"gray",
    alignItems:"center",
    justifyContent:"center"
  },
  logoView:{
    flex:0.32,
    // backgroundColor:"red",
  },
  signInButtonView:{
    flex:0.15,
    // backgroundColor:"gray"
  },
  goAutoButtonCss:{
    width:"70%",
    height:"30%",
    borderRadius:25,
    backgroundColor:"#269DF9",
    alignItems:"center",
    justifyContent:"center"
  }

});