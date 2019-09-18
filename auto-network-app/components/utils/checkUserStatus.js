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
              console.log("user",user.email);
              var userRef = firebase.database().ref('Passengers/'+user.uid);
              var profile_completed=null;
              
              userRef.once('value').then((snapshot)=>{
                console.log("snapshot: ",snapshot);
                if(snapshot!=null){
                  const {navigation} = this.props;
                  profile_completed = (snapshot.val() && snapshot.val().personal_details.has_profile_completed);
                  console.log('profile completed: ',profile_completed);
                  if(profile_completed===true){
                    console.log("profile is completed bro");
                    navigation.navigate("mainScreen");
                  }else if(profile_completed ===false){
                    console.log("profile is not completed bro");
                    this.props.navigation.navigate("ProfilePageOne", {user: user});
                  }
                  else{
                    console.log("Login Again");
                    this.props.navigation.navigate("Login");
                  }
                }
              },function(err){
                console.error(err);
              });
              // this.props.navigation.navigate("ProfilePageOne", {user: user});
            }
            else{
                this.props.navigation.navigate("Login");
            }
      })
  }
  

  render() {
      return null
  }
  componentWillMount() {
    this.checkStatus();
  }

  
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
});
