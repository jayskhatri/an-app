import React from "react";
import { Image, Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../src/TabBarIcon";
import HomeScreen from "../src/HomeScreen";
import LinksScreen from "../src/LinksScreen";
import SettingsScreen from "../src/SettingsScreen";
import Redirect from "../redirect";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    headerMode: "none"
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator(
  {
    Redirect: {
      screen: Redirect
    }
  },
  {
    headerMode: "none"
  }
);

LinksStack.navigationOptions = {
  tabBarLabel: "Book Auto",
  tabBarIcon: ({ focused }) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    // />
    <Image
      style={{
        height: 80,
        width: 80,
        alignSelf: "center",
        resizeMode: "contain",
        borderRadius: 40,
        marginTop: "-40%"
      }}
      source={require("../../assets/icon.png")}
    />
  )
};

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  {
    headerMode: "none"
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Setting",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
});
