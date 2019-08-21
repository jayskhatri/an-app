import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View  , Text  , TextInput , TouchableOpacity , ImageBackground , Alert , Image , Dimensions} from 'react-native';
import {widthPercentageToDP  , heightPercentageToDP  } from 'react-native-responsive-screen';
import { responsiveWidth , responsiveHeight , responsiveFontSize  } from 'react-native-responsive-dimensions';
const { width , height } = Dimensions.get('window');
import { createStackNavigator, createAppContainer } from "react-navigation";
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
        this.props.navigation.navigate("mainScreen");
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
    console.log(error);
  });
  
 }

  render(){
  return (
    <View style={styles.container}>
      <View style={styles.textView}>
          <Text style={styles.Text} >Sign in</Text>
      </View>
      
      
      
     <View style={styles.inputView}>
     <Text style={styles.Text1} >Email Id / Phone No.</Text>
     <TextInput 
         placeholder="Enter Email "
         placeholderTextColor="black"
         style={styles.input}
         fontSize={responsiveFontSize(2)}
         onChange={this.handleSetEmail}
         />

      <Text style={styles.Text2} >Password</Text>
      <TextInput 
         placeholder="Enter Password"
         placeholderTextColor="black"
         fontSize={responsiveFontSize(2)}
         style={styles.input}
         secureTextEntry
         onChange={this.handleSetPassword}
         />

      <TouchableOpacity style={styles.buttonContainer} onPress={this.signInEvent}>
           <Text style={styles.buttonText}>Go Auto</Text>
      </TouchableOpacity>

     </View>

<View style={styles.anotherLoginView}>
        <Text style={{fontSize:responsiveFontSize(2),marginTop:'3%',textAlign:'center'}} > Sign In With </Text>            
           <View style={styles.logoContainer}>
               <TouchableOpacity onPress={this.googleLogin}>
                 <ImageBackground style={styles.ImageContainer1} source={require('../../assets/google.png')} ></ImageBackground>
               </TouchableOpacity>
                 <ImageBackground style={styles.ImageContainer2} source={require('../../assets/Facebook.png')} ></ImageBackground>
           </View>
           <View style={{flexDirection:'row',marginLeft:'15%'}}>
           <Text style={{fontSize:responsiveFontSize(2),marginTop:'2%'}}>Not Joiend Yet ?</Text>
           <TouchableOpacity onPress={this.signUpEvent}> 
             <Text style={styles.signUpButton}>Create Your Account</Text> 
            </TouchableOpacity>
           </View>
           
</View>
<View style={styles.lastImageView}> 
  {/* <Image style={styles.lastLogo} source={require('../../assets/lastLogo.png')} ></Image> */}
</View>     
      
    </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:10
  },
  textView:{flex:1,/*backgroundColor:'green'*/},
  inputView:{flex:4,/*backgroundColor:'lightblue'*/},
  anotherLoginView:{flex:2,/*backgroundColor:'orange'*/},
  lastImageView:{flex:2,/*backgroundColor:'yellow'*/},
  ImageContainer1:{
    width:40,
    height:40,
    borderRadius:40/2,
    // marginLeft : ( width * 0.1 ) + 8
    marginLeft:'28%'
  },
  signUpButton:{
    fontSize:responsiveFontSize(2),
    textAlign:'center',
    marginLeft:'3%',
    marginTop:'5%'
    ,color:'#54e0ff'
  },
  ImageContainer2:{
    width:40,
    height:40,
    borderRadius:40/2,
    marginLeft:'3%'
  },
  lastLogo:{
    width:widthPercentageToDP('100%'),
    height:heightPercentageToDP('28%'),
    marginLeft:'0%',
    marginTop:'3%'
  },
  logoContainer:{flexDirection:'row',marginLeft:'20%',marginTop:'2%'},
  Text: {
    fontSize :responsiveFontSize(4),
    // marginTop : (height*0.1)-60,
    // marginTop:20,
    marginTop:'4%',
    textAlign:'center'
  },
  Text1: {
    fontSize:responsiveFontSize(2),
    // marginTop: (height * 0.1)-50,
   marginTop:'6%',
   marginRight:'31%', 
   textAlign:'center',
    // marginRight : (width * 0.5)-78
    // marginRight:115
  },
  Text2:{
    fontSize:responsiveFontSize(2),
    // marginTop:(height * 0.1)-60,
    textAlign:'center',
    marginTop:'6%',
    marginRight:'51%'
    // marginRight : (width * 0.5)
  },
  input: {
    // height:heightPercentageToDP('5%'),
    // width:widthPercentageToDP('74%'),
    height:'14%',
    width:'74%',
    padding:'3%',
    marginTop:'3%',
    opacity:0.5,
    // marginTop: (height * 0.01)-2,
    backgroundColor: '#c0d7ed',
    borderRadius:15,
    borderBottomWidth:2,
    marginLeft:'12%'
    // marginLeft : (width * 0.2)-30
    },
  buttonText:{fontSize:responsiveFontSize(2),textAlign:'center',color:'#FFFFFF'},
  buttonContainer:{
    // marginLeft: ( width *0.3 ),
    marginLeft:'30%',
    backgroundColor:'#2980b9',
    marginTop:'5%',
    // marginTop : (height*0.1)-50,
    // paddingVertical:10,
    paddingVertical:'3%',
    width:responsiveWidth(40),
    borderRadius:15,
  },

});