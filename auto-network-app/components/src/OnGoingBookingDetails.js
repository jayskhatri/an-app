import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View
} from "react-native";

import OptionsMenu from "react-native-options-menu";
import Header from "../header/header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import colors from "../constants/Colors";
export default class OnGoingBookingDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      source: "",
      destination: "",
      date: "",
      time: "",
      selectAmOrPm: "",
      noOfPerson: "",
      driverName: "",
      autoNumber: "",
      totalAmount: "300",
      perPersonAmount: "",
      driver_pic:''
    };
    this.backEvent = this.backEvent.bind(this);
  }
  backEvent() {
    this.props.navigation.navigate("HomeScreen");
  }
  componentWillMount() {
    const {navigation} = this.props;
    let fare=parseInt(navigation.getParam('Fare'));
    let persons=parseInt(navigation.getParam('Passengers'));
    let person_amount=(fare/persons) ;
    this.setState({ name: navigation.getParam('Passenger_Name')});
    this.setState({ source: navigation.getParam('Source') });
    this.setState({ destination: navigation.getParam('Destination') });
    this.setState({ date:navigation.getParam('Date')});
    this.setState({ time:navigation.getParam('Time') });
    this.setState({ selectAmOrPm: "AM" });
    this.setState({ noOfPerson: navigation.getParam('Passengers') });
    this.setState({ driverName: navigation.getParam('Driver_Name') });
    this.setState({ autoNumber: navigation.getParam('Auto_Number') });
    this.setState({ totalAmount: navigation.getParam('Fare') });
    this.setState({ perPersonAmount: person_amount });
    this.setState({ driver_pic:navigation.getParam('Driver_Pic')})
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
                <Text style={styles.headerText}>Booking Details</Text>
              </View>
              <View style={{ flex: 0.3 }}></View>
            </SafeAreaView>
            <View
              style={{ flex: 0.6, backgroundColor: colors.light.blue_color }}
            ></View>
          </View>
        </View>
        {/* Ticket View */}
        <View style={styles.ticket_outter_View}>
          <View style={styles.ticketView}>
            {/* Header View */}
            <View style={styles.ticket_headerView}>
              <View style={styles.header_confirm_logo_view}>
                <View style={styles.outter_View_Of_Confirm_Icon}>
                  <Image
                    style={styles.confirm_Image}
                    source={require("../../assets/Before_confirm_Icon.png")}
                  />
                </View>
              </View>

              <View style={styles.header_text_view}>
                <Text style={styles.headerText_Css}>Review Your Details</Text>
              </View>
            </View>

            <View style={styles.user_Details_View}>
              <View style={styles.nameView}>
                <View
                  style={{
                    flex: 0.3,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={styles.lableText}>Name</Text>
                </View>
                <View style={styles.name_input_view}>
                  <View
                    style={{
                      flex: 0.1,
                      alignItems: "center",
                      justifyContent: "center"
                      // backgroundColor: "gray"
                    }}
                  >
                    <Image
                      style={styles.lable_Image}
                      source={require("../../assets/person.png")}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.9,
                      width: "100%",
                      height: "100%",
                      marginTop: "-1%"
                      // backgroundColor: "red"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#474747"
                        // textAlignVertical: "center"
                      }}
                    >
                      {this.state.name}
                    </Text>
                  </View>
                </View>
              </View>

              {/* source to destination view */}
              <View style={styles.source_destinatio_view}>
                <View style={{ flex: 0.5 }}>
                  <View style={{ flex: 0.3 }}>
                    <Text style={styles.lableText}>from</Text>
                  </View>
                  <View style={styles.name_input_view}>
                    <View
                      style={{
                        flex: 0.2,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        style={styles.lable_Image}
                        source={require("../../assets/sourceIcon.png")}
                      />
                    </View>
                    <View
                      style={{ flex: 0.8, marginLeft: "4%", marginTop: "-1%" }}
                    >
                      <ScrollView horizontal={true}>
                        <Text style={styles.text_Of_Details}>
                          {this.state.source}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View style={{ marginLeft: "7%", flex: 0.5 }}>
                  <View style={{ flex: 0.3 }}>
                    <Text style={styles.lableText}>To</Text>
                  </View>
                  <View style={styles.name_input_view}>
                    <View
                      style={{
                        flex: 0.2,

                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        style={styles.destinationIcon}
                        source={require("../../assets/destinationIcon.png")}
                      />
                    </View>
                    <View
                      style={{ flex: 0.8, marginLeft: "4%", marginTop: "-1%" }}
                    >
                      <ScrollView horizontal={true}>
                        <Text style={styles.text_Of_Details}>
                          {this.state.destination}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </View>
              {/* Date And Time View */}
              <View style={styles.source_destinatio_view}>
                <View style={{ flex: 0.5 }}>
                  <View style={{ flex: 0.3 }}>
                    <Text style={styles.lableText}>Date</Text>
                  </View>
                  <View style={styles.name_input_view}>
                    <View
                      style={{
                        flex: 0.2,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        style={styles.lable_Image}
                        source={require("../../assets/calender_ion.png")}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.8,
                        marginLeft: "4%",
                        marginTop: "-0.5%"
                      }}
                    >
                      <Text style={{ color: "#474747", fontSize: 15 }}>
                        {this.state.date}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginLeft: "7%", flex: 0.5 }}>
                  <View style={{ flex: 0.3 }}>
                    <Text style={styles.lableText}>Time</Text>
                  </View>
                  <View style={styles.name_input_view}>
                    <View
                      style={{
                        flex: 0.2,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        style={styles.lable_Image}
                        source={require("../../assets/clock_icon.png")}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.8,
                        marginLeft: "4%",
                        marginTop: "-0.5%"
                      }}
                    >
                      <Text style={{ color: "#474747", fontSize: 15 }}>
                        {this.state.time}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* No of */}
              <View style={styles.last_pass}>
                <View style={{ flex: 0.3 }}>
                  <Text style={styles.lableText}>No of passengers</Text>
                </View>
                <View style={styles.name_input_view}>
                  <View
                    style={{
                      flex: 0.1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Image
                      style={styles.lable_Image}
                      source={require("../../assets/group_of_ppl.png")}
                    />
                  </View>
                  <View style={{ flex: 0.9 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#474747",
                        marginTop: "-0.5%"
                      }}
                    >
                      {this.state.noOfPerson}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 0.2 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center"
                  }}
                >
                  <Image
                    style={styles.sharingIcon}
                    source={require("../../assets/Solid.png")}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: "1%",
                      marginTop: "4%",

                      color: "#fff"
                    }}
                  >
                    You Have allowed for sharing auto with another passengers
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.waveView}>
          {/* <View style={{ position: "absolute", top: -8 }}> */}
          <Header />
          {/* </View> */}
        </View>
        <View style={styles.driver_Detail_View}>
          <View style={styles.driver_Detail_outter_View}>
            <View style={styles.driver_detail_view_1}>
              <View style={styles.Auto_driver_text_view}>
                <Text style={styles.Auto_driver_text_Css}>Auto Driver</Text>
              </View>
              <View style={styles.Auto_Deiver_profile}>
                <View
                  style={{
                    flex: 0.24,
                    marginRight: "2%",
                    justifyContent: "center"
                  }}
                >
                  <Image
                    style={styles.Deiver_Profile_Image}
                    source={{uri: this.state.driver_pic}}
                  />
                </View>
                <View
                  style={{
                    flex: 0.76,
                    alignSelf: "center",
                    justifyContent: "center",
                    paddingLeft: "4%",
                    color: "grey"
                    // backgroundColor: "red"
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      // flex: 0.4,
                      overflow: "hidden",
                      alignSelf: "center"
                    }}
                  >
                    <ScrollView horizontal={true}>
                      <Text style={styles.Deiver_name_text_css}>
                        {this.state.driverName}
                      </Text>
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      flexDirection: "row"
                      // flex: 0.6
                    }}
                  >
                    <Text style={styles.varified_text_css}>
                      The Verified Driver
                    </Text>
                    <Image
                      style={styles.verifiedIcon}
                      source={require("../../assets/varifiedlogo.png")}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.driver_Detail_outter_View}>
            <View style={styles.driver_detail_view_1}>
              <View style={styles.Auto_driver_text_view}>
                <Text style={styles.Auto_driver_text_Css}>Auto Number</Text>
              </View>
              <View style={styles.Auto_number_view}>
                <View style={styles.Auto_number_View_Css}>
                  <Text style={styles.Auto_number_text_css}>
                    {this.state.autoNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.33,
              alignItems: "center",
              justifyContent: "center"
              // backgroundColor: "blue"
            }}
          >
            <View style={styles.driver_detail_view_1}>
              <View style={styles.Auto_driver_text_view}>
                <Text style={styles.Auto_driver_text_Css}>
                  Fare Calculation
                </Text>
              </View>

              <View style={styles.Auto_number_view}>
                <View style={styles.Auto_number_View_Css}>
                  <Text style={styles.Auto_number_text_css}>
                    Rs. {this.state.totalAmount}
                  </Text>
                </View>
                <Text style={{ color: "#474747" }}>
                  Rs. {this.state.perPersonAmount} per person
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.pop_up_view}>
          <TouchableOpacity
            onPress={this.handleHomeScreen}
            style={styles.pay_btn_css}
          >
            <View style={{ alignSelf: "center", flexDirection: "row" }}>
              <Text style={styles.pay_text_css}>Home</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flex: 0.2
  },
  headerInnerView: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "blue"
  },
  backImage: {
    height: 60,
    width: 60,
    alignSelf: "center",
    marginTop: "-18%",
    resizeMode: "contain"
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    alignSelf: "center"
  },
  optionButton: {
    width: 32,
    height: 35,
    resizeMode: "contain"
  },
  ticketView: {
    flex: 1,
    backgroundColor: "lightblue",
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "3%",
    borderRadius: 20,
    shadowColor: "lightblue",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 1.5,
    shadowRadius: 3.84,
    elevation: 4,
    marginTop: "-10%"
  },
  ticket_outter_View: {
    flex: 0.25,
    // paddingTop: "5%",

    backgroundColor: "#269DF6"
  },
  ticket_headerView: {
    flex: 0.2,
    backgroundColor: "lightblue",
    flexDirection: "row",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "space-between"
  },
  confirm_Image: {
    height: "80%",
    width: "80%",
    alignSelf: "center",
    resizeMode: "contain"
  },
  header_confirm_logo_view: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center"
  },
  outter_View_Of_Confirm_Icon: {
    width: 40,
    height: 35,
    marginLeft: "7%",
    marginTop: "10%",
    backgroundColor: "#269DF9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  header_text_view: {
    flex: 0.85,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginLeft: "2%",
    marginRight: "2%"
  },
  headerText_Css: {
    fontSize: 20,
    alignSelf: "center",
    color: "#000"
  },
  user_Details_View: {
    flex: 0.8
  },
  nameView: {
    flex: 0.2,
    width: "85%",
    marginLeft: "8%",
    marginTop: "3%"
  },
  last_pass: {
    flex: 0.2,
    width: "85%",
    marginLeft: "8%",
    marginTop: "5%"
  },
  name_input_view: {
    flex: 0.7,
    width: "100%",
    height: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  lableText: {
    fontSize: 10,
    color: "#fff",
    alignSelf: "center",
    position: "absolute",
    left: 0,
    bottom: "5%"
  },
  lable_Image: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    left: 0
  },
  destinationIcon: {
    width: "50%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    left: 0
  },
  text_Of_Details: {
    fontSize: 15,
    alignSelf: "center",
    color: "#474747"
  },
  source_destinatio_view: {
    flex: 0.2,
    flexDirection: "row",
    width: "85%",
    marginLeft: "8%",
    marginTop: "4%"
  },
  driver_Detail_View: {
    flex: 0.35,
    marginTop: "4%",
    alignItems: "center",
    justifyContent: "center"
  },
  driver_Detail_outter_View: {
    flex: 0.33
  },
  driver_detail_view_1: {
    width: "96%",
    height: "90%",
    marginLeft: "2%",
    marginRight: "2%",
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 0.5,
    backgroundColor: "#fff",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 4
  },
  Auto_driver_text_view: {
    flex: 0.37,
    height: "80%",
    borderRightWidth: 1.5,
    justifyContent: "center",
    textAlign: "left",
    paddingLeft: "2%"
  },
  Auto_driver_text_Css: {
    fontSize: 15,
    color: "#474747"
  },
  pipeView: {
    flex: 0.04,
    borderLeftWidth: 1,
    height: "80%"
  },
  Auto_Deiver_profile: {
    flex: 0.59,
    height: "80%",
    flexDirection: "row",
    paddingRight: "2%",
    paddingLeft: "4%",
    backgroundColor: "transparent"
  },
  Deiver_Profile_Image: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignSelf: "center"
  },
  Deiver_name_text_css: {
    fontSize: 18
  },
  varified_text_css: {
    fontSize: 10,
    color: "#474747"
  },
  verifiedIcon: {
    marginTop: Platform.OS === "android" ? "0%" : "0%",
    marginLeft: "-2%",
    // width: 30,
    // height: 15,
    marginLeft: "1.5%",
    height: Platform.OS === "ios" ? 14 : hp("2%"),
    width: Platform.OS === "ios" ? 14 : wp("3%"),
    borderRadius: Platform.OS === "ios" ? 2 : 2,
    resizeMode: "contain"
  },
  Auto_number_view: {
    flex: 0.59,
    paddingRight: "2%",
    paddingLeft: "4%"
  },
  Auto_number_View_Css: {
    borderBottomWidth: 0.5,
    width: "100%"
  },
  Auto_number_text_css: {
    width: 160,
    color: "#000",
    fontSize: 18
  },
  sharingIcon: {
    height: 15,
    width: 14,
    marginTop: "4.5%"
  },
  waveView: {
    flex: 0.12
  },

  pop_up_view: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center"
  },
  pay_btn_css: {
    width: "40%",
    height: "30%",
    backgroundColor: "#fff",
    borderRadius: Platform.OS === "ios" ? 34 : 25,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2
  },
  pay_text_css: {
    alignSelf: "center",
    fontSize: 20,
    marginLeft: "1%",
    color: "#269DF9"
  }
});
