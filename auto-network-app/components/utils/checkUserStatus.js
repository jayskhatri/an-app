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
                this.props.navigation.navigate("mainScreen");
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
