import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import firebase from 'firebase';

export default class checkUserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.checkStatus = this.checkStatus.bind(this);
  }

  checkStatus(){
      firebase.auth().onAuthStateChanged(user=>{
            if(user!=null){
              console.log("user",user);
                this.props.navigation.navigate("ProfilePageOne", {user: user});
            }
            else{
                this.props.navigation.navigate("Login");
            }
      })
  }
  

  render() {
      return null
  }
  componentDidMount() {
    this.checkStatus();
  }

  
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
});
