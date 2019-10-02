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
  Keyboard,
  Alert,
  Image,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Header from "../header/header";
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleSetEmail = this.handleSetEmail.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.signUpEvent = this.signUpEvent.bind(this);
    this.signInEvent = this.signInEvent.bind(this);
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(
      this
    );
  }

  handleSetEmail(e) {
    const text = e.nativeEvent.text;
    this.setState({ email: text });
  }

  handleSetPassword(e) {
    const text = e.nativeEvent.text;
    this.setState({ password: text });
    //  console.log(this.state.password);
  }

  signUpEvent(e) {
    this.props.navigation.navigate("signUp");
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    console.log("dharaiya");
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.loh("granted");
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    console.log("token: ", token);
    firebase.auth().onAuthStateChanged(function(user) {
      firebase
        .database()
        .ref("Passengers/" + user.uid + "/Token/")
        .set({
          expo_token: token
        });
    });
  };

  signInEvent(e) {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        function() {
          firebase.auth().onAuthStateChanged(
            function(user) {
              console.log("sign in event: ", user.emailVerified);

              if (user && user != null) {
                if (user.emailVerified) {
                  // registerForPushNotificationsAsync();
                  Alert.alert("Login successful");
                  var userRef = firebase
                    .database()
                    .ref("Passengers/" + user.uid);
                  var profile_completed;
                  userRef.once("value").then(function(snapshot) {
                    profile_completed =
                      snapshot.val() &&
                      snapshot.val().personal_details.has_profile_completed;
                  });
                  this.registerForPushNotificationsAsync();
                  console.log("is profile completed: ", profile_completed);
                  if (profile_completed) {
                    this.props.navigation.navigate("HomeScreen");
                  } else {
                    this.props.navigation.navigate("ProfilePageOne", {
                      user: user
                    });
                  }
                } else {
                  Alert.alert("Verify your Email");
                }
              } else {
                Alert.alert("No User Exist");
              }
            }.bind(this)
          );
        }.bind(this)
      )

      .catch(function(error) {
        Alert.alert(" Please Create Your Account ..");
        console.log(error);
      });
  }

  render() {
    return (
      <DismissKeyboard>
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
                  backgroundColor: "#269DF9"
                }}
              >
                <View>
                  <Text style={styles.headerText}>Sign In</Text>
                </View>
              </SafeAreaView>
              <View style={{ flex: 0.6 }}>
                <Header />
              </View>
            </View>
          </View>
          <View style={styles.signInView}>
            <Text style={styles.signInlableOne}>Email Id / Phone No.</Text>
            <View style={styles.outterLookOfInputBox}>
              <TextInput
                style={styles.signInTextInputOne}
                placeholder="Enter Email "
                placeholderTextColor="#988c8c"
                fontSize={16}
                keyboardType="email-address"
                // onSubmitEditing={Keyboard.dismiss}
                // onBlur={Keyboard.dismiss}
                onChange={this.handleSetEmail}
              />
            </View>
            <Text style={styles.signInlableOne}>Password</Text>
            <View style={styles.outterLookOfSecondInputBox}>
              <TextInput
                style={styles.signInTextInputOne}
                placeholder="Enter Password "
                placeholderTextColor="#988c8c"
                secureTextEntry
                fontSize={16}
                onChange={this.handleSetPassword}
              />
            </View>
          </View>
          <View style={styles.signInButtonView}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                style={styles.goAutoButtonCss}
                onPress={this.signInEvent}
              >
                <Text
                  style={{ alignSelf: "center", fontSize: 25, color: "#fff" }}
                >
                  Go Auto
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.linkSignUpView}>
            <View
              style={{
                flex: 1,
                marginTop: Platform.OS === "ios" ? "1%" : "0%"
              }}
            >
              <TouchableOpacity>
                <Text style={{ color: "#269DF9", alignSelf: "center" }}>
                  {" "}
                  Forgot Password ?{" "}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: Platform.OS === "ios" ? "5%" : "3%",
                  alignSelf: "center"
                }}
              >
                <Text> Not joined Yet ? </Text>
                <TouchableOpacity onPress={this.signUpEvent}>
                  <Text style={{ color: "#269DF9" }}>
                    {" "}
                    create Your account{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: Platform.OS === "ios" ? "5%" : "3%",
                  alignSelf: "center"
                }}
              >
                <Text> Know Our </Text>
                <TouchableOpacity>
                  <Text style={{ color: "#269DF9" }}>
                    {" "}
                    Privacy Policy and Terms & condition{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.logoView}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                style={{
                  height: "90%",
                  width: "90%",
                  marginLeft: "10%",
                  marginBottom: "10%",
                  marginRight: "10%",
                  marginTop: "5%",
                  resizeMode: "contain"
                }}
                source={require("../../assets/lastLogo.png")}
              />
            </View>
          </View>
        </View>
      </DismissKeyboard>
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
    color: "#fff",
    fontSize: 25
  },
  signInView: {
    flex: Platform.OS === "ios" ? 0.18 : 0.23
    // backgroundColor:"red"
  },
  signInlableOne: {
    flex: 0.15,
    fontSize: 15,
    marginTop: "4%",
    marginLeft: "15.5%"
  },
  outterLookOfInputBox: {
    flex: 0.35,
    borderWidth: 0.5,
    marginLeft: "10%",
    marginTop: "1%",
    marginRight: "10%",
    borderRadius: 25
  },
  outterLookOfSecondInputBox: {
    flex: 0.35,
    borderWidth: 0.5,
    marginTop: "1%",
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 25
  },
  signInTextInputOne: {
    flex: 1,
    paddingLeft: "2%",
    marginTop: "5%",
    marginLeft: "5%",
    marginBottom: "1.8%",
    marginRight: "3%",
    borderRadius: 15,
    borderBottomColor: "#988c8c",
    borderBottomWidth: 1
  },
  linkSignUpView: {
    flex: Platform.OS === "ios" ? 0.15 : 0.15,
    // backgroundColor:"gray",
    alignItems: "center",
    justifyContent: "center"
  },
  logoView: {
    flex: 0.3
    // backgroundColor:"red",
  },
  signInButtonView: {
    flex: 0.15
    // backgroundColor:"gray"
  },
  goAutoButtonCss: {
    width: "70%",
    height: "30%",
    borderRadius: 25,
    backgroundColor: "#269DF9",
    alignItems: "center",
    justifyContent: "center"
  }
});
