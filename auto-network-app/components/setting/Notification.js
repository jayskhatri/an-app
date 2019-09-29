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
  Switch,
  Image
} from "react-native";
import Header from "../header/header";

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
              <View>
                <TouchableOpacity onPress={this.backEvent}>
                  <Image
                    style={{
                      width: 70,
                      height: 80,
                      marginTop: "-12%",
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/back1.png")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headerText}>History</Text>
              </View>
              <View></View>
            </View>
            <View style={{ flex: 0.7 }}>
              <Header />
            </View>
          </SafeAreaView>
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
    flex: 1
  },
  header: {
    flex: 0.18
  },
  headerText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 25
  },
  notification_view: {
    flex: 0.82
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
    paddingLeft: "3%"
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
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    borderWidth: 1,
    shadowColor: "black",
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
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1.5,
    shadowRadius: 3.84,
    elevation: 4
  }
});
