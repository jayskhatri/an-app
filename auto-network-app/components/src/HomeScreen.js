import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Header from "../header/header";
import BottomBar from "../bottomTabBar/BottomBar";
import * as firebase from "firebase";
import colors from "../constants/Colors";
import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
const CONTENT = [
  {
    title: "Terms and Conditions",
    content:
      'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).'
  },
  {
    title: "Privacy Policy",
    content:
      "A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data."
  },
  {
    title: "Return Policy",
    content:
      "Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision."
  }
];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
      entries: [
        { title: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg" },
        { title: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg" },
        { title: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg" }
      ],
      activeSlide: 0,
      activeSections: [],
      multipleSelect: false
    };
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
              resizeMode: "cover",
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
          {/* <ScrollView style={{ flex: 1, backgroundColor: "blue" }}> */}
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

            <View style={styles.CardView}>
              {/* <View style={{ flex: 0.1 }}></View> */}
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
                      flex: 0.2,
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors.light.white_color,
                        position: "absolute",
                        bottom: 10
                      }}
                    >
                      Name :{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.light.light_black,
                        position: "absolute",
                        bottom: 10,
                        marginLeft: "3%"
                      }}
                    >
                      King
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
                            changa .........
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
                            vvnager .............
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
                        <Text style={styles.date_time_text_css}>12/06/19</Text>
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
                        <Text style={styles.date_time_text_css}>10:00 AM</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              {/* <View style={{ flex: 0.17 }}></View> */}
            </View>
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
    flex: 0.35,
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
    justifyContent: "center"
    // backgroundColor: "blue"
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
