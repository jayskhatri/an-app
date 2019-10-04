import React from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Image
} from "react-native";
import Header from "../header/header";
import colors from "../constants/Colors";
export default class Notification extends React.Component {
  constructor() {
    super();
    this.state = {
      switchValue: false
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.backEvent = this.backEvent.bind(this);
  }

  toggleSwitch() {
    if (this.state.switchValue) {
      this.setState({ switchValue: false });
    } else {
      this.setState({ switchValue: true });
    }
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
                <Text style={styles.headerText}>Notification</Text>
              </View>
              <View style={{ flex: 0.3 }}></View>
            </SafeAreaView>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </View>
        </View>
        <View style={styles.notification_view}>
          <View style={styles.receive_broadcast_btn_view}>
            <View style={styles.receive_broadcast_btn_inner_view_1}>
              <View style={styles.receive_broadcast_btn_inner_view_2}>
                <Text style={styles.broadcast_text_css}>
                  Receive Broadcast Notification{" "}
                </Text>
              </View>
              <View style={styles.receive_broadcast_btn_inner_view_3}>
                <Switch
                  style={styles.switch_css}
                  onValueChange={this.toggleSwitch}
                  disabled={this.state.fullAuto ? true : false}
                  value={this.state.switchValue}
                />
              </View>
            </View>
          </View>
          <View style={styles.notification_list_view}>
            <View style={styles.notification_list_inner_view_1}></View>
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
  header: {
    flex: 0.22
  },
  headerText: {
    alignSelf: "center",
    color: colors.light.white_color,
    fontSize: 25
  },
  notification_view: {
    flex: 0.78
    // backgroundColor: "lightblue"
  },
  receive_broadcast_btn_view: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center"
  },
  receive_broadcast_btn_inner_view_2: {
    flex: 0.8,
    // backgroundColor: "green",
    justifyContent: "center"
  },
  broadcast_text_css: {
    fontSize: 20,
    textAlign: "left",
    paddingLeft: "3%",
    color: colors.light.black_color
  },
  receive_broadcast_btn_inner_view_3: {
    flex: 0.2,
    // backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center"
  },
  switch_css: {
    alignSelf: "center"
  },
  receive_broadcast_btn_inner_view_1: {
    width: "95%",
    height: "75%",
    backgroundColor: colors.light.white_color,
    borderRadius: 15,
    flexDirection: "row",
    borderWidth: 1,
    shadowColor: colors.light.black_color,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1.5,
    shadowRadius: 3.84,
    elevation: 4
  },
  notification_list_view: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center"
  },
  notification_list_inner_view_1: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
    paddingTop: "2%",
    marginBottom: "5%",
    backgroundColor: colors.light.white_color,
    borderRadius: 15,
    flexDirection: "row",
    borderWidth: 1,
    shadowColor: colors.light.black_color,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1.5,
    shadowRadius: 3.84,
    elevation: 4
  }
});
