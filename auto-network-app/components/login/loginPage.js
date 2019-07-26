import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet,TouchableOpacity, Text,Image, View ,TextInput,Alert} from 'react-native';
// import console = require('console');
// import console = require('console');



export default class login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
       text1:"",
       text2: "",
       pass:"",
       name:""
    }
    this.login = this.login.bind(this);
    this.handleEventpass = this.handleEventpass.bind(this);
    this.handleEventName = this.handleEventName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 };
 handleEventpass(e){
   const text = e.nativeEvent.text;
   this.setState({pass:text});
 }
 handleEventName(e){
   const text = e.nativeEvent.text;
   this.setState({name:text});
 }
 handleSubmit(e){
  //  this.setState({
  //   text1: this.state.name, 
  //   text2: this.state.pass
  //  })
  this.props.navigation.navigate("Home");
}

login=(e)=>{

  let email=this.state.name;
  let Password=this.state.pass;
  firebase.auth().
  // createUserWithEmailAndPassword(email,Password)
  signInWithEmailAndPassword(email,Password)
  .then(function(){

    // Alert.alert(
    //   'successfully Login'
    //  );

    // var user = firebase.auth().currentUser;
    // user.sendEmailVerification().then(function(){
    //   console.log("done verification");
    // }) 
    firebase.database().ref('Drivers/').push(
      {
        Driver_Status:"",
        Personal_Info:"",
        Auto_Details:"",
        Documents:"",
      }
    )
    console.log(this.props);
    this.props.navigation.navigate("Home");
  }.bind(this))
  .catch(function(error){
    // Alert.alert(
    //   'Wrong username/password'
    //  );
    console.log(error);
    });

  // var auth = firebase.auth();
  //  auth.sendPasswordResetEmail(email).then(function(){
  //    console.log("reset password");
  //  })






};

 render(){
    return (
      
        <View style={styles.container}>
          <Text style={styles.text}>Welcome TO My first React Native App</Text>
          <Image
          style={styles.logo}
          source={require('../../.expo/download.png')}
          ></Image>
         <TextInput 
         placeholder="Enter Email .."
         placeholderTextColor="white"
         fontSize={15}
         style={styles.input}
         onChange={this.handleEventName}
         />
         <TextInput 
         placeholder="Enter password .."
         placeholderTextColor="white"
         fontSize={15}
         secureTextEntry
         style={styles.input}
         onChange={this.handleEventpass}
         />
         <TouchableOpacity 
         style={styles.buttonContainer}
         onPress={this.login}
        // onPress={this.handleSubmit}

        
         >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

         <Text>{this.state.text1}</Text>
         <Text>{this.state.text2}</Text>
        </View>
      );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    margin: "auto"

    
  },
  buttonText:{textAlign:'center',color:'#FFFFFF'},
  buttonContainer:{
    backgroundColor:'#2980b9',
    marginTop:20,
    paddingVertical:10,
    width:370
  },
  logo: {
    height:300,
    width:300,
    marginBottom:40,
    borderRadius:50,
  },
  input:{
    height:40,
    width:370,
    padding:10,
    marginBottom:10,
        backgroundColor: '#37fffa',
        borderRadius:10
  },
  text:{
    marginTop:60,
    marginBottom:30,
    fontSize: 20,
    marginBottom:50
  }
});