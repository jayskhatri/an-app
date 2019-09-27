import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import OptionsMenu from "react-native-options-menu";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Header from "../header/header";
import firebase from "firebase";
import MapPicker from "react-native-map-picker";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import requestLocationPermission from "../utils/askForPermission";
import * as geolib from "geolib";
import SearchableDropdown from "react-native-searchable-dropdown";

var source_place = [
  //name key is must.It is to show the text in front
  { id: 1, name: "Current position" },
  { id: 2, name: "codepen" },
  { id: 3, name: "envelope" },
  { id: 4, name: "etsy" },
  { id: 5, name: "facebook" },
  { id: 6, name: "foursquare" },
  { id: 7, name: "github-alt" },
  { id: 8, name: "github" },
  { id: 9, name: "gitlab" },
  { id: 10, name: "instagram" }
];
var destination_place = [
  //name key is must.It is to show the text in front
  { id: 1, name: "Current position" },
  { id: 2, name: "codepen" },
  { id: 3, name: "envelope" },
  { id: 4, name: "amazon" },
  { id: 5, name: "facebook" },
  { id: 6, name: "foursquare" },
  { id: 7, name: "github-alt" },
  { id: 8, name: "github" },
  { id: 9, name: "gitlab" },
  { id: 10, name: "instagram" }
];

