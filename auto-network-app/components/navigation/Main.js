import React from "react";
import {
  fromLeft,
  fromTop,
  fromRight,
  fromBottom,
  fadeIn,
  fadeout,
  zoomIn,
  zoomOut,
  flipY,
  flipX
} from "react-navigation-transitions";
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
import BookingPage4 from "../bookingSection/BookingPage4";
import BookingPageThird_one from "../bookingSection/BookingPage3_one";
import HomeScreen from "../src/HomeScreen";
import BottomBar from "../bottomTabBar/BottomBar";
import Redirect from "../redirect";
import requestConfirmationPage from "../bookingSection/requestConfirmationPage";
import driver_page_one from "../driver/driver_page_one";
import Notification from "../setting/Notification";
import History from "../setting/History";
import Help from "../setting/Help";
import EditPhoto from "../setting/EditPhoto";
import bookingPage3 from "../bookingSection/bookingPage3";
import ContactUs from "../helpSection/ContactUs";
import FAQ from "../helpSection/FAQ";
import OnGoingBookingDetails from "../src/OnGoingBookingDetails";
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
    checkUserStatus: {
      screen: checkUserStatus
    },
    ContactUs: {
      screen: ContactUs
    },
    FAQ: {
      screen: FAQ
    },
    HomeScreen: {
      screen: HomeScreen
    },
    Redirect: {
      screen: Redirect
    },

    BookingPage4: {
      screen: BookingPage4
    },
    BookingPageSecond: {
      screen: BookingPageSecond
    },

    bookingPage3: {
      screen: bookingPage3
    },
    ProfilePageFourth: {
      screen: ProfilePageFourth
    },
    ProfilePageOne: {
      screen: ProfilePageOne
    },

    driver_page_one: {
      screen: driver_page_one
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

    History: {
      screen: History
    },
    Notification: {
      screen: Notification
    },
    Help: {
      screen: Help
    },
    EditPhoto: {
      screen: EditPhoto
    },
    OnGoingBookingDetails: {
      screen: OnGoingBookingDetails
    }
  },
  {
    headerMode: "none",
    gesturesEnabled: false
  }
);
const App = createAppContainer(MainNavigation);
export default App;
