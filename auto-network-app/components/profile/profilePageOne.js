import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import Header from "../header/header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import DatePicker from "react-native-datepicker";
var options = [
  { label: "Male", value: 111 },
  { label: "Female", value: 112 },
  { label: "Other", value: 113 }
];
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class profilePageOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      first_name: "",
      last_name: "",
      birth_date: "",
      gender: 111
    };
    this.nextEvent = this.nextEvent.bind(this);
  }

  nextEvent(e) {
    const { navigation } = this.props;
    console.log(
      "gender: ",
      this.state.gender,
      "email",
      navigation.getParam("user")
    );
    this.props.navigation.navigate("ProfilePageFourth", {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      birth_date: this.state.birth_date,
      gender: this.state.gender,
      user: navigation.getParam("user")
    });
  }

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <SafeAreaView style={styles.header}>
            <View
              style={{
                flex: 0.4,
                backgroundColor: "#269DF9",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View>
                <Text style={styles.headerText}>Profile</Text>
              </View>
            </View>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </SafeAreaView>
          <View style={styles.logoView}>
            <View style={styles.logo_inner_view}>
              <Image
                style={styles.logo_icon}
                source={require("../../assets/bigAdminLogo.png")}
              />
            </View>
          </View>

          <View style={styles.signUpView}>
            <View style={styles.outter_View_Input_detail_box}>
              <View style={styles.scrollViewCss}>{/* Scroller code */}</View>
              <View style={styles.first_second_input_box_outter_view}>
                <View style={{ flex: 0.4 }}>
                  <Text style={styles.label_one_two_css}>First Name</Text>
                </View>
                <View style={{ flex: 0.6 }}>
                  <TextInput
                    placeholder="Enter Your First Name"
                    onChangeText={first_name => this.setState({ first_name })}
                    value={this.state.first_name}
                    style={styles.text_Input_one_css}
                  />
                </View>
              </View>
              <KeyboardAvoidingView
                style={styles.first_second_input_box_outter_view}
                behavior="padding"
                enabled
              >
                <View style={{ flex: 0.4 }}>
                  <Text style={styles.label_one_two_css}>Last Name</Text>
                </View>
                <View style={{ flex: 0.6 }}>
                  <TextInput
                    placeholder="Enter Your Last Name"
                    onChangeText={last_name => this.setState({ last_name })}
                    value={this.state.last_name}
                    style={styles.text_Input_second_css}
                    theme={{
                      color: {
                        primary: "skyblue"
                      }
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
              <View style={styles.third_input_box_outter_view}>
                <View style={{ flex: 0.4 }}>
                  <Text style={styles.label_third_fourh_css}>Birth Date</Text>
                </View>
                <View style={{ flex: 0.6 }}>
                  <DatePicker
                    style={{ width: wp("60%"), marginLeft: "3%" }}
                    mode="date"
                    date={this.state.birth_date}
                    placeholder="Enter Your Birth Date"
                    format="DD-MM-YYYY"
                    initial={this.state.birth_date}
                    //  minDate="01-01-1990"
                    //  maxDate="31-12-2003"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        width: wp("1%"),
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: "10%"
                      },
                      dateInput: {
                        marginLeft: "25%",
                        borderWidth: 0,
                        borderBottomWidth: 0.5
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={birth_date => this.setState({ birth_date })}
                    value={this.state.birth_date}
                  />
                </View>
              </View>
              <View style={styles.fourt_input_box_outter_view}>
                <View style={{ flex: 0.4 }}>
                  <Text style={styles.label_third_fourh_css}>Gender</Text>
                </View>
                <View style={{ flex: 0.6 }}>
                  <RadioForm
                    style={{ marginLeft: "5%", marginTop: "4%" }}
                    radio_props={options}
                    initial={this.state.gender}
                    onPress={value => {
                      this.setState({
                        gender: value
                      });
                    }}
                    buttonSize={7}
                    buttonColor={"#000000"}
                    labelStyle={{ fontSize: 16, marginRight: "7%" }}
                    formHorizontal={true}
                    buttonOuterSize={21}
                    selectedButtonColor={"#43b9e0"}
                    selectedLabelColor={"#0080ab"}
                  />
                </View>
              </View>
              <View style={styles.last_fotter_outter_view}>
                <TouchableOpacity style={styles.back_btn_css}>
                  <Text style={{ fontSize: 18 }}>Go Back</Text>
                </TouchableOpacity>
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
      </DismissKeyboard>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerView: {
    flex: 0.1
  },
  headerText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 25
  },
  logoView: {
    flex: 0.35
  },
  logo_inner_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo_icon: {
    width: wp("55%"),
    height: hp("23%"),
    alignSelf: "center",
    resizeMode: "contain"
  },
  signUpView: {
    flex: 0.55,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flex: 0.1
  },
  outter_View_Input_detail_box: {
    flex: 1,
    height: "100%",
    width: wp("80%"),
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "5%",
    borderRadius: 15,
    alignSelf: "center"
  },
  scrollViewCss: {
    backgroundColor: "#12afe3",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flex: 0.12
  },
  text_Input_one_css: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    height: 35,
    marginBottom: "1%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  label_one_two_css: {
    fontSize: 18,
    marginTop: "2.5%",
    marginLeft: "5%"
  },
  first_second_input_box_outter_view: {
    flex: 0.2,
    backgroundColor: "white",
    borderWidth: 0.5
  },
  text_Input_second_css: {
    borderBottomWidth: 1,
    height: 35,
    marginBottom: "1%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  label_third_fourh_css: {
    fontSize: 18,
    marginTop: "3%",
    marginLeft: "5%"
  },
  third_input_box_outter_view: {
    flex: 0.22,
    backgroundColor: "white",
    borderWidth: 0.5
  },
  fourt_input_box_outter_view: {
    flex: 0.19,
    backgroundColor: "white",
    borderWidth: 0.5
  },
  last_fotter_outter_view: {
    flex: 0.07,
    backgroundColor: "#12afe3",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: "4%",
    flexDirection: "row"
  },
  back_btn_css: {
    marginLeft: "3%",
    position: "absolute",
    left: "5%",
    alignSelf: "center"
  },
  next_btn_css: {
    marginTop: "1%",
    alignSelf: "center",
    position: "absolute",
    right: "8%"
  }
});
