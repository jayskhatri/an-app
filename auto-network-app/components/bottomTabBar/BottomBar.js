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
import { navigation } from "react-navigation";

export default class BottomBar extends React.Component {
  constructor() {
    super();
    this.homeScreenEvent = this.homeScreenEvent.bind(this);
    this.bookAutoEvent = this.bookAutoEvent.bind(this);
    this.myAccountEvent = this.myAccountEvent.bind(this);
  }
  homeScreenEvent(e) {
    this.props.navigation.navigate("HomeScreen");
  }
  bookAutoEvent(e) {
    this.props.navigation.navigate("BookingPageOne");
  }
  myAccountEvent(e) {
    this.props.navigation.navigate("Setting");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.BottomBar}>
          <View style={styles.home_btn}>
            <TouchableOpacity onPress={this.homeScreenEvent}>
              <Image
                style={styles.homeIcon}
                source={require("../../assets/Solid.png")}
              />
              <Text style={styles.Text}>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.booking_btn}>
            <TouchableOpacity onPress={this.bookAutoEvent}>
              <Image
                style={styles.homeIcon}
                source={require("../../assets/Solid.png")}
              />
              <Text style={styles.Text}>Book Auto</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.myProfile_btn}>
            <TouchableOpacity onPress={this.myAccountEvent}>
              <Image
                style={styles.homeIcon}
                source={require("../../assets/Solid.png")}
              />
              <Text style={styles.Text}> Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  BottomBar: {
    position: "absolute",
    bottom: 0,
    flex: 0.25,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#269DF9",
    flexDirection: "row",
    padding: "4%",
    justifyContent: "space-around"
  },
  home_btn: {
    marginBottom: "8%",
    width: "20%",
    alignSelf: "center"
  },
  booking_btn: {
    marginBottom: "8%",
    width: "20%",
    alignSelf: "center"
  },
  myProfile_btn: {
    marginBottom: "8%",
    width: "20%",
    alignSelf: "center"
  },
  homeIcon: {
    height: 32,
    width: 30,
    alignSelf: "center"
  },
  Text: {
    alignSelf: "center",
    fontSize: 15
  }
});
