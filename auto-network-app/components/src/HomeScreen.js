import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

import Header from "../header/header";
import BottomBar from "../bottomTabBar/BottomBar";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: []
    };
    this.logout = this.logout.bind(this);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SafeAreaView
            style={{ backgroundColor: "#269DF9", paddingTop: "3%" }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "#fff",
                fontSize: 25
              }}
            >
              Home
            </Text>
            <Header />
          </SafeAreaView>
        </View>
        <ScrollView style={{ marginTop: "15%", flex: 0.68 }}>
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
        <View>
          <TouchableOpacity
            style={{ marginTop: "3%", marginLeft: "5%" }}
            onPress={this.logout}
          >
            <Text style={{ fontSize: 18 }}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.12, backgroundColor: "red" }}>
          <BottomBar {...this.props} />
        </View>
      </View>
    );
  }
  logout() {
    const { navigation } = this.props;
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          navigation.navigate("Login");
        },
        function(error) {
          console.log("error in mainScreen: ", error);
          Alert.alert(error);
        }
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flex: 0.2
  },
  header_Text_Css: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 25
  }
});
