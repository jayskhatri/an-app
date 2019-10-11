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
import DatePicker from "react-native-datepicker";

export default class BookingPageSecond extends React.Component {
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
      currentDate: "",
      fullAuto: false,
      tempPassenger: "",
      isApOrPmSelect: ""
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
    this.toggleDropDownConfirmModal = this.toggleDropDownConfirmModal.bind(this);
    this.toggleDropDownCancleModal = this.toggleDropDownCancleModal.bind(this);
    this.toggleDropDownModal = this.toggleDropDownModal.bind(this);
  }

  async componentWillMount() {

    const {navigation} = this.props;
    this.setState({
      source:navigation.getParam("source"),
      destination:navigation.getParam("destination")
    })
    
    console.log('source naims: ',navigation.getParam('source'));
    let user=firebase.auth().currentUser;
    let userRef=await firebase.database().ref('Passengers/'+user.uid+'/personal_details/first_name/');
    let fname=''
    await userRef.once('value').then(async(snapshot)=>{
       fname = snapshot.val();
       console.log("name2:",fname );
    });
    this.setState({
      name:fname
    })
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
  toggleTimeModal = () => {
    this.setState({ isTimeModalVisible: !this.state.isTimeModalVisible });
  };
  toggleDropDownModal = () => {
    this.setState({
      isDropDownModelVisible: !this.state.isDropDownModelVisible
    });
  };
  toggleDropDownConfirmModal = () => {
    console.log(
      "toggleDropDownConfirmModal: temp Passenger: ",
      this.state.tempPassenger
    );
    const temp = this.state.tempPassenger;
    this.setState({ numberOfPassenger: temp });
    console.log("toggle num of passsenger: ", this.state.numberOfPassenger);
    if (this.state.numberOfPassenger == "6") {
      this.setState({ fullAuto: true });
    } else {
      this.setState({ fullAuto: false, switchValue: false });
    }
    this.setState({
      isDropDownModelVisible: !this.state.isDropDownModelVisible
    });

  };

  toggleDropDownCancleModal = () => {
    this.setState({
      isDropDownModelVisible: !this.state.isDropDownModelVisible
    });
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
        var h = hour;
        if (h > 12) {
          console.log("--");
          h = h - 12;
          this.setState({ isApOrPmSelect: " PM" });
          var fullTime = h + " : " + minute + " " + this.state.isApOrPmSelect;
        } else {
          this.setState({ isApOrPmSelect: " AM" });
          var fullTime = h + " : " + minute + " " + this.state.isApOrPmSelect;
        }

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
  async nextEvent() {
    // console.log("next Event");

    this.props.navigation.navigate("bookingPage3",{
      source:this.state.source,
      destination:this.state.destination,
      dateOfJourney:this.state.dateOfJourney,
      timeOfJourney:this.state.timeOfJourney,
      numberOfPassenger:this.state.numberOfPassenger,
      switchValue:this.state.switchValue,
      isAmOrPmSelect:this.state.isAmOrPmSelect,
      name:this.state.name
  })
}

  render() {
    let min = new Date();
    let max = new Date();
    return (
      <View style={styles.container}>
        <View
        style={{
            width:"100%",
            flex:0.035,
            backgroundColor:"#269DF9"
        }}/>
        <SafeAreaView
        style={{
          flex: Platform.OS === "ios" ? 0.08 : 0.08,
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center",
          backgroundColor: "#269DF9",
          }}>
              <TouchableOpacity
                style={{
                  flex:0.1,
                  height:"100%",
                  alignItems:"center",
                  justifyContent:"center",
                }}
                onPress={this.backEvent}>
                  <Image
                    style={{
                      maxHeight:60,
                      maxWidth:60,
                      resizeMode:"contain",
                    }}
                    source={require("../../assets/back1.png")}
                  />
              </TouchableOpacity>
              <View
              style={{
                flex:0.8,
                alignItems:"center",
                justifyContent:"center"
              }}
              >
              <Text style={{
                alignItems:"center",
                justifyContent:"center",
                color:"#fff",
                textAlignVertical:"center",
                fontSize:22
              }}>Book Your Tickets</Text>
            </View>
            <View
             style={{
              flex:0.1,
              height:"100%",
              alignItems:"center",
              justifyContent:"center"
            }}>
              <OptionsMenu
                button={require("../../assets/More.png")}
                buttonStyle={{
                  maxHeight:30,
                    maxWidth:30,
                    resizeMode:"contain",
                    alignItems:"center",
                    justifyContent:"center"
                }}
                destructiveIndex={1}
                options={["Edit", "Delete", "Cancel"]}
                actions={[this.editPost, this.deletePost]}
              />
            </View>
        </SafeAreaView>


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


          <View style={{
            backgroundColor: "#269DF6",
            flex:0.33,
            alignItems:"center",
            justifyContent: "center",
          }}>
            <View style={{
               width: "90%",
               height: "90%",
               backgroundColor: "lightblue",
               borderRadius: 15,
               alignItems:"center",
               justifyContent:"center"
            }}>
              <View style={{
                flex: 0.3,
                flexDirection: "row",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                justifyContent: "space-between",
                alignItems:"center",
              }}>
                <View style={{
                  flex: 0.10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "#269DF9",
                }}>
                    <Image
                      style={{
                        maxHeight: 30,
                        maxWidth:30,
                        resizeMode: 'center'
                      }}
                      source={require("../../assets/ccalender_and_clock_icon.png")}
                    />
                  </View>

                <View style={{
                   flex: 0.85,
                   alignItems: "center",
                   justifyContent: "center",
                   borderBottomWidth: 2,
                   borderBottomColor: "#fff",
                  }}>
                  <Text style={{
                    color: "#000",
                    fontSize: 20,
                  }}>Journey Date And Time
                  </Text>
                </View>
              </View>

              <View style={{
                flex: 0.3,
                marginLeft: "10%",
                marginRight: "2.5%",
                borderBottomWidth: 1.5,
                borderBottomColor: "#fff",
                flexDirection: "row",
              }}>
                <View style={{
                  flex: 0.1,
                  alignItems:"flex-start",
                  justifyContent:"flex-end",
                 }}>
                  <Image
                    style={{
                      flex:1,
                      maxHeight: 25,
                      maxWidth: 20,
                      resizeMode: "contain",
                      marginBottom:"2%",
                    }}
                    source={require("../../assets/calender_ion.png")}
                  />
                </View>

                    {Platform.OS === "ios" ? (
                      <TouchableOpacity
                        onPress={this.toggleDateModal}
                        style={{
                          flex:0.5,
                          width:"100%",
                          height:"100%",
                          flexDirection:"row",
                          alignItems:"flex-end",
                          justifyContent:"flex-start",
                        }}>
                        <Text style={styles.text}>
                          {this.state.dateOfJourney}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={this.opeanDatePicker}
                        style={{
                          flex:0.5,
                          width:"100%",
                          height:"100%",
                          flexDirection:"row",
                          alignItems:"flex-end",
                          justifyContent:"flex-start",
                        }}
                      >
                        <Text style={styles.text}>
                          {this.state.dateOfJourney}
                        </Text>
                      </TouchableOpacity>
                    )}

                  <View
                    style={{
                      flex: 0,
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

                <View style={{
                  flex: 0.4,
                  flexDirection: "row",
                  alignItems:"flex-end",
                  justifyContent:"center"
                  }}>
                  <TouchableOpacity
                    onPress={this.presentDateEvent}
                  >
                    <Text style={{
                      color: "#fff"
                    }}>
                      Today</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#fff"
                    }}
                  >
                    {" "}
                    |{" "}
                  </Text>
                  <TouchableOpacity>
                    <Text style={{
                      color: "#fff"
                    }}>
                      Tomorrow</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{
                flex: 0.3,
                marginLeft: "10%",
                marginRight: "2.5%",
                borderBottomWidth: 1.5,
                borderBottomColor: "#fff",
                flexDirection: "row",
              }}>
              <View style={{
                  flex: 0.1,
                  alignItems:"flex-start",
                  justifyContent:"flex-end",
                 }}>
                  <Image
                    style={{
                      flex:1,
                      maxHeight: 25,
                      maxWidth: 20,
                      resizeMode: "contain",
                      marginBottom:"2%",
                    }}
                    source={require("../../assets/clock_icon.png")}
                  />
                </View>

                    {Platform.OS === "ios" ? (
                      <TouchableOpacity
                        onPress={this.toggleTimeModal}
                        style={{
                          flex:0.7,
                          width:"100%",
                          height:"100%",
                          flexDirection:"row",
                          alignItems:"flex-end",
                          justifyContent:"flex-start",
                        }}
                      >
                        <Text style={styles.text}>
                          {this.state.timeOfJourney}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={this.opeanTimePicker}
                        style={{
                          flex:0.7,
                          width:"100%",
                          height:"100%",
                          flexDirection:"row",
                          alignItems:"flex-end",
                          justifyContent:"flex-start",
                        }}
                      >
                        <Text style={styles.text}>
                          {this.state.timeOfJourney}
                        </Text>
                      </TouchableOpacity>
                    )}

                  <View
                    style={{
                      flex: 0,
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

                  <TouchableOpacity
                    onPress={this.presentTimeEvent}
                    style={{
                      flex: 0.2,
                      flexDirection:"row",
                      width: "100%",
                      alignItems:"flex-end",
                      justifyContent:"center",
                      height:"100%"
                   }}>
                      <Text style={{
                        color: "#fff"
                        }}>
                          Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>


            <View style={{
            backgroundColor: "#269DF6",
            flex:0.33,
            alignItems:"center",
            justifyContent: "center",
            }}>
            <View style={{
               width: "90%",
               height: "90%",
               backgroundColor: "lightblue",
               borderRadius: 15,
               alignItems:"center",
               justifyContent:"center"
            }}>
              <View style={{
                flex: 0.3,
                flexDirection: "row",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                justifyContent: "space-between",
                alignItems:"center",
              }}>
                <View style={{
                  flex: 0.10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "#269DF9",
                }}>
                    <Image
                      style={{
                        maxHeight: 30,
                        maxWidth:30,
                        resizeMode: 'center'
                      }}
                      source={require("../../assets/group_of_ppl.png")}
                    />
                  </View>

                <View style={{
                   flex: 0.85,
                   alignItems: "center",
                   justifyContent: "center",
                   borderBottomWidth: 2,
                   borderBottomColor: "#fff",
                  }}>
                  <Text style={{
                    color: "#000",
                    fontSize: 20,
                  }}>Passenger Details
                  </Text>
                </View>
              </View>

              <View style={{
                flex: 0.3,
                marginLeft: "10%",
                marginRight: "2.5%",
                borderBottomWidth: 1.5,
                borderBottomColor: "#fff",
                flexDirection: "row",
              }}>
                <View style={{
                  flex: 0.1,
                  alignItems:"flex-start",
                  justifyContent:"flex-end",
                 }}>
                  <Image
                    style={{
                      flex:1,
                      maxHeight: 25,
                      maxWidth: 20,
                      resizeMode: "contain",
                      marginBottom:"2%",
                    }}
                    source={require("../../assets/person.png")}
                  />
                </View>

                    {Platform.OS === "ios" ? (
                      <TouchableOpacity
                      onPress={this.toggleDropDownModal}
                        style={{
                          flex:0.5,
                          width:"100%",
                          height:"100%",
                          flexDirection:"row",
                          alignItems:"flex-end",
                          justifyContent:"flex-start",
                        }}>
                        <Text style={styles.text}>
                          {this.state.numberOfPassenger}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                      onPress={this.toggleDropDownModal}
                        style={{
                          flex:0.5,
                          width:"100%",
                          height:"100%",
                          flexDirection:"row",
                          alignItems:"flex-end",
                          justifyContent:"flex-start",
                        }}
                      >
                        <Text style={styles.text}>
                          {this.state.numberOfPassenger}
                        </Text>
                      </TouchableOpacity>
                    )}

                  <View
                    style={{
                      flex: 0,
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
                            selectedValue={this.state.tempPassenger}
                            style={{
                              marginTop: "8%",
                              height: Platform.OS === "ios" ? "40%" : "20%",
                              backgroundColor: "#fff",
                              borderRadius: 15,
                              marginLeft: "3%",
                              marginRight: "3%",
                              paddingBottom: "2%"
                            }}
                            onValueChange={(itemValue, itemIndex) => {
                              console.log("item value: ", itemValue);
                              this.setState({ tempPassenger: itemValue });
                              console.log(
                                "state tempPassenger: ",
                                this.state.tempPassenger
                              );
                            }}
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
                            onPress={this.toggleDropDownConfirmModal}
                          >
                            <Text style={{ fontSize: 25, alignSelf: "center" }}>
                              Confirm
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalBtnCss}
                            onPress={this.toggleDropDownCancleModal}
                          >
                            <Text style={{ fontSize: 25, alignSelf: "center" }}>
                              Cancle
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>

                <View style={{
                  flex: 0.4,
                  flexDirection: "row",
                  alignItems:"flex-end",
                  justifyContent:"flex-end"
                  }}>
                  <TouchableOpacity
                    onPress={this.singlePersonEvent}
                  >
                    <Text style={{
                      color: "#fff"
                    }}>
                      Single</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#fff"
                    }}
                  >
                    {" "}
                    |{" "}
                  </Text>
                  <TouchableOpacity
                   onPress={this.twoPersonEvent}>
                    <Text style={{
                      color: "#fff"
                    }}>
                      Two</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{
                flex: 0.3,
                marginLeft: "10%",
                marginRight: "2.5%",
                borderBottomWidth: 1.5,
                borderBottomColor: "#fff",
                flexDirection: "row",
              }}>
              <View style={{
                  flex: 0.1,
                  alignItems:"flex-start",
                  justifyContent:"flex-end",
                 }}>
                  <Image
                    style={{
                      flex:1,
                      maxHeight: 25,
                      maxWidth: 20,
                      resizeMode: "contain",
                      marginBottom:"2%",
                    }}
                    source={require("../../assets/Solid.png")}
                  />
                </View>

                  <View
                    style={{
                      flex:0.7,
                      width:"100%",
                      height:"100%",
                      flexDirection:"row",
                      alignItems:"flex-end",
                      justifyContent:"flex-start",
                    }}
                  >
                    <Text style={styles.text}>
                      Allow For Sharing Auto
                    </Text>
                  </View>

                  <Switch
                      style={{ flex: 0.2,
                        flexDirection:"row",
                        width: "100%",
                        // height:"100%",
                        alignSelf:"flex-end",
                        justifyContent:"flex-end",
                        // backgroundColor:"red"
                       }}
                      onValueChange={this.toggleSwitch}
                      disabled={this.state.fullAuto ? true : false}
                      value={this.state.switchValue}
                    />
                </View>
              </View>
            </View>




        </View>
        <View style={{ flex: 0.3}}>
          <View style={{ flex: 0.5 }}>
            <Header />
          </View>

          {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}> */}
          <View style={{
            flex:0.3,
            alignItems:"center",
            justifyContent:"center",
            width:"100%",
            height:"100%",
          }}>

            <TouchableOpacity
              style={{
                width:"30%",
                height:"60%",
                //backgroundColor:"#269DF9",
                borderRadius:30,
                alignItems:"center",
                justifyContent:"center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowOpacity: 1.5,
                shadowRadius: 5,
                elevation: 4
              }}
              onPress={this.nextEvent}
            >

              <Text style={{
                color:"#fff",
                margin:"5%",
                fontSize:18,
                fontWeight:"bold",
              }}> Next </Text>

            </TouchableOpacity>

          </View>
          {/* </LinearGradient> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputView: {
    flex: 0.7,
    backgroundColor: "#269DF9"
  },
  S_D_view: {
    flex: 0.33,
    flexDirection: "row"
  },
  sourceTODestinationLine: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center"
  },
  sourceTOdestinationImage: {
    height: "50%",
    width: "100%",
    alignSelf: "center",
    resizeMode: "contain"
  },
  S_D_input_view: {
    flex: 1,
    flexDirection: "column",
  },
  s_input_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  d_input_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  outter_view_s_input: {
    borderWidth: 0.5,
    height: "50%",
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
  text: {
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
    height: "100%",
    width: "100%",
    alignSelf: "flex-end",
    backgroundColor: "red",
    textAlignVertical: "bottom"
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
    color: "#454647",
    textAlignVertical: "bottom",
    width: "100%"
  },
  numberOfPassenger_btn_css: {
    height: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  numberOfPassenger_text_css: {
    color: "#fff",
    textAlign: "center"
  }
});
