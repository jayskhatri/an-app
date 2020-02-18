import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Modal
} from "react-native";
import { BallIndicator } from "react-native-indicators";
import { Modal as ActivityModel } from "react-native-paper";
import OptionsMenu from "react-native-options-menu";
import Header from "../header/header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as firebase from 'firebase'
import colors from "../constants/Colors";
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
      totalAmount: "300",
      perPersonAmount: "",
      modalVisible: false,
      activityModelVisible: false
    };
    this.backEvent = this.backEvent.bind(this);
    this.handlePayModel = this.handlePayModel.bind(this);
    this.handlePayModelClose = this.handlePayModelClose.bind(this);
    this.paytmMode = this.paytmMode.bind(this);
    this.cashOnDriveMode = this.cashOnDriveMode.bind(this);
    this.calculateFare = this.calculateFare.bind(this);
  }
  backEvent() {
    this.props.navigation.navigate("BookingPageSecond");
  }
  async componentWillMount() {
    const {navigation} = this.props;
   
    // console.log('name: ',fname);
    this.setState({ name: navigation.getParam('name') });
    this.setState({ source: navigation.getParam('source') });
    this.setState({ destination: navigation.getParam('destination')});
    this.setState({ date: navigation.getParam('dateOfJourney') });
    this.setState({ time: navigation.getParam('timeOfJourney') });
    this.setState({ isAmOrPmSelect: navigation.getParam('isAmOrPmSelect')})
    this.setState({ selectAmOrPm: "AM" });
    this.setState({ switchValue: navigation.getParam('switchValue')});
    this.setState({ noOfPerson: navigation.getParam('numberOfPassenger') });
    this.setState({ driverName: "Sukhdev Prasad ...." });
    this.setState({ autoNumber: "Gj 03 HP 2503" }) ;
    this.setState({ totalAmount: "300" });
    this.setState({ perPersonAmount: "150" });
  }

  handlePayModel() {
    this.setState({ modalVisible: true });
  }
  handlePayModelClose() {
    if (!this.state.activityModelVisible) {
      this.setState({ modalVisible: false });
    }
  }

  calculateFare= async ()=>{

    let source=this.state.source;
    let destination=this.state.destination;
    let fare;

    let fareRef=firebase.database().ref('fare/'+source);
    await fareRef.once('value').then(async function(snapshot){

      fare=snapshot.child(destination).val();
      console.log('fare: ',fare);
      this.setState({
        totalAmount: fare
      })

    }.bind(this));
    this.handlePayModel();
  }

  bookNow=async ()=>{
    let user=firebase.auth().currentUser;
    await firebase.database().ref('requests/'+user.uid).set({
      DriverId:'',
      confirmation_status: false
    });
    this.props.navigation.navigate('requestConfirmationPage',{
      name : this.state.name,
      source : this.state.source,
      destination : this.state.destination,
      totalAmount : this.state.totalAmount,
      noOfPerson : this.state.noOfPerson,
      switchValue : this.state.switchValue,
      date : this.state.date,
      time : this.state.time
    });
  }

 async paytmMode() {
    // this.setState({ activityModelVisible: true });

    // write a code for paytm and then below two state can unhide and both set false and redirect
    // this.setState({ activityModelVisible: false });
    this.setState({ modalVisible: false });
    let user=firebase.auth().currentUser;
    await firebase.database().ref('requests/'+user.uid).set({
      DriverId:'',
      confirmation_status: false
    });
    this.props.navigation.navigate('requestConfirmationPage',{
      name : this.state.name,
      source : this.state.source,
      destination : this.state.destination,
      totalAmount : this.state.totalAmount,
      noOfPerson : this.state.noOfPerson,
      switchValue : this.state.switchValue,
      date : this.state.date,
      time : this.state.time
    });
  }
  cashOnDriveMode() {
    this.setState({ activityModelVisible: true });
    // write a code for paytm and then below two state can unhide and both set false and redirect
    // this.setState({ activityModelVisible: false });
    // this.setState({ modalVisible: false });
    // this.props.navigation.navigate("BookingPage4");
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#269DF9",
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
                <Text style={styles.headerText}>Continue Booking</Text>
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
                  {this.state.switchValue ? (
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
              ) : (
                <Text
                    style={{
                      fontSize: 12,
                      marginLeft: "1%",
                      marginTop: "4%",

                      color: "#fff"
                    }}
                  >
                    You Have Not allowed for sharing auto with another passengers
                  </Text>
              )}
                 
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

        <View style={styles.btn_view}>
          <TouchableOpacity
            onPress={this.calculateFare}
            style={styles.pay_btn_css}
          >
            <View style={{ alignSelf: "center", flexDirection: "row" }}>
              <Text style={styles.ride_btn_text_css}>Ride Now</Text>
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flex: 0.3,
                  position: "absolute",
                  top: 0,
                  backgroundColor: "transparent",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent"
                }}
                onTouchEnd={this.handlePayModelClose}
              ></View>
              <View style={styles.pop_up_first_view}>
                <View style={styles.pop_up_header_view}>
                  <View
                    style={{
                      flex: 0.2,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        // position: "absolute",
                        // bottom: "2%",
                        borderBottomWidth: 2,
                        borderColor: "#000"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          textAlignVertical: "bottom"
                        }}
                      >
                        Pay
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.6,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <View style={{ flex: 0.25 }}>
                      <Image
                        style={styles.round_inner_image_css}
                        source={require("../../assets/round_Pay.png")}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <View
                        style={{
                          alignSelf: "center",
                          borderBottomWidth: 4,
                          borderColor: "#269DF6"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 50,
                            color: "#269DF6"
                          }}
                        >
                          RS.{this.state.totalAmount}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 0.25 }}>
                      <Image
                        style={styles.round_inner_image_css}
                        source={require("../../assets/round_Pay.png")}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.2,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        borderBottomWidth: 2,
                        borderColor: "#000"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20
                        }}
                      >
                        Via
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.payment_mode_view}>
                  <View style={styles.first_mode_view}>
                    <View style={styles.payment_mode_inner_view_1}>
                      <View style={styles.first_payment_mode_text_view}>
                        <Text style={styles.first_payment_mode_text_Css}>
                          online
                        </Text>
                      </View>
                      <View style={styles.first_payment_mode_icon_view}>
                        <View
                          style={{
                            flex: 1,
                            marginRight: "2%",
                            // alignItems: "center",
                            justifyContent: "center"
                            // backgroundColor: "green"
                          }}
                        >
                          <TouchableOpacity onPress={this.paytmMode}>
                            <Image
                              style={styles.first_payment_mode_Image}
                              source={require("../../assets/paytm_icon.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.first_mode_view}>
                    <View style={styles.payment_mode_inner_view_2}>
                      <View style={styles.first_payment_mode_text_view}>
                        <Text style={styles.first_payment_mode_text_Css}>
                          Offline
                        </Text>
                      </View>
                      <View style={styles.first_payment_mode_icon_view}>
                        <View
                          style={{
                            flex: 1,
                            marginRight: "2%",
                            // alignItems: "center",
                            justifyContent: "center"
                            // backgroundColor: "green"
                          }}
                        >
                          {/* <Image
                            style={styles.first_payment_mode_Image}
                            source={require("../../assets/paytm_icon.png")}
                          /> */}
                          <TouchableOpacity onPress={this.cashOnDriveMode}>
                            <Text style={styles.second_payment_mode_text_css}>
                              Cash On Drive
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <ActivityModel
          animationType="slide"
          transparent={false}
          visible={this.state.activityModelVisible}
        >
          <View
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <View
              style={{
                height: "50%",
                width: "100%",
                backgroundColor: colors.light.dark_blue,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  height: "30%",
                  width: "60%",
                  borderRadius: 25,
                  backgroundColor: colors.light.white_color,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <BallIndicator color={colors.light.black_color} />
              </View>
            </View>
          </View>
        </ActivityModel>
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
    flex: 0.28,
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
  payment_mode_view: {
    flex: 0.6,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "100%",
    height: "100%"
  },
  first_mode_view: {
    flex: 0.38,
    alignItems: "center",
    justifyContent: "center"
  },
  payment_mode_inner_view_1: {
    width: "85%",
    height: "60%",
    marginLeft: "2%",
    marginRight: "2%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    alignSelf: "center",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 13
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4
  },
  first_payment_mode_text_Css: {
    fontSize: 18,
    color: "#474747"
  },
  first_payment_mode_text_view: {
    flex: 0.37,
    height: "80%",
    borderRightWidth: 1.5,
    justifyContent: "center",
    textAlign: "left",
    paddingLeft: "2%"
  },
  first_payment_mode_icon_view: {
    flex: 0.59,
    height: "80%",
    flexDirection: "row",
    paddingRight: "2%",
    paddingLeft: "4%",
    backgroundColor: "transparent"
  },
  first_payment_mode_Image: {
    height: "80%",
    alignSelf: "center",
    resizeMode: "contain"
  },
  second_payment_mode_text_css: {
    fontSize: 25,
    color: "blue",
    textAlign: "center"
  },
  round_inner_image_css: {
    resizeMode: "contain",
    width: "50%",
    height: "50%",
    alignSelf: "center"
  },
  payment_mode_inner_view_2: {
    width: "85%",
    height: "60%",
    marginLeft: "2%",
    marginRight: "2%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 13
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4
  },
  btn_view: {
    flex: 0.43,
    alignItems: "center",
    justifyContent: "center"
  },
  pay_btn_css: {
    width: "65%",
    height: "15%",
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
  ride_btn_text_css: {
    alignSelf: "center",
    fontSize: 28,
    marginLeft: "1%",
    color: "#269DF9"
  },
  pop_up_first_view: {
    flex: 0.7,
    backgroundColor: "#fff",
    width: "100%",
    height: "55%",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    borderWidth: 1.5,
    borderColor: "#000",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  pop_up_header_view: {
    flex: 0.4,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
});
