import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View
} from "react-native";

import Header from "../header/header";
import BottomBar from "../bottomTabBar/BottomBar";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SafeAreaView style={{ backgroundColor: "#269DF9" }}>
            <Text
              style={{
                alignSelf: "center",
                color: "#fff",
                fontSize: 25,
                marginTop: Platform.OS === "android" ? "4%" : "0%"
              }}
            >
              Home
            </Text>
            <Header />
          </SafeAreaView>
        </View>
        <ScrollView style={{ marginTop: "15%", flex: 0.83 }}>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
          <Text>Home Screen</Text>
        </ScrollView>
        <View style={{ flex: 0.14, backgroundColor: "red" }}>
          <BottomBar {...this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flex: 0.1
  }
});
