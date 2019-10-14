import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  YellowBox
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Header from "../header/header";
import BottomBar from "../bottomTabBar/BottomBar";
import colors from "../constants/Colors";
import * as firebase from "firebase";
import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";

// const CONTENT = [
//   {
//     title: "Terms and Conditions",
//     content:
//       'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).'
//   },
//   {
//     title: "Privacy Policy",
//     content:
//       "A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data."
//   },
//   {
//     title: "Return Policy",
//     content:
//       "Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision."
//   }
// ];
YellowBox.ignoreWarnings(["Setting a timer", "Accessing view "]);
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
      entries: [
        {
          title:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRw7rme6_mWCqqQxa5MLIMcPS3mYBmIycNa7JmoWUquhxkvsDVw"
        },
        { title: "http://nutritionsguru.com/assets/images/10off.jpg" },
        {
          title:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZBOiBku6ABARprIhh0sndMGE4YVZpkBfQuLW4bfr42TCEpxbk"
        }
      ],
      activeSlide: 0,
      activeSections: [],
      multipleSelect: false,
      source: "",
      destination: "",
      driver_name: "",
      date: "",
      time: "",
      fare: "",
      NoOfPassenger: "",
      passenger_name: "",
      auto_number: "",
      driver_pic: "",
      display: false
    };
    this.handleGoToDetailsEvent = this.handleGoToDetailsEvent.bind(this);
  }

  async componentDidMount() {
    let user = await firebase.auth().currentUser;
    let rideRef = await firebase
      .database()
      .ref("Passengers/" + user.uid + "/ongoing_rides");

    rideRef.on(
      "value",
      async function(snapshot) {
        let value = snapshot.val();
        console.log("ongoing object ", value);
        if (value !== null && value !== "") {
          this.setState({
            driver_name: value.driver_name,
            source: value.source,
            destination: value.destination,
            date: value.date,
            time: value.time,
            display: true,
            fare: value.fare,
            NoOfPassenger: value.number_of_passengers,
            auto_number: value.auto_number,
            passenger_name: value.passenger_name,
            driver_pic: value.driver_pic
          });
          console.log("source: ", this.state.source);
        }
      }.bind(this)
    );
  }
  handleGoToDetailsEvent(e) {
    console.log("IN");
    this.props.navigation.navigate("OnGoingBookingDetails", {
      Driver_Name: this.state.driver_name,
      Source: this.state.source,
      Destination: this.state.destination,
      Fare: this.state.fare,
      Date: this.state.date,
      Time: this.state.time,
      Passengers: this.state.NoOfPassenger,
      Passenger_Name: this.state.passenger_name,
      Auto_Number: this.state.auto_number,
      Driver_Pic: this.state.driver_pic
    });
  }
  _renderItem({ item, index }) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View style={styles.slide}>
          <Image
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "contain",
              borderRadius: 15
            }}
            source={{ uri: item.title }}
          />
        </View>
      </View>
    );
  }
  get pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "transparent", marginTop: "-2%" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "black"
        }}
        inactiveDotStyle={{}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <View
        style={[
          styles.accordion_header,
          isActive ? styles.active : styles.inactive
        ]}
      >
        <Text style={styles.accordion_header_text}>{section.title}</Text>
      </View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <View
        style={[styles.content, isActive ? styles.active : styles.inactive]}
      >
        <Text style={{ textAlign: "center" }}>{section.content}</Text>
      </View>
    );
  }
  render() {
    const { multipleSelect, activeSections } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <SafeAreaView
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 0.4,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.light.blue_color
              }}
            >
              <View>
                <Text style={styles.headerText}>Home</Text>
              </View>
            </SafeAreaView>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </View>
        </View>
        <View style={{ flex: 0.69 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 0.5,
                alignItems: "center",
                justifyContent: "center"
                // backgroundColor: "blue"
              }}
            >
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={700}
                itemWidth={350}
                onSnapToItem={index => this.setState({ activeSlide: index })}
                style={{ width: "100%", flex: 0.9, alignSelf: "center" }}
              />
              {this.pagination}
            </View>
            {this.state.display ? (
              <TouchableOpacity
                onPress={this.handleGoToDetailsEvent}
                style={styles.CardView}
              >
                <View
                  style={{
                    flex: 0.9,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center"
                    // backgroundColor: "red"
                  }}
                >
                  <View style={styles.header_of_cart_details}>
                    <View
                      style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        backgroundColor: colors.light.white_color,
                        borderRadius: 25
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 28,
                          color: colors.light.light_black,
                          position: "absolute",
                          bottom: 10,
                          alignSelf: "center"
                        }}
                      >
                        Header
                      </Text>
                    </View>
                  </View>
                  <View style={styles.driver_name_view}>
                    <View
                      style={{
                        flex: 0.3,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "red"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: colors.light.white_color,
                          position: "absolute",
                          bottom: "1%"
                        }}
                      >
                        Name :{""}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.7,
                        width: "100%",
                        height: "100%"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: colors.light.light_black,
                          position: "absolute",
                          bottom: 10,
                          marginLeft: "1.5%"
                        }}
                      >
                        {this.state.driver_name}
                      </Text>
                    </View>
                  </View>
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
                          style={{
                            flex: 0.8,
                            marginLeft: "4%",
                            marginTop: "-1%",
                            width: "100%",
                            height: "100%"
                          }}
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
                          style={{
                            flex: 0.8,
                            marginLeft: "4%",
                            marginTop: "-1%",
                            width: "100%",
                            height: "100%"
                          }}
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
                  <View style={styles.date_time_view}>
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
                            width: "100%",
                            height: "100%"
                          }}
                        >
                          <Text style={styles.date_time_text_css}>
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
                            width: "100%",
                            height: "100%"
                          }}
                        >
                          <Text style={styles.date_time_text_css}>
                            {this.state.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={{ textAlign: "center", fontSize: 25 }}>
                  No Upcoming Rides
                </Text>
              </View>
            )}
          </View>
          {/* <View style={{ flex: 0.2 }}>
            <Accordion
              activeSections={activeSections}
              sections={CONTENT}
              touchableComponent={TouchableOpacity}
              expandMultiple={multipleSelect}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSections}
            />
          </View> */}
          {/* </ScrollView> */}
        </View>
        <View style={{ flex: 0.09 }}>
          <BottomBar {...this.props} />
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
    flex: 0.22
  },
  headerText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 25
  },
  slide: {
    height: "95%",
    width: "100%",
    alignSelf: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "300",
    marginBottom: 20
  },
  accordion_header: {
    backgroundColor: "#F5FCFF",
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  },
  accordion_header_text: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "500"
  },
  content: {
    padding: 20,
    fontSize: 20,
    backgroundColor: "#fff"
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)"
  },
  inactive: {
    backgroundColor: "lightblue"
  },
  CardView: {
    backgroundColor: colors.light.light_blue,
    flex: 0.4,
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
    shadowColor: colors.light.light_blue,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 1.5,
    shadowRadius: 3.84,
    elevation: 4
  },
  fare_Details_View: {
    flex: 1,
    alignSelf: "center",
    marginTop: "2%"
  },
  source_destinatio_view: {
    flex: 0.25,
    flexDirection: "row",
    width: "85%",
    height: "100%"
    // marginTop: "3%"
    // backgroundColor: "yellow"
  },
  date_time_view: {
    flex: 0.25,
    flexDirection: "row",
    width: "85%",
    height: "100%"
    // marginTop: "4%"
    // backgroundColor: "green"
  },

  driver_name_view: {
    flex: 0.25,
    flexDirection: "row",
    width: "85%",
    height: "100%",

    borderBottomWidth: 1,
    borderBottomColor: colors.light.white_color,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue"
  },
  start_view: {
    flex: 0.2,
    flexDirection: "row",
    width: "85%",
    height: "100%",
    marginTop: "2%",
    borderBottomWidth: 1,
    borderBottomColor: colors.light.white_color,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1%"
  },
  lableText: {
    fontSize: 10,
    color: colors.light.white_color,
    alignSelf: "center",
    position: "absolute",
    left: 0,
    bottom: "5%"
  },
  name_input_view: {
    flex: 0.7,
    width: "100%",
    height: "100%",
    borderBottomColor: colors.light.white_color,
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  lable_Image: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    left: 0
  },
  text_Of_Details: {
    fontSize: 16,
    alignSelf: "center",
    color: colors.light.light_black,
    position: "absolute",
    bottom: 6
  },
  destinationIcon: {
    width: "50%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    left: 0
  },
  date_time_text_css: {
    color: colors.light.light_black,
    fontSize: 16,
    position: "absolute",
    bottom: 6
  },
  header_of_cart_details: {
    flex: 0.25,
    flexDirection: "row",
    width: "85%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
