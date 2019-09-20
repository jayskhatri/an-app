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
    this.backEvent = this.backEvent.bind(this);
  }
  backEvent() {
    this.props.navigation.navigate("BookingPageSecond");
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: Platform.OS === "ios" ? 0.2 : 0.08 //change flex in andriod
          }}
        >
          <SafeAreaView style={styles.header}>
            <View>
              <TouchableOpacity onPress={this.backEvent}>
                <Image
                  style={styles.backImage}
                  source={require("../../assets/back1.png")}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.headerText}>Tickets</Text>
            </View>
            <View>
              <OptionsMenu
                button={require("../../assets/More.png")}
                buttonStyle={styles.optionButton}
                destructiveIndex={1}
                options={["Help"]}
                actions={[this.helpPost]}
              />
            </View>
          </SafeAreaView>
          <Header />
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
                <View style={{ flex: 0.9 }}>
                  <Text style={styles.text_Of_Details}>Anuj Thakkar</Text>
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
                      <Text style={styles.text_Of_Details}>Changa , Aanad</Text>
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
                        Big Bazar , Aanad
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
                  <View style={{ flex: 0.8, marginLeft: "4%" }}>
                    <ScrollView horizontal={true}>
                      <Text style={styles.text_Of_Details}>25/9/2019</Text>
                    </ScrollView>
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
                    <ScrollView horizontal={true}>
                      <Text style={styles.text_Of_Details}>9:30 AM</Text>
                    </ScrollView>
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
                  <Text style={styles.text_Of_Details}>2</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: "10%"
              }}
            >
              <Image
                style={styles.sharingIcon}
                source={require("../../assets/Solid.png")}
              />
              <Text style={{ fontSize: 12, marginLeft: "2%" }}>
                You Have allowed for sharing auto with another passengers
              </Text>
            </View>
          </View>
          <View style={styles.driver_Detail_View}>
            <View style={styles.driver_Detail_outter_View}>
              <View style={styles.driver_detail_view_1}>
                <View style={styles.Auto_driver_text_view}>
                  <Text style={styles.Auto_driver_text_Css}>Auto Driver</Text>
                </View>
                <View style={styles.pipeView}></View>
                <View style={styles.Auto_Deiver_profile}>
                  <View>
                    <Image
                      style={styles.Deiver_Profile_Image}
                      source={require("../../assets/Component.png")}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={styles.Deiver_name_text_css}>
                      Sukhdev Prasad
                    </Text>
                    <View style={{ flexDirection: "row" }}>
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
                <View style={styles.pipeView}></View>
                <View style={styles.Auto_number_view}>
                  <View style={styles.Auto_number_View_Css}>
                    <Text style={styles.Auto_number_text_css}>
                      Gj 03 HP 2503
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 0.34,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View style={styles.driver_detail_view_1}>
                <View style={styles.Auto_driver_text_view}>
                  <Text style={styles.Auto_driver_text_Css}>
                    Fare Calculation
                  </Text>
                </View>
                <View style={styles.pipeView}></View>
                <View style={styles.Auto_number_view}>
                  <View style={styles.Auto_number_View_Css}>
                    <Text style={styles.Auto_number_text_css}>Rs. 300</Text>
                  </View>
                  <Text>Rs. 150 per person</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              height: "30%",
              borderWidth: 0.5,
              borderRadius: 20,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center"
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
    flex: 1,
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
  ticketView: {
    flex: 0.6,
    backgroundColor: "lightblue",
    marginLeft: "3%",
    marginRight: "3%",
    borderRadius: 20,
    marginTop: "-20%"
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
    width: "90%",
    height: "85%",
    marginLeft: "8%",
    marginTop: "8%",
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
    position: "absolute",
    left: "13%"
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
    fontSize: 10
  },
  lable_Image: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    left: 0
    // backgroundColor: "yellow"
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
    position: "absolute",
    alignSelf: "center",
    position: "absolute",
    left: "2%",
    bottom: "8%"
  },
  source_destinatio_view: {
    flex: 0.2,
    flexDirection: "row",
    width: "85%",
    marginLeft: "8%",
    marginTop: "5%"
    // backgroundColor: "red"
  },
  driver_Detail_View: {
    flex: 0.38,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: "-3%",
    marginBottom: "2%"
  },
  driver_Detail_outter_View: {
    flex: 0.33,
    alignItems: "center",
    justifyContent: "center"
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
    justifyContent: "center"
  },
  Auto_driver_text_view: {
    flex: 0.37,
    alignSelf: "center"
  },
  Auto_driver_text_Css: {
    fontSize: 20,
    marginLeft: "8%"
  },
  pipeView: {
    flex: 0.04,
    borderLeftWidth: 1,
    height: "80%"
  },
  Auto_Deiver_profile: {
    flex: 0.59,
    flexDirection: "row"
  },
  Deiver_Profile_Image: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  Deiver_name_text_css: {
    fontSize: 18,
    alignSelf: "center",
    marginLeft: "2%"
  },
  varified_text_css: {
    fontSize: 10,
    marginLeft: "2%"
  },
  verifiedIcon: {
    marginTop: Platform.OS === "android" ? "0%" : "0%",
    marginLeft: "-2%",
    width: 30,
    height: 15,
    borderRadius: Platform.OS === "ios" ? 20 : 2,
    resizeMode: "contain"
  },
  Auto_number_view: {
    flex: 0.59
  },
  Auto_number_View_Css: {
    borderBottomWidth: 0.5,
    width: 200
  },
  Auto_number_text_css: {
    width: 160,
    fontSize: 18
  },
  sharingIcon: {
    height: 15,
    width: 12
    // alignSelf: "center"
  }
});
