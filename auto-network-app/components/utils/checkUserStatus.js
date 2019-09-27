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
            if(user){
              console.log("user",user.email);
              var userRef = firebase.database().ref('Passengers/'+user.uid+'/personal_details/');
              var profile_completed=null;
              
              userRef.once('value').then((snapshot)=>{
                console.log("snapshot: ",snapshot);
                if(snapshot!=null){
                  const {navigation} = this.props;
                  profile_completed = (snapshot.val() && snapshot.val().has_profile_completed);
                  console.log('profile completed: ',profile_completed);
                  if(profile_completed===true){
                    
                    navigation.navigate("BookingPageOne");

                  }else if(profile_completed ===false){
                    
                    this.props.navigation.navigate("ProfilePageOne", {user: user});
                  }
                  else{
                    this.props.navigation.navigate("ProfilePageOne", {user: user});
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
