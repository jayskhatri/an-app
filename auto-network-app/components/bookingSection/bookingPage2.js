import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  KeyboardAvoidingView,
  Picker,
  TextInput,
  DatePickerIOS,
  TimePickerAndroid,
  DatePickerAndroid,
  TouchableOpacity,
  Switch
} from "react-native";
import Modal from "react-native-modal";
import OptionsMenu from "react-native-options-menu";
import Header from "../header/header";

export default class profilePageSecond extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "Changa",
      destination: "Aanad",
      switchValue: false,
      chosenDate: new Date(),
      dateOfJourney: "Enter date",
      timeOfJourney: "Time",
      isDateModalVisible: false,
      isTimeModalVisible: false,
      isDropDownModelVisible: false,
      numberOfPassenger: "Number Of passenger",
      currentDate: ""
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.setDate = this.setDate.bind(this);
    this.dateConfirm = this.dateConfirm.bind(this);
    this.confirmTime = this.confirmTime.bind(this);
    this.presentTimeEvent = this.presentTimeEvent.bind(this);
    this.presentDateEvent = this.presentDateEvent.bind(this);
    this.singlePersonEvent = this.singlePersonEvent.bind(this);
    this.twoPersonEvent = this.twoPersonEvent.bind(this);
    this.handleSetPassenger = this.handleSetPassenger.bind(this);
    this.backEvent = this.backEvent.bind(this);
    this.helpPost = this.helpPost.bind(this);
    this.nextEvent = this.nextEvent.bind(this);
  }

  componentWillMount() {
    // write a code fatch source and destination
    // var date = new Date().getDate();
    // var month = new Date().getMonth() + 1;
    // var year = new Date().getFullYear();
    // this.setState({ currentDate: date + " / " + month + " / " + year });
  }
  toggleSwitch(e) {
    if (this.state.switchValue == true) {
      this.setState({ switchValue: false });
    } else {
      this.setState({ switchValue: true });
    }
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  toggleDateModal = () => {
    this.setState({ isDateModalVisible: !this.state.isDateModalVisible });
  };
  toggleDropDownModal = () => {
    this.setState({
      isDropDownModelVisible: !this.state.isDropDownModelVisible
    });
  };
  toggleTimeModal = () => {
    this.setState({ isTimeModalVisible: !this.state.isTimeModalVisible });
  };

  opeanDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        year: "",
        month: "",
        day: ""
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        var fullDate = day + " / " + month + " / " + year;
        this.setState({ dateOfJourney: fullDate });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  opeanTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 0,
        minute: 0
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        var fullTime = hour + " : " + minute;
        this.setState({ timeOfJourney: fullTime });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  dateConfirm() {
    const dd = this.state.chosenDate.getDate();
    const mm = this.state.chosenDate.getMonth() + 1;
    const yyyy = this.state.chosenDate.getFullYear();
    const fullDate = dd + "/" + mm + "/" + yyyy;
    this.setState({ dateOfJourney: fullDate });
    this.setState({ isDateModalVisible: false });
  }
  confirmTime() {
    const min = this.state.chosenDate.getMinutes();
    const hh = this.state.chosenDate.getHours();
    const fullTime = hh + " : " + min;
    this.setState({ timeOfJourney: fullTime });
    this.setState({ isTimeModalVisible: false });
  }
  presentTimeEvent() {
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    const time = hours + " : " + min;
    this.setState({ timeOfJourney: time });
  }
  presentDateEvent() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var fullDate = date + " / " + month + " / " + year;
    this.setState({ dateOfJourney: fullDate });
  }
  tomorrowDateEvent() {
    var date = new Date().getDate() + 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    // if(date>)
  }
  singlePersonEvent(e) {
    var Passenger = "1";
    this.setState({ numberOfPassenger: Passenger });
  }
  twoPersonEvent(e) {
    var Passenger = "2";
    this.setState({ numberOfPassenger: Passenger });
  }
  handleSetPassenger(e) {
    const temp = e.nativeEvent.text;
    this.setState({ numberOfPassenger: temp });
  }
  backEvent() {
    this.props.navigation.navigate("BookingPageOne");
  }
  helpPost() {
    console.log("help");
  }
  nextEvent() {
    console.log("next Event");
  }

  render() {
    let min = new Date();
    let max = new Date();
    return (
      <View style={styles.container}>
        <View style={{ flex: Platform.OS === "ios" ? 0.1 : 0.08 }}>
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
              <Text style={styles.headerText}>Continue Booking</Text>
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
        </View>
        <View style={styles.inputView}>
          <View style={styles.S_D_view}>
            <View style={styles.sourceTODestinationLine}>
              <Image
                style={styles.sourceTOdestinationImage}
                source={require("../../assets/so_de_icon_side_line.png")}
              />
            </View>
            <View style={styles.S_D_input_view}>
              <View style={styles.s_input_view}>
                <View style={styles.outter_view_s_input}>
                  <TextInput
                    style={styles.signInTextInputOne}
                    placeholder="choose starting point, or click on the map  "
                    placeholderTextColor="#fff"
                    fontSize={14}
                    value={this.state.source}
                    editable={false}
                  />
                </View>
              </View>
              <View style={styles.d_input_view}>
                <View style={styles.outter_view_s_input}>
                  <TextInput
                    style={styles.signInTextInputOne}
                    placeholder="choose starting point, or click on the map  "
                    placeholderTextColor="#fff"
                    fontSize={14}
                    value={this.state.destination}
                    editable={false}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.Input_Date_Time_view}>
            <View style={styles.outter_view_Input_Date_Time}>
              <View style={styles.header_view_D_T}>
                <View style={styles.header_DT_logo_view}>
                  <View style={styles.outterViewOfDtIcon}>
                    <Image
                      style={styles.date_time_Image}
                      source={require("../../assets/ccalender_and_clock_icon.png")}
                    />
                  </View>
                </View>
                <View style={styles.header_DT_text_view}>
                  <Text style={styles.header_D_T_text}>
                    Journey Date And Time
                  </Text>
                </View>
              </View>
              <View style={styles.enter_Date_Time_View}>
                <View style={{ flex: 0.1 }}>
                  <Image
                    style={styles.calenderIcon}
                    source={require("../../assets/calender_ion.png")}
                  />
                </View>

                <View
                  style={{
                    flex: 0.5
                  }}
                >
                  <View
                    style={{
                      flex: 0.4,
                      position: "absolute",
                      bottom: 3
                    }}
                  >
                    {Platform.OS === "ios" ? (
                      <TouchableOpacity
                        onPress={this.toggleDateModal}
                        style={styles.enterDateBtnCss}
                      >
                        <Text style={styles.text}>
                          {this.state.dateOfJourney}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={this.opeanDatePicker}
                        style={styles.enterDateBtnCss}
                      >
                        <Text style={styles.text}>
                          {" "}
                          {this.state.dateOfJourney}{" "}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 0.6,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Modal
                      isVisible={this.state.isDateModalVisible}
                      animationIn="wobble"
                      animationOut="fadeOutDownBig"
                      animationInTiming={1000}
                      animationOutTiming={1000}
                      backdropTransitionInTiming={200}
                      backdropTransitionOutTiming={1000}
                      style={{
                        height: "100%",
                        width: "100%",
                        alignSelf: "center"
                      }}
                    >
                      <View style={styles.modelInnerView1}>
                        <View style={styles.modelInnerView2}>
                          <DatePickerIOS
                            date={this.state.chosenDate}
                            onDateChange={this.setDate}
                            mode="date"
                            minimumDate={min}
                            // maximumDate={max + 3}
                            style={{
                              borderRadius: 25,
                              marginLeft: "2%",
                              marginRight: "2%",
                              backgroundColor: "#fff"
                            }}
                          />
                          <TouchableOpacity
                            style={styles.modalBtnCss}
                            onPress={this.dateConfirm}
                          >
                            <Text style={{ fontSize: 25, alignSelf: "center" }}>
                              confirm
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalBtnCss}
                            onPress={this.toggleDateModal}
                          >
                            <Text style={{ fontSize: 25, alignSelf: "center" }}>
                              cancle
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>
                <View
                  style={{ flex: 0.4, flexDirection: "row", marginLeft: "5%" }}
                >
                  <TouchableOpacity
                    onPress={this.presentDateEvent}
                    style={{ width: "40%" }}
                  >
                    <Text style={styles.date_today_today}>Today</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 3,
                      marginLeft: "33%",
                      color: "#fff"
                    }}
                  >
                    {" "}
                    |{" "}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: "5%",
                      // backgroundColor: "blue",
                      width: "100%"
                    }}
                  >
                    <Text style={styles.date_today_tomorrow}>Tomorrow</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* --- */}

              <View style={styles.enter_Date_Time_View}>
                <View style={{ flex: 0.1 }}>
                  <Image
                    style={styles.calenderIcon}
                    source={require("../../assets/clock_icon.png")}
                  />
                </View>

                <View
                  style={{
                    flex: 0.5
                  }}
                >
                  <View
                    style={{
                      flex: 0.4,
                      position: "absolute",
                      bottom: 3
                    }}
                  >
                    {Platform.OS === "ios" ? (
                      <TouchableOpacity
                        onPress={this.toggleTimeModal}
                        style={styles.enterDateBtnCss}
                      >
                        <Text style={styles.text}>
                          {this.state.timeOfJourney}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={this.opeanTimePicker}
                        style={styles.enterDateBtnCss}
                      >
                        <Text style={styles.text}>
                          {this.state.timeOfJourney}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 0.6,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Modal
                      isVisible={this.state.isTimeModalVisible}
                      animationIn="wobble"
                      animationOut="fadeOutDownBig"
                      animationInTiming={1000}
                      animationOutTiming={1000}
                      backdropTransitionInTiming={200}
                      backdropTransitionOutTiming={1000}
                      style={{
                        height: "100%",
                        width: "100%",
                        alignSelf: "center"
                      }}
                    >
                      <View style={styles.modelInnerView1}>
                        <View style={styles.modelInnerView2}>
                          <DatePickerIOS
                            date={this.state.chosenDate}
                            onDateChange={this.setDate}
                            mode="time"
                            style={{
                              borderRadius: 25,
                              marginLeft: "2%",
                              marginRight: "2%",
                              backgroundColor: "#fff"
                            }}
                          />
                          <TouchableOpacity
                            style={styles.modalBtnCss}
                            onPress={this.confirmTime}
                          >
                            <Text style={{ fontSize: 25, alignSelf: "center" }}>
                              confirm
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalBtnCss}
                            onPress={this.toggleTimeModal}
                          >
                            <Text style={{ fontSize: 25, alignSelf: "center" }}>
                              cancle
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.4,
                    flexDirection: "row",
                    marginLeft: "5%"
                  }}
                >
                  <TouchableOpacity
                    onPress={this.presentTimeEvent}
                    style={{ width: "100%" }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        right: 31,
                        bottom: 0
                      }}
                    >
                      <Text style={styles.date_today_today}>Now</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.Input_Date_Time_view}>
            <View style={styles.outter_view_Input_Date_Time}>
              <View style={styles.header_view_D_T}>
                <View style={styles.header_DT_logo_view}>
                  <View style={styles.outterViewOfDtIcon}>
                    <Image
                      style={styles.date_time_Image}
                      source={require("../../assets/group_of_ppl.png")}
                    />
                  </View>
                </View>
                <View style={styles.header_DT_text_view}>
                  <Text style={styles.header_Time_text}>Passenger Details</Text>
                </View>
              </View>
              <View style={styles.enter_Date_Time_View}>
                <View style={{ flex: 0.1, flexDirection: "row" }}>
                  <Image
                    style={styles.personIcon}
                    source={require("../../assets/person.png")}
                  />
                </View>
                <KeyboardAvoidingView style={{ flex: 0.5 }}>
                  <View style={{ position: "absolute", bottom: 5 }}>
                    <TouchableOpacity
                      onPress={this.toggleDropDownModal}
                      style={styles.enterDateBtnCss}
                    >
                      <Text style={styles.text}>
                        {" "}
                        {this.state.numberOfPassenger}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 0.6,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Modal
                      isVisible={this.state.isDropDownModelVisible}
                      animationIn="wobble"
                      animationOut="fadeOutDownBig"
                      animationInTiming={1000}
                      animationOutTiming={1000}
                      backdropTransitionInTiming={200}
                      backdropTransitionOutTiming={1000}
                      style={{
                        height: "100%",
                        width: "100%",
                        alignSelf: "center"
                      }}
                    >
                      <View style={styles.modelInnerView1}>
                        <View style={styles.modelInnerView2}>
                          <Picker
                            selectedValue={this.state.numberOfPassenger}
                            style={{
                              marginTop: "8%",
                              height: Platform.OS === "ios" ? "40%" : "20%",
                              backgroundColor: "#fff",
                              borderRadius: 15,
                              marginLeft: "3%",
                              marginRight: "3%",
                              paddingBottom: "2%"
                            }}
                            onValueChange={(itemValue, itemIndex) =>
                              this.setState({ numberOfPassenger: itemValue })
                            }
                          >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                          </Picker>

                          <TouchableOpacity
                            style={styles.modalBtnCss}
                            onPress={this.toggleDropDownModal}
                          >
                            <Text style={{ fontSize: 25, alignSelf: "center" }}>
                              Confirm
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalBtnCss}
                            onPress={this.toggleDropDownModal}
                          >
                            <Text style={{ fontSize: 25, alignSelf: "center" }}>
                              Cancle
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </KeyboardAvoidingView>
                <View style={{ flex: 0.4, flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      bottom: 5,
                      marginLeft: "31%"
                    }}
                  >
                    <TouchableOpacity onPress={this.singlePersonEvent}>
                      <Text style={{ color: "#fff" }}>Single</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "#fff" }}> | </Text>
                    <TouchableOpacity onPress={this.twoPersonEvent}>
                      <Text style={{ color: "#fff" }}>Two</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.enter_Date_Time_View}>
                <View style={{ flex: 0.1, flexDirection: "row" }}>
                  <Image
                    style={styles.personIcon}
                    source={require("../../assets/Solid.png")}
                  />
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.sharing_text_css}>
                    {" "}
                    Allow For Sharing Auto{" "}
                  </Text>
                </View>
                <View style={{ flex: 0.3, flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      bottom: 5,
                      marginLeft: "31%"
                    }}
                  >
                    <Switch
                      style={{ position: "absolute", bottom: 3 }}
                      onValueChange={this.toggleSwitch}
                      value={this.state.switchValue}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.2 }}>
          <View style={{ flex: 0.5 }}>
            <Header />
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              onPress={this.nextEvent}
              style={{
                backgroundColor: "#fff",
                borderColor: "#000",
                borderWidth: 0.5,
                width: "30%",
                alignItems: "center",
                justifyContent: "center",
                height: "40%",
                borderRadius: 20,
                alignSelf: "center"
              }}
            >
              <Text
                style={{ alignSelf: "center", fontSize: 23, color: "#269DF6" }}
              >
                Next
              </Text>
            </TouchableOpacity>
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
  inputView: {
    flex: 0.7,
    backgroundColor: "#269DF9"
  },
  S_D_view: {
    flex: 0.33,
    //   backgroundColor:"orange",
    flexDirection: "row"
  },
  sourceTODestinationLine: {
    flex: 0.15,
    // backgroundColor:"red",
    alignItems: "center",
    justifyContent: "center"
  },
  sourceTOdestinationImage: {
    height: "50%",
    width: 60,
    alignSelf: "center",
    resizeMode: "contain"
  },
  S_D_input_view: {
    flex: 0.85,
    flexDirection: "column"
  },
  s_input_view: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  d_input_view: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  outter_view_s_input: {
    borderWidth: 0.5,
    height: "38%",
    width: "90%",
    position: "absolute",
    left: 0,
    borderRadius: 25,
    borderColor: "#fff"
  },
  signInTextInputOne: {
    paddingLeft: "2%",
    width: "95%",
    marginLeft: "3%",
    marginRight: "3%",
    position: "absolute",
    bottom: Platform.OS === "ios" ? 6 : 3,
    borderRadius: 15,
    borderBottomColor: "#988c8c",
    borderBottomWidth: 1,
    color: "#4d4d4d"
  },
  Input_Date_Time_view: {
    flex: 0.35,
    backgroundColor: "#269DF6",
    alignItems: "center",
    justifyContent: "center"
  },
  outter_view_Input_Date_Time: {
    width: "90%",
    height: "85%",
    padding: "2%",
    backgroundColor: "lightblue",
    borderRadius: 25
  },
  header_view_D_T: {
    flex: 0.25,
    backgroundColor: "lightblue",
    flexDirection: "row",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "space-between"
  },
  date_time_Image: {
    height: 30,
    width: 30,
    alignSelf: "center",
    resizeMode: "contain"
  },
  header_DT_logo_view: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center"
  },
  outterViewOfDtIcon: {
    width: 40,
    padding: "5%",
    backgroundColor: "#269DF9",
    borderRadius: 10
  },
  header_DT_text_view: {
    flex: 0.85,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginLeft: "2%",
    marginRight: "2%"
  },
  header_D_T_text: {
    alignSelf: "center",
    color: "#000",
    fontSize: 20,
    position: "absolute",
    left: "8%"
  },
  header_Time_text: {
    alignSelf: "center",
    color: "#000",
    fontSize: 20,
    position: "absolute",
    left: "16%"
  },
  enter_Date_Time_View: {
    flex: 0.3,
    marginTop: "2%",
    marginLeft: "10%",
    marginRight: "5%",
    borderBottomWidth: 1.5,
    borderBottomColor: "#fff",
    flexDirection: "row"
  },
  date_today_tomorrow: {
    color: "#fff",
    position: "absolute",
    bottom: 3
  },
  date_today_today: {
    position: "absolute",
    bottom: 3,
    color: "#fff"
  },
  timeInputView: {},
  personIcon: {
    height: 20,
    width: 15,
    position: "absolute",
    bottom: 8,
    resizeMode: "contain"
  },
  numberOfPassenger: {
    position: "absolute",
    bottom: 5
  },
  sharing_text_css: {
    fontSize: 14,
    position: "absolute",
    bottom: 5,
    color: "#454647",
    marginLeft: "-2%"
  },
  modalBtnCss: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "3%",
    marginRight: "3%",
    height: "11%",
    marginTop: "1%",
    backgroundColor: "#fff"
  },
  enterDateBtnCss: {
    height: 20
  },
  calenderIcon: {
    height: 20,
    width: 15,
    position: "absolute",
    bottom: 5,
    resizeMode: "contain"
  },
  modelInnerView2: {
    alignSelf: "center",
    width: "100%"
  },
  modelInnerView1: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  text: {
    fontSize: 14,
    color: "#454647"
  }
});
