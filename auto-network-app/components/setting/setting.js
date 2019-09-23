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

var options = [{ label: "Yes", value: 0 }, { label: "No", value: 1 }];
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
  }
  myAccountHandleEvent(e) {
    console.log("My Account");
  }
  notificationHandleEvent(e) {
    console.log("Notification");
  }
  historyHandleEvent(e) {
    console.log("History");
  }
  helpHandleEvent(e) {
    console.log("Help");
  }
  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        {/* <View style={styles.waveView}>
          <Image
            style={{ width: wp("100%"), height: hp("13%") }}
            source={require("../../assets/wawe.png")}
          ></Image>
        </View> */}
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
        <View style={styles.settingView}>
          <View style={{ flex: 0.15, flexDirection: "row", width: "100%" }}>
            <Image
              style={{
                height: hp("12%"),
                width: Platform.OS === "ios" ? wp("25%") : wp("21%"),
                marginLeft: "5%",
                marginTop: Platform.OS === "ios" ? "-3%" : "-16%",
                //  borderRadius:60,
                borderRadius: Platform.OS === "ios" ? 50 : 60,
                borderWidth: 3,
                borderColor: "#fff"
                //  resizeMode:"contain"
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
              <Text style={{ fontSize: 23 }}>Dummy Jubair</Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 14,
                    opacity: 0.6,
                    marginTop: Platform.OS === "android" ? "0%" : "4%"
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
                    // height:hp('10%'),
                    // width:wp('10%'),
                    borderRadius: Platform.OS === "ios" ? 20 : 50,
                    resizeMode: "contain"
                  }}
                  source={require("../../assets/varifiedlogo.png")}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 0.71, backgroundColor: "#fff" }}>
            <TouchableOpacity onPress={this.myAccountHandleEvent}>
              <View
                style={{
                  width: "100%",
                  marginTop: "1%",
                  borderTopWidth: 0.5,
                  borderTopColor: "#988c8c",
                  flexDirection: "row"
                }}
              >
                <View style={{ marginTop: "2%", marginLeft: "4%" }}>
                  <Image
                    style={{
                      marginTop: "3%",
                      flex: 1,
                      height: hp("6%"),
                      width: wp("6%"),
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/adminlogo.png")}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: "5%",
                    marginTop: "2%"
                  }}
                >
                  <Text style={{ fontSize: Platform.OS === "ios" ? 23 : 18 }}>
                    My Account
                  </Text>
                  <Text style={{ fontSize: 13, opacity: 0.6 }}>
                    Personal Info , Auto details
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.notificationHandleEvent}>
              <View
                style={{
                  width: "100%",
                  marginTop: "4%",
                  borderTopWidth: 0.5,
                  borderTopColor: "#988c8c",
                  flexDirection: "row"
                }}
              >
                <View style={{ marginTop: "2%", marginLeft: "4%" }}>
                  <Image
                    style={{
                      marginTop: "3%",
                      flex: 1,
                      height: hp("6%"),
                      width: wp("6%"),
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/NOTIFICATION.png")}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: "5%",
                    marginTop: "2%"
                  }}
                >
                  <Text style={{ fontSize: Platform.OS === "ios" ? 23 : 18 }}>
                    Notifications
                  </Text>
                  <Text style={{ fontSize: 13, opacity: 0.6 }}>
                    Online/Offilne , message
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.historyHandleEvent}>
              <View
                style={{
                  width: "100%",
                  marginTop: "4%",
                  borderTopWidth: 0.5,
                  borderTopColor: "#988c8c",
                  flexDirection: "row"
                }}
              >
                <View style={{ marginTop: "2%", marginLeft: "4%" }}>
                  <Image
                    style={{
                      marginTop: "3%",
                      flex: 1,
                      height: hp("6%"),
                      width: wp("6%"),
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/HISTORY.png")}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: "5%",
                    marginTop: "2%"
                  }}
                >
                  <Text style={{ fontSize: Platform.OS === "ios" ? 23 : 18 }}>
                    HISTORY
                  </Text>
                  <Text style={{ fontSize: 13, opacity: 0.6 }}>history</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.helpHandleEvent}>
              <View
                style={{
                  width: "100%",
                  marginTop: "4%",
                  borderTopWidth: 0.5,
                  borderTopColor: "#988c8c",
                  flexDirection: "row",
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#988c8c"
                }}
              >
                <View style={{ marginTop: "0%", marginLeft: "4%" }}>
                  <Image
                    style={{
                      marginTop: "1%",
                      flex: 1,
                      height: hp("6%"),
                      width: wp("6%"),
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/HELP.png")}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: "5%",
                    marginBottom: "4%",
                    marginTop: "2%"
                  }}
                >
                  <Text style={{ fontSize: Platform.OS === "ios" ? 23 : 18 }}>
                    HELP
                  </Text>
                  <Text style={{ fontSize: 13, opacity: 0.6 }}>
                    FAQ , Contact us , Privacy policy{" "}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.14, backgroundColor: "red" }}>
            <BottomBar {...this.props} />
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
  waveView: {
    flex: 0.14
  },
  settingView: {
    flex: 0.9
  },
  header: {
    flex: 0.1
  }
});
