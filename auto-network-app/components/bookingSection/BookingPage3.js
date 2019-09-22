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

export default class BookingPage3 extends React.Component {
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
      totalAmount: "",
      perPersonAmount: ""
    };
    this.backEvent = this.backEvent.bind(this);
  }
  backEvent() {
    this.props.navigation.navigate("BookingPageSecond");
  }
  componentWillMount() {
    this.setState({ name: "Anuj Thakkar" });
    this.setState({ source: "changa , Aanand ..." });
    this.setState({ destination: "Big Bazzar , Aanand ..." });
    this.setState({ date: "25/9/2019" });
    this.setState({ time: "9:30" });
    this.setState({ selectAmOrPm: "AM" });
    this.setState({ noOfPerson: "2" });
    this.setState({ driverName: "Sukhdev Prasad ...." });
    this.setState({ autoNumber: "Gj 03 HP 2503" });
    this.setState({ totalAmount: "300" });
    this.setState({ perPersonAmount: "150" });
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "transparent",
            flex: 0.2 //change flex in andriod
          }}
        >
          <SafeAreaView style={styles.header}>
            <View style={styles.headerInnerView}>
              <View style={{ alignSelfs: "center" }}>
                <TouchableOpacity
                  onPress={this.backEvent}
                  style={{ alignSelfs: "center" }}
                >
                  <Image
                    style={styles.backImage}
                    source={require("../../assets/back1.png")}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.headerText}>Tickets</Text>
              </View>
              <View style={{ alignSelfs: "center", marginTop: "1%" }}>
                <OptionsMenu
                  button={require("../../assets/More.png")}
                  buttonStyle={styles.optionButton}
                  destructiveIndex={1}
                  options={["Help"]}
                  actions={[this.helpPost]}
                />
              </View>
            </View>
          </SafeAreaView>
          <View
            style={{
              flex: Platform.OS === "ios" ? 0.6 : 0.5,
              paddingTop: Platform.OS === "ios" ? "0%" : "1%"
            }}
          >
            <Header />
          </View>
        </View>
        {/* Ticket View */}
        <View style={styles.ticketView}>
          {/* Header View */}
          <View style={styles.ticket_headerView}>
            <View style={styles.header_confirm_logo_view}>
              <View style={styles.outter_View_Of_Confirm_Icon}>
                <Image
                  style={styles.confirm_Image}
                  source={require("../../assets/ConfirmIcon.png")}
                />
              </View>
            </View>

            <View style={styles.header_text_view}>
              <Text style={styles.headerText_Css}>Booking Confirmed</Text>
            </View>
          </View>

          <View style={styles.user_Details_View}>
            <View style={styles.nameView}>
              <View style={{ flex: 0.3 }}>
                <Text style={styles.lableText}>Name</Text>
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
                    source={require("../../assets/person.png")}
                  />
                </View>
                <View
                  style={{
                    flex: 0.9,
                    width: "100%"
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#474747" }}>
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
                  <View style={{ flex: 0.8, marginLeft: "4%" }}>
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
                  <View style={{ flex: 0.8, marginLeft: "4%" }}>
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
                      marginLeft: "4%"
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
                  <View style={{ flex: 0.8, marginLeft: "4%" }}>
                    <Text style={{ color: "#474747", fontSize: 15 }}>
                      {this.state.time}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* No of */}
            <View style={styles.nameView}>
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
                  <Text style={{ fontSize: 15, color: "#474747" }}>
                    {this.state.noOfPerson}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.2 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: "5%"
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
                    marginTop: "0%",

                    color: "#fff"
                  }}
                >
                  You Have allowed for sharing auto with another passengers
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.driver_Detail_View}>
            <View style={styles.driver_Detail_outter_View}>
              <View style={styles.driver_detail_view_1}>
                <View style={styles.Auto_driver_text_view}>
                  <Text style={styles.Auto_driver_text_Css}>Auto Driver</Text>
                </View>
                {/* <View style={styles.pipeView}></View> */}
                <View style={styles.Auto_Deiver_profile}>
                  <View
                    style={{
                      flex: 0.24,
                      marginRight: "2%",
                      // alignItems: "center",
                      justifyContent: "center"
                      // backgroundColor: "green"
                    }}
                  >
                    <Image
                      style={styles.Deiver_Profile_Image}
                      source={require("../../assets/pic.jpg")}
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
                flex: 0.34,
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "3%"
              }}
            >
              <View style={styles.driver_detail_view_1}>
                <View style={styles.Auto_driver_text_view}>
                  <Text style={styles.Auto_driver_text_Css}>
                    Fare Calculation
                  </Text>
                </View>
                {/* <View style={styles.pipeView}></View> */}
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
        </View>
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
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
            }}
          >
            <View style={{ alignSelf: "center", flexDirection: "row" }}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  alignSelf: "center"
                }}
                source={require("../../assets/cancle.png")}
              />
              <Text
                style={{ alignSelf: "center", fontSize: 20, marginLeft: "1%" }}
              >
                Cancle Tickets
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#269DF9",
    flex: Platform.OS === "ios" ? 0.4 : 0.5
  },
  headerInnerView: {
    marginTop: Platform.OS === "android" ? "7%" : " 3%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backImage: {
    height: 60,
    width: 60,
    alignSelf: "center",
    marginTop: "-18%",
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
    resizeMode: "contain",
    alignSelf: "center"
  },
  ticketView: {
    flex: 0.6,
    backgroundColor: "lightblue",
    marginLeft: "3%",
    marginRight: "3%",
    borderRadius: 20,
    marginTop: -85,
    shadowColor: "lightblue",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 1.5,
    shadowRadius: 3.84,

    elevation: 4
  },
  ticket_headerView: {
    flex: 0.08,
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
    backgroundColor: "#fff",
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
    flex: 0.4
  },
  nameView: {
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
    color: "#fff"
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
    marginTop: "5%"
  },
  driver_Detail_View: {
    marginTop: Platform.OS === "ios" ? "4%" : "6%",
    flex: 0.52,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
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
    shadowOpacity: 0.25,
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
    marginTop: "0%"
  }
});
