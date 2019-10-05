import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
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
              var userRef = firebase.database().ref('Passengers/'+user.uid+'/personal_details/');
              var profile_completed=null;
              
              userRef.once('value').then((snapshot)=>{
                console.log("snapshot: ",snapshot);
                if(snapshot!=null){
                  const {navigation} = this.props;
                  profile_completed = (snapshot.val() && snapshot.val().has_profile_completed);
                  console.log('profile completed: ',profile_completed);
                  if(profile_completed===true){
                    console.log("profile is completed bro");
                    navigation.navigate("HomeScreen");
                  }else if(profile_completed ===false){
                    console.log("profile is not completed bro");
                    this.props.navigation.navigate("ProfilePageOne", {user: user});
                  }
                  else{
                    console.log("Login Again");
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
      return(
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator  size="large"   color="#269DF9" />
        </View>
      )
  }

  componentWillMount() {
    this.setState({
      is_loaded: false
    });
    this.checkStatus();
    this.setState({
      is_loaded: true
    });
  }

  
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  containerActivityIndicator: {
    flex:1,
  },
  ActivityIndicator: {
    // flex:86,
    alignItems:"center",
    justifyContent:"center"
  },
});
