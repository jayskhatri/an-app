
import React from "react";
import { StyleSheet, Text, View, SafeAreaView , Platform , Image ,TextInput,TouchableOpacity } from "react-native";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../header/header';
import firebase from 'firebase';
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
// const {widthOfScreen , heightOfScreen } = Dimensions.get('window');
var options = [{ label: "Yes", value: 0 }, { label: "No", value: 1 }];

export default  class profilePageSecond extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        aadhar_number: '',
        license_number: '',
        has_puc: 0,
      }
      this.previousEvent = this.previousEvent.bind(this);
      this.nextEvent = this.nextEvent.bind(this);
    }

    previousEvent(e){
        this.props.navigation.navigate("ProfilePageOne");
    }
    nextEvent(e){
      const {navigation} = this.props;
      // console.log("aadhar: ",this.state.aadhar_number," licence: ",this.state.license_number, " has_puc:  ",this.state.has_puc, " last name: ",navigation.getParam('last_name'))
        this.props.navigation.navigate("ProfilePageThird",
        {
          aadhar_number: this.state.aadhar_number,
          license_number: this.state.license_number,
          has_puc: this.state.has_puc,

          user: navigation.getParam('user'),
          first_name: navigation.getParam('first_name'),
          last_name: navigation.getParam('last_name'),
          birth_date: navigation.getParam('birth_date'),
          gender: navigation.getParam('gender')
        });
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
            style={styles.logo_Icon}
            source={require("../../assets/bigAdminLogo.png")}
          />
        </View>
        <View style={styles.signUpView}>
          <View style={styles.inner_view_input_detail_box}>
            <View style={styles.scroll_view_css}>{/* Scroller code */}</View>
            <View style={styles.first_input_box_outter_view}>
              <View style={{ flex: 0.4 }}>
                <Text
                  style={{ fontSize: 18, marginTop: "2.5%", marginLeft: "5%" }}
                  aadhar_number={value => {
                    aadhar_number: value;
                  }}
                >
                  Aadhar No.
                </Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <TextInput
                  placeholder="Enter Your Aadhar No."
                  onChangeText={(aadhar_number) => this.setState({aadhar_number})}
                  value={this.state.aadhar_number}
                  style={styles.first_input_box_Css}
                />
              </View>
            </View>
            <View style={styles.second_input_box_outter_view}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.label_second_css}>Licence No.</Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <TextInput
                  placeholder="Enter Your Licence No."
                  onChangeText={(license_number) => this.setState({license_number})}
                  value={this.state.license_number}
                  style={styles.second_input_box_css}
                />
              </View>
            </View>
            <View style={styles.third_input_box_outter_view}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.label_third_css}>Do You Have PUC?</Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <RadioForm
                  style={{ marginLeft: "5%", marginTop: "4%" }}
                  radio_props={options}
                  initial={this.state.has_puc}
                  onPress={value => {
                    this.setState({
                      has_puc: value
                    });
                  }}
                  buttonSize={7}
                  buttonColor={"#000000"}
                  labelStyle={{ fontSize: 16, marginRight: 4 }}
                  formHorizontal={true}
                  buttonOuterSize={21}
                  selectedButtonColor={"#43b9e0"}
                  selectedLabelColor={"#0080ab"}
                />
              </View>
            </View>
            <View style={styles.last_fotter_outter_view}>
              <View style={styles.outter_view_next_back_btn}>
                <TouchableOpacity
                  style={styles.back_btn_css}
                  onPress={this.previousEvent}
                >
                  <Text style={{ fontSize: 18 }}>Go Back</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.outter_view_next_back_btn}>
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
  logoView: {
    flex: 0.45,
    alignItems: "center",
    justifyContent: "center"
  },
  logo_Icon: {
    width: wp("55%"),
    height: hp("23%"),
    alignSelf: "center",
    resizeMode: "contain"
  },
  signUpView: {
    flex: 0.45,
    alignItems: "center",
    justifyContent: "center"
  },
  inner_view_input_detail_box: {
    flex: 1,
    backgroundColor: "#fff",
    height: "80%",
    width: wp("80%"),
    marginLeft: "3%",
    marginRight: "3%",
    marginTop: "1%",
    marginBottom: "3%",
    borderRadius: 15,
    alignSelf: "center"
  },
  scroll_view_css: {
    backgroundColor: "#12afe3",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flex: 0.15
  },
  first_input_box_outter_view: {
    flex: 0.25,
    backgroundColor: "white",
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5
  },
  first_input_box_Css: {
    borderBottomWidth: 1,
    height: 35,
    marginBottom: "1%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  second_input_box_outter_view: {
    flex: 0.25,
    backgroundColor: "white",
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5
  },
  label_second_css: {
    fontSize: 18,
    marginTop: "2.5%",
    marginLeft: "5%"
  },
  second_input_box_css: {
    borderBottomWidth: 1,
    height: 35,
    marginBottom: "1%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  third_input_box_outter_view: {
    flex: 0.25,
    backgroundColor: "white",
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5
  },
  label_third_css: {
    fontSize: 18,
    marginTop: "3%",
    marginLeft: "5%"
  },
  last_fotter_outter_view: {
    flex: 0.1,
    // padding: "5%",
    backgroundColor: "#12afe3",
    // backgroundColor: "red",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row"
  },
  back_btn_css: {
    // marginLeft: "3%",
    position: "absolute",
    left: "7%",
    alignSelf: "center"
  },
  next_btn_css: {
    // marginTop: "1%",
    alignSelf: "center",
    position: "absolute",
    right: "10%"
  },
  outter_view_next_back_btn: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  }
});