export default class BookingPageOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      source: "",
      user: "",
      destination: "",
      notification: {},
      lastPosition: {
        coords: {
          latitude: 22.6007418,
          longitude: 72.8255146
        }
      },
      isReadyToLoad: false,

      // this will get true when user clicks find location inside modal
      modalMarkerLocation: 0
    };
    this.previousEvent = this.previousEvent.bind(this);
    this.handleSetSource = this.handleSetSource.bind(this);
    this.handleSetDestination = this.handleSetDestination.bind(this);
    this.nextEvent = this.nextEvent.bind(this);
    this._findUserPosition = this._findUserPosition.bind(this);
    this.sendPushNotification = this.sendPushNotification.bind(this);
    this.sendNotificationTo = this.sendNotificationTo.bind(this);
  }

  async componentDidMount() {
    await this._findUserPosition();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    //  console.log("distance: ",distance);
  }

  sendPushNotification = async token => {
    console.log("poojan");
    const message = {
      to: token,
      sound: "default",
      title: "Booking Request",
      body: "Passenger Details:",
      data: {
        Name: "poojan dharaiya",
        source: "Valetva Chowkdi",
        Destination: "Nadiad"
      }
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });

    const data = response._bodyInit;
    console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
  };

  // componentDidMount() {
  //   this._notificationSubscription = Notifications.addListener(this._handleNotification);
  // }

  _handleNotification = notification => {
    this.setState({ notification: notification });
    this.setState({
      info: JSON.stringify(notification.data.Destination)
    });
    console.log(this.state.notification);
    console.log("poojan dharaiya");
  };

  async _findUserPosition(e) {
    navigator.geolocation.getCurrentPosition(position => {
      var userRef = firebase.database().ref("online_drivers/");
      userRef.once("value").then(
        async function(snapshot) {
          let min = 900000000;
          snapshot.forEach(userId => {
            let distance = geolib.getDistance(
              position.coords,
              userId.val().position.coords
            );
            if (min > distance) {
              console.log("min: ", min);
              min = distance;
              user_id = userId.key;
            }
          });
          this.setState({ uid: user_id });
          let user = firebase.auth().currentUser;
          firebase
            .database()
            .ref("requests/" + user.uid)
            .set({
              DriverId: user_id,
              confirmation_status: false
            });
          await this.sendNotificationTo(user_id);
        }.bind(this)
      ),
        () => {
          alert("Position could not be determined.");
        };
    });
    // this.props.navigation.navigate("requestConfirmationPage");
  }

  async sendNotificationTo(user_id) {
    let user = await firebase.auth().currentUser;
    var tokenRef = firebase
      .database()
      .ref("Passengers/" + user.uid + "/Token/expo_token");

    tokenRef.once("value").then(async snapshot => {
      let token = snapshot.val();
      console.log("user_id", user);
      console.log("please see here token: ", token);
      this.sendPushNotification(token);
    });
  }

  handleSetSource = e => {
    const temp = e.nativeEvent.text;
    this.setState({ source: temp });
  };

  handleSetDestination = e => {
    const temp = e.nativeEvent.text;
    this.setState({ destination: temp });
  };

  async nextEvent(e) {
    this._findUserPosition();
    this.props.navigation.navigate("BookingPageSecond");
  }

  previousEvent() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: Platform.OS === "ios" ? 0.1 : 0.08 }}>
          <SafeAreaView style={styles.header}>
            <View>
              <TouchableOpacity onPress={this.previousEvent}>
                <Image
                  style={styles.backImage}
                  source={require("../../assets/back1.png")}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.headerText}>Book Your Tickets</Text>
            </View>
            <View>
              <OptionsMenu
                button={require("../../assets/More.png")}
                buttonStyle={styles.optionButton}
                destructiveIndex={1}
                options={["Edit", "Delete", "Cancel"]}
                actions={[this.editPost, this.deletePost]}
              />
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.enterSourceDestinationView}>
          <View style={styles.sourceDestinationInputView}>
            <View style={styles.sourceTODestinationLine}>
              <Image
                style={styles.sourceTOdestinationImage}
                source={require("../../assets/so_de_icon_side_line.png")}
              />
            </View>
            <View style={styles.inputView}>
              <View style={{ flex: 0.5, zIndex: 3 }}>
                <View style={styles.outterLookOfInputBox}>
                  {/* <TextInput
                    style={styles.signInTextInputOne}
                    placeholder="choose starting point, or click on the map  "
                    placeholderTextColor="#fff"
                    fontSize={14}
                    value={this.state.source}
                    onChange={this.handleSetSource}
                  /> */}
                  <SearchableDropdown
                    selectedItems={this.state.source}
                    onItemSelect={item => {
                      const items = this.state.source;
                      if (item.name == "Current position") {
                        // write a code for current position
                      }
                      this.setState({ source: items });
                    }}
                    containerStyle={styles.containerStyle}
                    itemStyle={styles.itemStyle}
                    itemTextStyle={styles.itemTextStyle}
                    itemsContainerStyle={styles.itemsContainerStyle}
                    items={source_place}
                    // chip={true}
                    // resetValue={false}
                    textInputProps={{
                      placeholder:
                        "choose starting point, or click on the map ",
                      fontSize: 14,
                      placeholderTextColor: "#fff",
                      underlineColorAndroid: "transparent",
                      // onTextChange: text =>
                      //   this.setState({ destination: text }),
                      style: {
                        paddingLeft: "2%",
                        width: "95%",
                        marginLeft: "3%",
                        marginRight: "3%",
                        position: "absolute",
                        top: 10,
                        borderRadius: 15,
                        borderBottomColor: "#988c8c",
                        borderBottomWidth: 1,
                        zIndex: 3
                      }
                    }}
                    listProps={{
                      nestedScrollEnabled: true
                    }}
                  />
                </View>
                {/* <Text style={styles.textCss}>choose current location</Text> */}
              </View>
              <View style={{ flex: 0.5 }}>
                <View style={styles.outterLookOfInputBoxSecond}>
                  {/* <TextInput
                    style={styles.signInTextInputOne}
                    placeholder="choose destination "
                    placeholderTextColor="#fff"
                    fontSize={14}
                    value={this.state.destination}
                    onChange={this.handleSetDestination}
                  /> */}
                  <SearchableDropdown
                    multi={true}
                    selectedItems={this.state.destination}
                    onItemSelect={item => {
                      const items = this.state.destination;
                      if (item.name == "Current position") {
                        // write a code for current position
                      }
                      // items.push(item);
                      this.setState({ destination: items });
                    }}
                    containerStyle={styles.containerStyle}
                    itemStyle={styles.itemStyle}
                    itemTextStyle={styles.itemTextStyle}
                    itemsContainerStyle={styles.itemsContainerStyle}
                    items={destination_place}
                    // defaultIndex={2}
                    chip={true}
                    resetValue={false}
                    textInputProps={{
                      placeholder: "choose destination",
                      fontSize: 14,
                      placeholderTextColor: "#fff",
                      underlineColorAndroid: "transparent",
                      // onTextChange: text => alert(text)
                      style: {
                        paddingLeft: "2%",
                        width: "95%",
                        marginLeft: "3%",
                        marginRight: "3%",
                        position: "absolute",
                        top: 10,
                        borderRadius: 15,
                        borderBottomColor: "#988c8c",
                        borderBottomWidth: 1,
                        zIndex: 0
                      }
                    }}
                    listProps={{
                      nestedScrollEnabled: true
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.sourceDestinationSwapIcon}>
              <TouchableOpacity>
                <Image
                  style={styles.swapIcon}
                  source={require("../../assets/sawap_icon.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.nextButtonView}>
            <TouchableOpacity
              style={styles.nextButtonCss}
              onPress={this.nextEvent}
            >
              <Text style={styles.nextButtonTextCss}> next </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.waveView}>
          <Image
            style={styles.waveImageCss}
            source={require("../../assets/wawe.png")}
          ></Image>
        </View>
        <View style={styles.mapView}>
          <View style={styles.mapTextView}>
            <Text style={styles.mapTextCss}>
              {" "}
              find your destination on map{" "}
            </Text>
          </View>
          <View style={styles.mapViewBorder}>{/* Map code */}</View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#269DF9",
    paddingTop: Platform.OS === "android" ? "5%" : "0%"
  },
  backImage: {
    height: 60,
    width: 60,
    marginTop: "-22%",
    resizeMode: "contain"
  },
  headerText: {
    flex: 1,
    alignSelf: "center",
    color: "#fff",
    fontSize: 30
  },
  optionButton: {
    width: 32,
    height: 35,
    marginRight: "3%",
    resizeMode: "contain"
  },
  enterSourceDestinationView: {
    flex: Platform.OS === "ios" ? 0.4 : 0.42,
    backgroundColor: "#269DF9",
    paddingTop: "2%"
  },
  sourceDestinationInputView: {
    flex: 0.8,
    flexDirection: "row"
  },
  sourceTODestinationLine: {
    flex: 0.15,
    // backgroundColor:"red",
    alignItems: "center",
    justifyContent: "center"
  },
  nextButtonView: {
    flex: 0.2,
    zIndex: -1,
    alignItems: "center",
    justifyContent: "center"
    // marginTop: Platform.OS === "ios" ? "-18%" : "-14%",
  },
  sourceTOdestinationImage: {
    height: 100,
    width: 60,
    alignSelf: "center",
    resizeMode: "contain"
  },
  inputView: {
    flex: 0.75,
    flexDirection: "column"
  },
  outterLookOfInputBox: {
    borderWidth: 0.5,
    height: 45,
    // marginTop: Platform.OS === "ios" ? "28%" : "23%",
    marginTop: "14%",
    borderRadius: 25,
    borderColor: "#fff"
    // zIndex: 4
  },
  signInTextInputOne: {
    paddingLeft: "2%",
    width: "95%",
    marginLeft: "3%",
    marginRight: "3%",
    position: "absolute",
    bottom: 6,
    borderRadius: 15,
    borderBottomColor: "#988c8c",
    borderBottomWidth: 1
  },
  textCss: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 10
  },
  outterLookOfInputBoxSecond: {
    borderWidth: 0.5,
    height: 45,
    marginTop: "6%",
    borderRadius: 25,
    borderColor: "#fff"
  },
  sourceDestinationSwapIcon: {
    flex: 0.1,
    // backgroundColor:"red",
    alignItems: "center",
    justifyContent: "center"
  },
  swapIcon: {
    height: 24,
    width: 24,
    alignSelf: "center",
    resizeMode: "contain"
  },
  nextButtonCss: {
    alignSelf: "center",
    width: "35%",
    height: "55%",
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 1.5,
    shadowRadius: 5,
    elevation: 4
  },
  nextButtonTextCss: {
    color: "#269DF9",
    alignSelf: "center",
    fontSize: 20
  },
  waveView: {
    flex: Platform.OS === "ios" ? 0.1 : 0.11,
    zIndex: -3
  },
  waveImageCss: {
    width: wp("100%"),
    height: hp("13%"),
    marginTop: Platform.OS === "ios" ? "-6%" : "-3%",
    resizeMode: "contain"
  },
  mapView: {
    flex: Platform.OS === "ios" ? 0.4 : 0.39,
    backgroundColor: "#fff"
  },
  mapViewBorder: {
    flex: 0.9,
    marginTop: "1%",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "lightblue"
  },
  mapTextView: {
    flex: 0.1,
    marginLeft: "25%",
    marginRight: "25%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: 0.5
  },
  mapTextCss: {
    position: "absolute",
    bottom: 0,
    color: "#bbbbbb"
  },
  containerStyle: {
    padding: 5
  },
  itemStyle: {
    padding: 12,
    marginTop: 5,
    width: "95%",
    alignSelf: "center"
    // backgroundColor: "lightblue",
    // borderColor: "#bbb",
    // borderWidth: 1,
    // borderRadius: 5
  },
  itemTextStyle: {
    color: "#222"
  },
  itemsContainerStyle: {
    maxHeight: 200,
    backgroundColor: "yellow",
    marginTop: 43,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15
  }
});
