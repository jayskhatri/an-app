import React from "react";
import mainScreen from "../home/mainScreen";
import editProfile from "../profile/editProfile";
import signUp from "../signup/SignUp";
import { StyleSheet, Text, View, Easing, Animated, Image } from "react-native";
import Login from "../login/Login";
import ProfilePageOne from "../profile/profilePageOne";
import ProfilePageSecond from "../profile/profilePageSecond";
import ProfilePageThird from "../profile/profilePageThird";
import ProfilePageFourth from "../profile/profilePageFourth";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Setting from "../setting/setting";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import checkUserStatus from "../utils/checkUserStatus";
import Header from "../header/header";
import MainTabNavigation from "../navigation/MainTabNavigator";
import BookingPageOne from "../bookingSection/bookingPage1";
import BookingPageSecond from "../bookingSection/bookingPage2";
import BookingPageThird from "../bookingSection/BookingPageThird";
import BookingPageThird_one from "../bookingSection/BookingPage3_one";
import HomeScreen from "../src/HomeScreen";
import BottomBar from "../bottomTabBar/BottomBar";
import Redirect from "../redirect";
import requestConfirmationPage from "../bookingSection/requestConfirmationPage";
import driver_page_one from "../driver/driver_page_one";
class Main extends React.Component {
  render() {
    return null;
  }
}
const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginLeft: 100
    // marginHorizontal:'50%'
  }
});

const MainNavigation = createStackNavigator(
  {
    driver_page_one: {
      screen: driver_page_one
    },
    ProfilePageOne: {
      screen: ProfilePageOne
    },
    checkUserStatus: {
      screen: checkUserStatus
    },

    HomeScreen: {
      screen: HomeScreen
    },
    mainScreen: {
      screen: mainScreen
    },
    Login: {
      screen: Login
    },
    BookingPageOne: {
      screen: BookingPageOne
    },
    requestConfirmationPage: {
      screen: requestConfirmationPage
    },
    ProfilePageFourth: {
      screen: ProfilePageFourth
    },

    ProfilePageSecond: {
      screen: ProfilePageSecond
    },
    BookingPageSecond: {
      screen: BookingPageSecond
    },

    editProfile: {
      screen: editProfile
    },
    MainTabNavigation: {
      screen: MainTabNavigation
    },
    signUp: {
      screen: signUp
    },

    Header: {
      screen: Header
    },
    Setting: {
      screen: Setting
    },
    ProfilePageThird: {
      screen: ProfilePageThird
    },
    BookingPageThird: {
      screen: BookingPageThird
    }
  },
  {
    headerMode: "none",

    mode: "modal",
    defaultNavigationOptions: {
      title: "AutoMitra",
      headerLeft: <Main />,
      headerTitleStyle: {
        //  fontSize:35,
        fontSize: responsiveFontSize(4),
        marginLeft: "29%"
      },
      headerStyle: {
        backgroundColor: "#269DF9",
        height: 55
      }
      // gesturesEnabled: true
    }
  }
);
const App = createAppContainer(MainNavigation);
export default App;
