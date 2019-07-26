import Home from "./home";
import React from "react";
import List from './list';
import { StyleSheet, Text, View, Easing, Animated } from "react-native";
import Login from "./login/loginPage";
import { createStackNavigator, createAppContainer } from "react-navigation";

class Main extends React.Component {
  render() {
    return <View style={styles.container} />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#3498db"
  }
});

const MainNavigation = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    },
    List:{
      screen:List
    }
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);

const App = createAppContainer(MainNavigation);

export default App;
