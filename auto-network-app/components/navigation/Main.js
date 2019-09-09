
import React from "react";
import mainScreen from '../home/mainScreen';
import signUp from '../signup/SignUp';
import { StyleSheet, Text, View, Easing, Animated , Image } from "react-native";
import Login from "../login/Login";
import ProfilePageOne from '../profile/profilePageOne';
import ProfilePageSecond from '../profile/profilePageSecond';
import ProfilePageThird from '../profile/profilePageThird';
import ProfilePageFourth from '../profile/profilePgeFourth';
import editProfile from '../profile/editProfile';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Setting from '../setting/setting';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import checkUserStatus from '../utils/checkUserStatus'
import Header from '../header/header';
import MainTabNavigation from '../navigation/MainTabNavigator';
import BookingPageOne from '../bookingSection/bookingPage1';
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

    BookingPageOne : {
      screen : BookingPageOne
    },
    Login: {
      screen: Login
    },
    editProfile:{
      screen:editProfile
    },
    MainTabNavigation:{
      screen:MainTabNavigation
    },


    ProfilePageSecond:{
      screen:ProfilePageSecond
    },
    ProfilePageOne:{
      screen: ProfilePageOne
    },
    signUp: {
      screen: signUp
    },

    Header:{
      screen:Header
    },
    Setting:{
      screen:Setting
    },
    checkUserStatus:{
      screen: checkUserStatus
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