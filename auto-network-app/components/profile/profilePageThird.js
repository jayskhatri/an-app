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
import RadioForm from "react-native-simple-radio-button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Header from "../header/header";
var options = [{ label: "Yes", value: 0 }, { label: "No", value: 1 }];
export default class profilePageThird extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
    this.previousEvent = this.previousEvent.bind(this);
    this.nextEvent = this.nextEvent.bind(this);
  }
  previousEvent(e) {
    this.props.navigation.navigate("ProfilePageSecond");
  }
  nextEvent(e) {
    console.log("IN");
    this.props.navigation.navigate("ProfilePageFourth");
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <View style={{ flex: 0.7, backgroundColor: "#269DF9" }}>
            <Text style={styles.header_Text_Css}>Profile</Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Header />
          </View>
        </SafeAreaView>
        <View style={styles.logoView}>
          <Image
            style={styles.logo_Icon_css}
            source={require("../../assets/bigAdminLogo.png")}
          />
        </View>
        <View style={styles.signUpView}>
          <View style={styles.outter_view_sign_up_box}>
            <View style={styles.outter_view_scroll_css}>
              {/* Scroller code */}
            </View>
            <View style={styles.first_input_box_outter_view}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.first_second_lable_css}>Auto No.</Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <TextInput
                  placeholder="Enter Your Auto No."
                  style={styles.first_input_box_css}
                />
              </View>
            </View>
            <View style={styles.first_input_box_outter_view}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.first_second_lable_css}>
                  Do you have your own vehivle ?
                </Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <RadioForm
                  style={{ marginLeft: "5%", marginTop: "4%" }}
                  radio_props={options}
                  initial={0}
                  onPress={value => {}}
                  buttonSize={7}
                  buttonColor={"#000000"}
                  labelStyle={{ fontSize: 16, marginRight: "6%" }}
                  formHorizontal={true}
                  buttonOuterSize={21}
                  selectedButtonColor={"#43b9e0"}
                  selectedLabelColor={"#0080ab"}
                />
              </View>
            </View>
            <View style={styles.third_input_box_outter_view}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.third_fourth_lable_css}>Owner Name</Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <TextInput
                  placeholder="Enter Your vehicle owner name"
                  style={styles.third_input_box_css}
                />
              </View>
            </View>
            <View style={styles.fourth_input_box_outter_view}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.third_fourth_lable_css}>
                  Owner Contact No.
                </Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <TextInput
                  placeholder="Enter Your vehicle owner contact No."
                  style={styles.fourth_input_box_css}
                />
              </View>
            </View>
            <View style={styles.fotter_outter_view_css}>
              <View style={styles.next_back_btn_outter_view}>
                <TouchableOpacity
                  style={styles.back_btn_css}
                  onPress={this.previousEvent}
                >
                  <Text style={{ fontSize: 18 }}>Go Back</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.next_back_btn_outter_view}>
                <TouchableOpacity
                  style={styles.next_btn_css}
                  onPress={this.nextEvent}
                >
                  <Text style={{ fontSize: 18 }}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    flex: 0.1
  },
  header_Text_Css: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 25
  },
  waveView: {
    flex: Platform.OS === "ios" ? 0.1 : 0.05
  },
  logoView: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center"
  },
  logo_Icon_css: {
    width: wp("55%"),
    height: hp("23%"),
    resizeMode: "contain",
    alignSelf: "center"
  },
  signUpView: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  outter_view_sign_up_box: {
    backgroundColor: "#12afe3",
    height: "100%",
    width: wp("80%"),
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "10%",
    borderRadius: 15,
    alignSelf: "center"
  },
  outter_view_scroll_css: {
    backgroundColor: "#12afe3",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flex: 0.12
  },
  first_input_box_css: {
    borderBottomWidth: 1,
    height: 35,
    marginBottom: "1%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  first_second_lable_css: {
    fontSize: 18,
    marginTop: "2.5%",
    marginLeft: "5%"
  },
  first_input_box_outter_view: {
    flex: 0.19,
    backgroundColor: "white",
    borderWidth: 0.5
  },
  third_input_box_outter_view: {
    flex: 0.21,
    backgroundColor: "white",
    borderWidth: 0.5
  },
  third_fourth_lable_css: {
    fontSize: 18,
    marginTop: "3%",
    marginLeft: "5%"
  },
  third_input_box_css: {
    borderBottomWidth: 1,
    height: 35,
    marginBottom: "1%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  fourth_input_box_outter_view: {
    flex: 0.19,
    backgroundColor: "white",
    borderWidth: 0.5
  },
  fourth_input_box_css: {
    borderBottomWidth: 1,
    height: 35,
    marginBottom: "1%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  fotter_outter_view_css: {
    flex: 0.1,
    backgroundColor: "red",
    backgroundColor: "#12afe3",
    flexDirection: "row",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  next_back_btn_outter_view: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  back_btn_css: {
    position: "absolute",
    left: "7%",
    alignSelf: "center",
    marginBottom: "1.5%",
    padding: 1
  },
  next_btn_css: {
    alignSelf: "center",
    position: "absolute",
    right: "10%",
    marginBottom: "1.5%",
    padding: 1
  }
});
