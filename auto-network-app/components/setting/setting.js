import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Platform,
  TouchableOpacity
} from "react-native";
import Header from "../header/header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomBar from "../bottomTabBar/BottomBar";
import colors from "../constants/Colors";
import firebase from "firebase";
export default class setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      image: null,
      isPicLoaded: true
    };
    this.myAccountHandleEvent = this.myAccountHandleEvent.bind(this);
    this.notificationHandleEvent = this.notificationHandleEvent.bind(this);
    this.historyHandleEvent = this.historyHandleEvent.bind(this);
    this.helpHandleEvent = this.helpHandleEvent.bind(this);
    this.logoutHandleEvent = this.logoutHandleEvent.bind(this);
  }
  myAccountHandleEvent(e) {
    this.props.navigation.navigate("editProfile");
  }
  notificationHandleEvent(e) {
    this.props.navigation.navigate("Notification");
  }
  historyHandleEvent(e) {
    this.props.navigation.navigate("History");
  }
  helpHandleEvent(e) {
    this.props.navigation.navigate("Help");
  }
  logoutHandleEvent() {
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
  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <SafeAreaView
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 0.4,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.light.blue_color
              }}
            >
              <View>
                <Text style={styles.headerText}>Home</Text>
              </View>
            </SafeAreaView>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </View>
        </View>
        <View style={styles.settingView}>
          <View
            style={{
              flex: 0.15,
              flexDirection: "row",
              width: "100%",
              marginTop: Platform.OS === "ios" ? "-10%" : "0%"
            }}
          >
            <Image
              style={{
                height: hp("12%"),
                width: Platform.OS === "ios" ? wp("25%") : wp("21%"),
                marginLeft: "5%",
                marginTop: "-3%",
                borderRadius: Platform.OS === "ios" ? 50 : 60,
                borderWidth: 3,
                borderColor: colors.light.white_color
              }}
              source={require("../../assets/pic.jpg")}
            />
            <View
              style={{
                flexDirection: "column",
                marginTop: "5%",
                marginLeft: "3%"
              }}
            >
              <Text style={{ fontSize: 23, color: colors.light.black_color }}>
                Dummy Jubair
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 14,
                    opacity: 0.6,
                    marginTop: Platform.OS === "android" ? "0%" : "4%",
                    color: colors.light.black_color
                  }}
                >
                  The Verified Driver
                </Text>
                <Image
                  style={{
                    marginTop: Platform.OS === "android" ? "2.5%" : "-2%",
                    marginLeft: "4%",
                    height: Platform.OS === "ios" ? hp("4%") : hp("2%"),
                    width: Platform.OS === "ios" ? wp("4%") : wp("3%"),
                    borderRadius: Platform.OS === "ios" ? 20 : 50,
                    resizeMode: "contain"
                  }}
                  source={require("../../assets/varifiedlogo.png")}
                />
              </View>
            </View>
          </View>
          <View
            style={{ flex: 0.75, backgroundColor: colors.light.white_color }}
          >
            <TouchableOpacity
              onPress={this.myAccountHandleEvent}
              style={{ flex: 0.13 }}
            >
              <View style={styles.btn_inner_view_1}>
                <View style={styles.btn_inner_view_2}>
                  <Image
                    style={styles.icon_css}
                    source={require("../../assets/adminlogo.png")}
                  />
                </View>
                <View style={styles.btn_inner_view_3}>
                  <Text
                    style={{
                      fontSize: Platform.OS === "ios" ? 23 : 18,
                      color: colors.light.black_color,
                      textAlign: "left"
                    }}
                  >
                    My Account
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      opacity: 0.6,
                      color: colors.light.black_color,
                      textAlign: "left"
                    }}
                  >
                    Personal Info , Auto details
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.notificationHandleEvent}
              style={{ flex: 0.13 }}
            >
              <View style={styles.btn_inner_view_1}>
                <View style={styles.btn_inner_view_2}>
                  <Image
                    style={styles.icon_css}
                    source={require("../../assets/NOTIFICATION.png")}
                  />
                </View>
                <View style={styles.btn_inner_view_3}>
                  <Text
                    style={{
                      fontSize: Platform.OS === "ios" ? 23 : 18,
                      color: colors.light.black_color,
                      textAlign: "left"
                    }}
                  >
                    Notification
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      opacity: 0.6,
                      color: colors.light.black_color,
                      textAlign: "left"
                    }}
                  >
                    Online\Offilne , message
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.historyHandleEvent}
              style={{ flex: 0.13 }}
            >
              <View style={styles.btn_inner_view_1}>
                <View style={styles.btn_inner_view_2}>
                  <Image
                    style={styles.icon_css}
                    source={require("../../assets/HISTORY.png")}
                  />
                </View>
                <View style={styles.btn_inner_view_3}>
                  <Text
                    style={{
                      fontSize: Platform.OS === "ios" ? 23 : 18,
                      color: colors.light.black_color,
                      textAlign: "left"
                    }}
                  >
                    History
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      opacity: 0.6,
                      color: colors.light.black_color,
                      textAlign: "left"
                    }}
                  >
                    history
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.helpHandleEvent}
              style={{ flex: 0.13 }}
            >
              <View style={styles.btn_inner_view_1}>
                <View style={styles.btn_inner_view_2}>
                  <Image
                    style={styles.icon_css}
                    source={require("../../assets/HELP.png")}
                  />
                </View>
                <View style={styles.btn_inner_view_3}>
                  <Text
                    style={{
                      fontSize: Platform.OS === "ios" ? 23 : 18,
                      color: colors.light.black_color,
                      textAlign: "left"
                    }}
                  >
                    Help
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      opacity: 0.6,
                      color: colors.light.black_color,
                      textAlign: "left"
                    }}
                  >
                    FAQ , Contact Us , Privacy policy
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.logoutHandleEvent}
              style={{ flex: 0.13 }}
            >
              <View style={styles.last_btn_inner_view_1}>
                <View style={styles.btn_inner_view_2}>
                  <Image
                    style={styles.icon_css}
                    source={require("../../assets/HELP.png")}
                  />
                </View>
                <View style={styles.btn_inner_view_3}>
                  <Text
                    style={{
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.light.black_color,
                      textAlign: "left"
                    }}
                  >
                    Logout
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.1 }}>
            <BottomBar {...this.props} />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white_color
  },
  waveView: {
    flex: 0.14
  },
  settingView: {
    flex: 0.85
  },
  header: {
    flex: 0.15
  },
  headerText: {
    alignSelf: "center",
    color: colors.light.white_color,
    fontSize: 25
  },
  btn_inner_view_1: {
    width: "100%",
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: colors.light.placeholder_text_Color,
    flexDirection: "row"
  },
  last_btn_inner_view_1: {
    width: "100%",
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: colors.light.placeholder_text_Color,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light.placeholder_text_Color
  },
  btn_inner_view_2: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.15
  },
  btn_inner_view_3: {
    flexDirection: "column",
    marginLeft: "5%",
    flex: 0.85,
    justifyContent: "center"
  },
  icon_css: {
    height: hp("6%"),
    width: wp("6%"),
    alignSelf: "center",
    resizeMode: "contain"
  }
});
