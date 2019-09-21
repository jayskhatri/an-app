
import React from "react";
import mainScreen from '../home/mainScreen';
import editProfile from '../profile/editProfile'
import signUp from '../signup/SignUp';
import { StyleSheet, Text, View, Easing, Animated , Image } from "react-native";
import Login from "../login/Login";
import ProfilePageOne from '../profile/profilePageOne';
import ProfilePageSecond from '../profile/profilePageSecond';
import ProfilePageThird from '../profile/profilePageThird';
import ProfilePageFourth from '../profile/profilePageFourth';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Setting from '../setting/setting';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import checkUserStatus from '../utils/checkUserStatus'
import MainTabNavigation from '../navigation/MainTabNavigator';
import BookingPageOne from '../bookingSection/bookingPage1';
import BookingPageSecond from '../bookingSection/bookingPage2';
class Main extends React.Component {
  render() {
    return(
      <View>
      <Image style={styles.container} source={require('../../assets/icon.png')}></Image>
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
    Login: {
      screen: Login
    },
    checkUserStatus:{
      screen: checkUserStatus
    },
    BookingPageOne : {
      screen : BookingPageOne
    }, 
    BookingPageOne : {
      screen : BookingPageOne
    },
    ProfilePageFourth:{
      screen: ProfilePageFourth
    },
    ProfilePageOne:{
      screen: ProfilePageOne
    },
    
    ProfilePageSecond:{
      screen:ProfilePageSecond
    },
    BookingPageSecond:{
      screen : BookingPageSecond
    },
   
    editProfile:{
      screen:editProfile
    },
    MainTabNavigation:{
      screen:MainTabNavigation
    },
    signUp: {
      screen: signUp
    },
    Setting:{
      screen:Setting
    },
    ProfilePageThird:{
      screen:ProfilePageThird
    },
    mainScreen: {
      screen: mainScreen
    },
  },
  {
      headerMode: "none",
  
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