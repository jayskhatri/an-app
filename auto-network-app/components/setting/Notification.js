import React from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import Header from "../header/header";

export default class Notification extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SafeAreaView
            style={{
              backgroundColor: "#269DF9"
            }}
          >
            <Text style={styles.headerText}>Sign in</Text>
            <Header />
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 0.2
  },
  headerText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 25
  }
});
