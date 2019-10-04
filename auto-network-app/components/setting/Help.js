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
import colors from "../constants/Colors";
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
          <View style={{ flex: 1 }}>
            <SafeAreaView
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 0.4,
                justifyContent: "space-between",
                backgroundColor: colors.light.blue_color
              }}
            >
              <View style={{ flex: 0.3 }}>
                <TouchableOpacity
                  onPress={this.backEvent}
                  style={{ width: 70, height: 30 }}
                >
                  <Image
                    style={{
                      height: 25,
                      width: 60,
                      alignSelf: "center"
                    }}
                    source={require("../../assets/back1.png")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headerText}>Help</Text>
              </View>
              <View style={{ flex: 0.3 }}></View>
            </SafeAreaView>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </View>
        </View>
        <View style={{ flex: 0.78 }}>
          <TouchableOpacity
            onPress={this.faqHandleEvent}
            style={styles.btn_view}
          >
            <View style={styles.btn_inner_view_1}>
              <View style={styles.btn_inner_view_2}>
                <Image
                  style={styles.img_css}
                  source={require("../../assets/adminlogo.png")}
                />
              </View>
              <View style={styles.btn_inner_view_3}>
                <Text style={styles.text_css}>FAQ</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.contactUsHandleEvent}
            style={styles.btn_view}
          >
            <View style={styles.btn_inner_view_1}>
              <View style={styles.btn_inner_view_2}>
                <Image
                  style={styles.img_css}
                  source={require("../../assets/NOTIFICATION.png")}
                />
              </View>
              <View style={styles.btn_inner_view_3}>
                <Text style={styles.text_css}>Contact us</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.privacyPolicyHandleEvent}
            style={styles.last_btn_view}
          >
            <View style={styles.btn_inner_view_1}>
              <View style={styles.btn_inner_view_2}>
                <Image
                  style={styles.img_css}
                  source={require("../../assets/HISTORY.png")}
                />
              </View>
              <View style={styles.btn_inner_view_3}>
                <Text style={styles.text_css}>Privacy policy</Text>
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
    flex: 0.22
  },
  headerText: {
    alignSelf: "center",
    color: colors.light.white_color,
    fontSize: 25
  },
  btn_view: {
    flex: 0.08,
    marginTop: "1%"
  },
  btn_inner_view_1: {
    flex: 1,
    width: "100%",
    borderTopWidth: 0.5,
    // backgroundColor: "red",
    borderTopColor: colors.light.placeholder_text_Color,
    flexDirection: "row"
  },
  btn_inner_view_2: {
    flex: 0.15,
    // backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center"
  },
  img_css: {
    flex: 1,
    height: hp("6%"),
    width: wp("6%"),
    alignSelf: "center",
    resizeMode: "contain"
  },
  btn_inner_view_3: {
    // backgroundColor: "blue",
    flex: 0.85,
    flexDirection: "column",
    justifyContent: "center"
  },
  text_css: {
    textAlign: "left",
    fontSize: 23,
    color: colors.light.black_color
  },
  last_btn_view: {
    flex: 0.08,
    marginTop: "1%",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light.placeholder_text_Color
  }
});
