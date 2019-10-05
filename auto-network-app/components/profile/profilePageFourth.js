import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import Header from "../header/header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import colors from "../constants/Colors";
var options = [{ label: "Yes", value: 0 }, { label: "No", value: 1 }];
export default class profilePageFourth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      image: null,
      isPicLoaded: true,
      downloadUrl: "",
      result: "",
      uploading: false,
      uid: ""
    };
    this.previousEvent = this.previousEvent.bind(this);
    this.nextEvent = this.nextEvent.bind(this);
    this.skipEvent = this.skipEvent.bind(this);
  }
  previousEvent(e) {
    this.props.navigation.navigate("ProfilePageThird");
  }

  submitUserDetails() {
    const { navigation } = this.props;
    let user = navigation.getParam("user");
    const thirtySecs = 30 * 1000;
    firebase.storage().setMaxOperationRetryTime(thirtySecs)
    this.setState({uid: user.uid});
    console.log("submit details: ",this.state.uid);
    firebase.database().ref('Passengers/' + user.uid + '/personal_details').set({
      first_name: navigation.getParam('first_name'),
      email_id: user.email,
      last_name: navigation.getParam('last_name'),
      birth_date: navigation.getParam('birth_date'),
      gender: navigation.getParam('gender'),
      profile_pic_url: '',
      organizational_id: '',
      // aadhar_number: navigation.getParam('aadhar_number'),
      // license_number: navigation.getParam('license_number'),
      // has_puc: navigation.getParam('has_puc'),
      // auto_number: navigation.getParam('auto_number'),
      // has_own_vehicle: navigation.getParam('has_own_vehicle'),
      // owner_name: navigation.getParam('owner_name'),
      // owner_contact_number: navigation.getParam('owner_contact_number'),
      has_profile_completed: true,
    });

    this.props.navigation.navigate("HomeScreen");
  }

  skipEvent(e) {
    const { navigation } = this.props;
    let user = navigation.getParam("user");
    firebase
      .database()
      .ref("Passengers/" + user.uid + "/personal_details")
      .set({
        profile_pic_url: "",
        first_name: navigation.getParam("first_name"),
        last_name: navigation.getParam("last_name"),
        birth_date: navigation.getParam("birth_date"),
        gender: navigation.getParam("gender"),
        has_profile_completed: false
      });
    this.props.navigation.navigate("HomeScreen");
  }

  nextEvent(e) {
    this._handleImagePicked(this.state.result);
    this.submitUserDetails();
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ isPicLoaded: false });
      this.setState({ image: result.uri });
    }
  };
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
                justifyContent: "space-between",
                backgroundColor: colors.light.blue_color
              }}
            >
              <View style={{ flex: 0.3 }}>
                <TouchableOpacity
                  onPress={this.previousEvent}
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
                <Text style={styles.headerText}>Profile</Text>
              </View>
              <View style={{ flex: 0.3 }}></View>
            </SafeAreaView>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </View>
        </View>
        <View style={styles.logoView}>
          <Image
            style={styles.logo_Icon_Css}
            source={require("../../assets/bigAdminLogo.png")}
          />
        </View>
        <View style={styles.signUpView}>
          <View style={styles.details_box_header_view}>
            <Text style={styles.detail_box_header_text_css}>
              Add Your Photo
            </Text>
          </View>
          <View style={styles.second_view_of_detali_box}>
            <TouchableOpacity onPress={this._pickImage}>
              {/* ,elevetion:11 */}
              {this.state.isPicLoaded ? (
                <Image
                  style={styles.profile_icon_css}
                  source={require("../../assets/Component.png")}
                />
              ) : (
                <Image
                  style={styles.profile_icon_css}
                  source={{ uri: image }}
                ></Image>
              )}
            </TouchableOpacity>

            <Text style={styles.second_view_of_detali_box_inner_text_css}>
              Hello, dear
            </Text>
          </View>
          <View style={styles.last_fotter_view}>
            <View style={styles.skip_next_btn_outter_view}>
              <TouchableOpacity
                style={styles.skip_btn_css}
                onPress={this.skipEvent}
              >
                <Text style={styles.skip_next_btn_text_css}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.skip_next_btn_outter_view}>
              <TouchableOpacity
                style={styles.next_btn_css}
                onPress={this.nextEvent}
              >
                <Text style={styles.skip_next_btn_text_css}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4]
    });

    if (!pickerResult.cancelled) {
      this.setState({ isPicLoaded: false });
      this.setState({ image: pickerResult.uri });
      this.setState({ result: pickerResult });
    }
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
    } finally {
      this.setState({ uploading: false });
    }
  };
}
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  console.log("hiii from uploading");
  let user = await firebase.auth().currentUser;
  console.log("currentUser: ", user.uid);
  const ref = firebase
    .storage()
    .ref("/Images/")
    .child('Passengers/')
    .child(user.uid);
  const snapshot = await ref.put(blob);
  console.log("look here awaited snapshot: ", snapshot);

  // We're done with the blob, close and release it
  blob.close();

  let downloadurl = await snapshot.ref.getDownloadURL();
  console.log(downloadurl);
  firebase
    .database()
    .ref("Passengers/" + user.uid + "/personal_details/")
    .update({
      profile_pic_url: downloadurl
    });
  this.setState({ downloadUrl: downloadurl });
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
  logoView: {
    flex: 0.38,
    alignItems: "center",
    justifyContent: "center"
  },
  logo_Icon_Css: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  signUpView: {
    flex: 0.4,
    backgroundColor: colors.light.dark_blue,
    height: "100%",
    width: wp("92%"),
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "5%",
    borderRadius: 15
  },
  details_box_header_view: {
    flex: 2,
    alignItems: "center",
    marginTop: "3%"
  },
  detail_box_header_text_css: {
    fontSize: 25,
    color: colors.light.white_color
  },
  profile_icon_css: {
    height: 120,
    width: 120,
    alignSelf: "center",
    marginTop: -50,
    borderRadius: 60
  },
  second_view_of_detali_box: {
    flex: 3,
    backgroundColor: colors.light.white_color,
    margin: 20,
    borderRadius: 20
  },
  second_view_of_detali_box_inner_text_css: {
    alignSelf: "center",
    fontSize: 20,
    color: colors.light.placeholder_text_Color,
    position: "absolute",
    bottom: "5%"
  },
  last_fotter_view: {
    flex: 0.8,
    flexDirection: "row"
  },
  skip_next_btn_outter_view: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  skip_next_btn_text_css: {
    fontSize: 20,
    color: colors.light.white_color
  },
  skip_btn_css: {
    marginLeft: "3%",
    position: "absolute",
    left: "14%",
    alignSelf: "center"
  },
  next_btn_css: {
    marginTop: "1%",
    alignSelf: "center",
    position: "absolute",
    right: "14%"
  }
});
