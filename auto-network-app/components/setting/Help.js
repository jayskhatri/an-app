import React from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import Header from "../header/header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
export default class Help extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.backEvent = this.backEvent.bind(this);
  }

  backEvent() {
    this.props.navigation.navigate("Setting");
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SafeAreaView
            style={{
              flex: 1
            }}
          >
            <View
              style={{
                flex: 0.3,
                backgroundColor: "#269DF9",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={{ marginTop: "-4%" }}>
                <TouchableOpacity onPress={this.backEvent}>
                  <Image
                    style={{
                      width: 60,
                      height: 70,
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/back1.png")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headerText}>Help</Text>
              </View>
              <View></View>
            </View>
            <View style={{ flex: 0.7 }}>
              <Header />
            </View>
          </SafeAreaView>
        </View>
        <View style={{ flex: 0.82, backgroundColor: "#fff" }}>
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
                  FAQ
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
                  Contact us
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
                  Privacy policy
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
    flex: 0.18
  },
  headerText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 25
  }
});
