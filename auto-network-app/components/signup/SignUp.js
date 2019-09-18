import React from 'react';
import { StyleSheet, View  , Text  , TextInput , TouchableOpacity , Platform , Image , Alert ,SafeAreaView} from 'react-native';
import {widthPercentageToDP  , heightPercentageToDP  } from 'react-native-responsive-screen';
import { responsiveWidth , responsiveHeight , responsiveFontSize  } from 'react-native-responsive-dimensions';
import * as firebase from 'firebase';
import Header from '../header/header';
export default class SignUp extends React.Component {

constructor(){
  super();
  this.state={
     email:"",
     password:"",
     confirmPassword:"",
  };
  this.handleSetPassword = this.handleSetPassword.bind(this);
  this.handleSetEmail = this.handleSetEmail.bind(this);
  this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
  this.signUpEvent = this.signUpEvent.bind(this);
  this.backEvent = this.backEvent.bind(this);
}

 
  handleSetEmail(e){
    const text = e.nativeEvent.text;
    this.setState({email:text});
  }
  handleSetPassword(e){
    const text = e.nativeEvent.text;
    this.setState({password:text});
  }
  handleConfirmPassword(e){
    const text = e.nativeEvent.text;
    this.setState({confirmPassword:text});
  }
  backEvent(e){
    console.log("--");
    this.props.navigation.navigate("Login");
  }
  signUpEvent(e){

    if(this.state.password == this.state.confirmPassword)
    {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function()
    {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function() {

        Alert.alert('Verification link is sent on your email !!');
        this.props.navigation.navigate("Login");
      }.bind(this))

      .catch(function(error){
        //handle errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorMessage);
        Alert.alert(errorMessage);
      });

    }.bind(this)).catch(function(error) {
        var errorMessage = error.message;
        Alert.alert(errorMessage);
    });
   }
   else
   {
    console.log('IN else'); 
    Alert.alert('Password Mismatch !!');
   }

  }
  render(){
  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <SafeAreaView style={{backgroundColor:"#269DF9"}}>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
              <View>
              <TouchableOpacity onPress={this.backEvent} style={{width:70,height:30}}>
                 <Image
                         style={{
                                height:30,
                                width:70,
                                marginLeft:"0%",
                                marginTop:Platform.OS ==='ios' ? "1%" : "12%",
                              }}
                         source={require("../../assets/back1.png")}
                         />
                </TouchableOpacity>   
                </View>                      
                <Text style={styles.headerText}>Sign Up</Text>
                <View></View>
                </View>
                <View>
                   <Header />
                </View>
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
         <Text style={styles.signInlableOne} > Confirm Password</Text>
         <View style={styles.outterLookOfSecondInputBox}>
          <TextInput 
             style={styles.signInTextInputOne}
             placeholder="Enter Password "
             placeholderTextColor="#988c8c"
              secureTextEntry
             fontSize={16}
             onChange={this.handleConfirmPassword}
         />
         </View>
      </View>
      <View style={styles.signInButtonView}>
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
               <TouchableOpacity style={styles.goAutoButtonCss} onPress={this.signUpEvent}>
                          <Text style={{alignSelf:"center",fontSize:25,color:"#fff"}}>Go Auto</Text>
                </TouchableOpacity>  
            </View>
      </View>
      <View style={styles.linkSignUpView}>
          <View style={{flex:1,marginTop:Platform.OS === 'ios' ? "-3%" : "-9%"}}>
                <View style={{flexDirection:"row",marginTop:Platform.OS==='ios'?"0%":"3%",alignSelf:"center"}} >
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
    flex:0.20,
  },
  headerText:{
    alignSelf:"center",
    color:"#fff",
    fontSize:25,
    marginRight:"10%",
    marginTop:Platform.OS === 'android' ? "4%" : "0%"
  },
  signInView:{
    flex:Platform.OS === 'ios' ? 0.28 : 0.33,
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
    flex:Platform.OS === 'ios' ? 0.05 : 0.01,
    // backgroundColor:"gray",
    alignItems:"center",
    justifyContent:"center"
  },
  logoView:{
    flex:0.29,
    // backgroundColor:"red",
  },
  signInButtonView:{
    flex:Platform.OS === 'ios' ? 0.15 : 0.17,
    // backgroundColor:"lightblue"
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