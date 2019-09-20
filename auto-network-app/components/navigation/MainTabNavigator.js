// import React from "react";
// import { Image, Platform } from "react-native";
// import {
//   createStackNavigator,
//   createBottomTabNavigator
// } from "react-navigation";

// import TabBarIcon from "../src/TabBarIcon";
import HomeScreen from "../src/HomeScreen";
import LinksScreen from "../src/LinksScreen";
import BookingPageOne from "../bookingSection/bookingPage1";
import SettingsScreen from "../src/SettingsScreen";
import Redirect from "../redirect";

// const HomeStack = createStackNavigator(
//   {
//     Home: HomeScreen
//   },
//   {
//     headerMode: "none"
//   }
// );

// HomeStack.navigationOptions = {
//   tabBarLabel: "Home",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-information-circle${focused ? "" : "-outline"}`
//           : "md-information-circle"
//       }
//     />
//   )
// };

// const LinksStack = createStackNavigator(
//   {
//     // Redirect: Redirect
//     BookingPageOne: BookingPageOne
//   },
//   {
//     headerMode: "none",
//     tabBarVisible: false
//   }
// );

// LinksStack.navigationOptions = {
//   tabBarLabel: "Book Auto",
//   tabBarIcon: ({ focused }) => (
//     // <TabBarIcon
//     //   focused={focused}
//     //   name={Platform.OS === "ios" ? "ios-link" : "md-link"}
//     // />
//     <Image
//       focused={focused}
//       style={{
//         height: 80,
//         width: 80,
//         alignSelf: "center",
//         resizeMode: "contain",
//         borderRadius: 40,
//         marginTop: "-40%"
//       }}
//       source={require("../../assets/icon.png")}
//     />
//   )
// };

// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen
//   },
//   {
//     headerMode: "none"
//   }
// );

// SettingsStack.navigationOptions = {
//   tabBarLabel: "Setting",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-options" : "md-options"}
//     />
//   )
// };
// const BottomTabNavigator = createBottomTabNavigator({
//   HomeView: {
//     screen: HomeStack
//   },
//   LinksStack: {
//     screen: LinksStack,
//     navigationOptions: () => {
//       return {
//         tabBarVisible: false
//       };
//     }
//   },
//   SettingsStack: {
//     screen: SettingsStack
//   }
// });
// export default BottomTabNavigaor;
import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <BookingPageOne />;

const RecentsRoute = () => <Text>Recents</Text>;

export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "music", title: "Music", icon: "queue-music" },
      { key: "albums", title: "Albums", icon: "album" },
      { key: "recents", title: "Recents", icon: "history" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    music: HomeScreen,
    albums: AlbumsRoute,
    recents: SettingsScreen
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
