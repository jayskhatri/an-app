import React from 'react';
import { StyleSheet, View  , Text  , TextInput , TouchableOpacity , ImageBackground , Image , Alert ,Dimensions} from 'react-native';
import {widthPercentageToDP  , heightPercentageToDP  } from 'react-native-responsive-screen';
import { responsiveWidth , responsiveHeight , responsiveFontSize  } from 'react-native-responsive-dimensions';
import * as firebase from 'firebase';
// import console = require('console');
// import console = require('console');
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
}

 
  handleSetEmail(e){
    const text = e.nativeEvent.text;
    this.setState({email:text});
    // console.log(this.state.email);
  }
  handleSetPassword(e){
    const text = e.nativeEvent.text;
    this.setState({password:text});
    // console.log(this.state.password);
  }
  handleConfirmPassword(e){
    const text = e.nativeEvent.text;
    this.setState({confirmPassword:text});
    // console.log(this.state.confirmPassword);
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
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorMessage);
    });
   }
   else
   {
    Alert.alert('Password Mismatch !!');
   }

  }
  render(){
  return (
    <View style={styles.container}>
        <View style={styles.textView}>
           <Text style={styles.Text} >Sign Up</Text>
        </View>
        <View style={styles.signUpView}>
                <Text style={styles.Text1} >Email Id / Phone No.</Text>
                <TextInput 
                      placeholder="Enter Email "
                      placeholderTextColor="black"
                      style={styles.input}
                      fontSize={15}
                      onChange={this.handleSetEmail}
                />
                <Text style={styles.Text2} >Password</Text>
                <TextInput 
                      placeholder="Enter Password"
                      placeholderTextColor="black"
                      fontSize={15}
                      style={styles.input}
                      secureTextEntry
                      onChange={this.handleSetPassword}
                />
                <Text style={styles.Text3} >Confirm Password</Text>
                <TextInput 
                      placeholder="Enter Password"
                      placeholderTextColor="black"
                      fontSize={15}
                      style={styles.input}
                      secureTextEntry
                      onChange={this.handleConfirmPassword}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.signUpEvent}>
                    <Text style={styles.buttonText}>Go Auto</Text>
                </TouchableOpacity>
        </View>
        <View style={styles.anotherLoginView} >
               <Text style={{fontSize:responsiveFontSize(2),marginTop:'3%',textAlign:'center'}} > Sign Up With </Text>
               <View style={styles.logoContainer}>
                   <TouchableOpacity onPress={this.googleLogin}>
                      <ImageBackground style={styles.ImageContainer1} source={require('../../assets/google.png')} ></ImageBackground>
                   </TouchableOpacity>
                      <ImageBackground style={styles.ImageContainer2} source={require('../../assets/Facebook.png')} ></ImageBackground>
              </View>
              <View style={{flexDirection:'row',marginLeft:'4%'}}>
                 <Text style={{fontSize:responsiveFontSize(2),marginTop:'2%'}}>Know Our </Text>
                 <TouchableOpacity> 
                      <Text style={styles.signUpButton}>Privacy Policy and Terms & condition</Text> 
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
    
    container: { flex:12 },
textView:{flex:1,/*backgroundColor:'green'*/},
signUpView:{flex:6,/*backgroundColor:'yellow'*/},
    anotherLoginView:{flex:2,/*backgroundColor:'orange'*/},
    lastImageView:{flex:3,/*backgroundColor:'yellow',*/},
    Text: {
        fontSize :responsiveFontSize(4),
        marginTop:'4%',
        textAlign:'center'
      },
      Text1: {
       fontSize:responsiveFontSize(2),
       marginTop:'6%',
       marginRight:'31%', 
       textAlign:'center',
      },
      Text2:{
        fontSize:responsiveFontSize(2),
        textAlign:'center',
        marginTop:'6%',
        marginRight:'51%'
      },
      Text3:{
        fontSize:responsiveFontSize(2),
        textAlign:'center',
        marginTop:'6%',
        marginRight:'35%'
      },
      input: {
        height:heightPercentageToDP('5%'),
        width:widthPercentageToDP('74%'),
        opacity:0.5,
        padding:'3%',
        marginTop:'3%',
        backgroundColor: '#c0d7ed',
        borderRadius:15,
        borderBottomWidth:2,
        marginLeft:'12%'
        },
        buttonText:{fontSize:responsiveFontSize(2),textAlign:'center',color:'#FFFFFF'},
        buttonContainer:{
          marginLeft:'30%',
          backgroundColor:'#2980b9',
          marginTop:'5%',
          paddingVertical:'3%',
          width:responsiveWidth(40),
          borderRadius:15,
        },
        logoContainer:{flexDirection:'row',marginLeft:'20%',marginTop:'2%'},
        ImageContainer2:{
            width:responsiveWidth(11),
            height:responsiveHeight(5),
            borderRadius:50/2,
            marginLeft:'3%'
          },
        ImageContainer1:{
            width:responsiveWidth(11),
            height:responsiveHeight(5),
            borderRadius:50/2,
            marginLeft:'30%'
          },  
          lastLogo:{
            width:widthPercentageToDP('100%'),
            height:heightPercentageToDP('28%'),
            marginLeft:'0%',
            marginTop:'3%'
          },
          signUpButton:{
            fontSize:responsiveFontSize(2),
            textAlign:'center',
            marginLeft:'1%',
            marginTop:'3%'
            ,color:'#54e0ff'
          },
      
});