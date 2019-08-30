
import React from "react";
import mainScreen from './home/mainScreen';
import signUp from './signup/SignUp';
import { StyleSheet, Text, View, Easing, Animated , Image } from "react-native";
import Login from "./login/Login";
import ProfilePageOne from './profile/profilePageOne';
import ProfilePageSecond from './profile/profilePageSecond';
import ProfilePageThird from './profile/profilePageThird';
import ProfilePageFourth from './profile/profilePgeFourth';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {responsiveFontSize} from 'react-native-responsive-dimensions';
class Main extends React.Component {
  render() {
    return(
      <View>
      <Image style={styles.container} source={require('../assets/icon.png')}></Image>
      </View>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    width:50,
    height:50,
    borderRadius:50/2,
    marginLeft:100
    // marginHorizontal:'50%'
  }
});

const MainNavigation = createStackNavigator(
  {


    ProfilePageOne:{
      screen: ProfilePageOne
    },
    ProfilePageSecond:{
      screen:ProfilePageSecond
    },
    ProfilePageThird:{
      screen:ProfilePageThird
    },
    ProfilePageFourth:{
      screen:ProfilePageFourth
  },
   
    Login: {
      screen: Login
    },
    signUp: {
      screen: signUp
    },
    mainScreen: {
      screen: mainScreen
    },
  },
  {
    
      headerMode: "screen",
  
      mode: "modal",
      defaultNavigationOptions: {
        
         title:"AutoMitra",
         headerLeft:<Main />,
         headerTitleStyle:
         {

          //  fontSize:35,
          fontSize:responsiveFontSize(4),
          marginLeft:'29%'
        },
         headerStyle:{
          backgroundColor: '#269DF9',
          height:55

         },
  
        // gesturesEnabled: true
      },
    
  }
);
const App = createAppContainer(MainNavigation);
export default App;