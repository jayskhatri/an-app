import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  View,
  Switch
} from "react-native";
import colors from "../constants/Colors";
import Header from "../header/header";
import { ScrollView } from "react-native-gesture-handler";
import Accordion from "react-native-collapsible/Accordion";
const CONTENT = [
  {
    title: "Do I need to register on your site to book tickets?",
    content:
      "Yes. You need to register using your mobile number/email id. After successful registration, you can proceed to book your tickets."
  },
  {
    title:
      "I don't know have a Paytm account, what other alternative modes of Payments are available?",
    content:
      "You can pay via cash if you don't have a paytm account. If you want to create a Paytm account you can easily do from www.paytm.com"
  },
  {
    title: "want to make a booking at 11 PM will I be able to do it?",
    content: "Sure.booking can be done from 5:00 AM to 11:59 PM every day."
  },
  {
    title: "want to book the ticket after 2 days will I be able to book it?",
    content:
      "Yes. You can make your ticket booking up to 3 days in advance from the current date."
  },
  {
    title:
      " don't have the application on my mobile can I book from my friend's mobile?",
    content:
      "It’s easy to download the application and complete the sign-up process. You can certainly book from your friend's mobile as well. Keep Travelling."
  }
];
const CONTENT_2 = [
  {
    title: "What if the auto doesn't show up?",
    content:
      "In case the vehicle you booked does not show up, we will offer you a full refund immediately if you have paid online. If paid offline we will cancel the ride on your behalf."
  },
  {
    title: "What if the auto comes up late?",
    content:
      "We try our best to ensure our partners reach our customers on time. But in case of delays, do call us and we will help you out by either providing an alternate vehicle or refund of your ride."
  },
  {
    title: "What benefit I will gain using AutoYatri?",
    content:
      "With AutoYatri,you can save a lot of money. You won't have to pay more fare for the specific routes even if you are traveling during peak hours or at night. Also, we will be having offers in coming future."
  },
  {
    title:
      "I want to take the ride individually, is it compulsory to opt for organizational sharing?",
    content:
      "No, it’s not compulsory. You can always take the individual ride as per your convenience."
  },
  {
    title:
      "How can I trust the people that will come with me if I choose for Sharing?",
    content:
      "Don’t worry,in case of sharing the passengers will be of the same organization and hence no other passengers can be part of sharing the ride. So don’t be afraid of security issues."
  },
  {
    title: "I want to cancel my booking what I need to do?",
    content:
      "You can cancel the ride until the driver arrives at the pick-up location. Once the driver reaches the pickup location you can’t cancel the ride."
  }
];
export default class FAQ extends React.Component {
  constructor() {
    super();
    this.state = {
      activeSections: [],
      multipleSelect: false,
      activeSections_2: [],
      multipleSelect_2: false
    };
    this.backEvent = this.backEvent.bind(this);
  }
  backEvent() {
    this.props.navigation.navigate("Help");
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

  setSections_2 = sections => {
    this.setState({
      activeSections_2: sections.includes(undefined) ? [] : sections
    });
  };

  renderHeader_2 = (section, _, isActive) => {
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

  renderContent_2(section, _, isActive) {
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
    const { multipleSelect_2, activeSections_2 } = this.state;
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
                <Text style={styles.headerText}>FAQ</Text>
              </View>
              <View style={{ flex: 0.3 }}></View>
            </SafeAreaView>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </View>
        </View>
        <ScrollView style={styles.faq_view}>
          {/* <View style={{ marginTop: "3%", flex: 1 }}> */}
          <View style={styles.faq_header_view}>
            <View style={styles.faq_header_inner_view_1}>
              <Text style={styles.faq_header_text}>Booking Releted</Text>
            </View>
          </View>
          <View style={styles.faq_booking_releted_view}>
            <View style={{ flex: 0.2, margin: "3%" }}></View>
            <View style={{ flex: 0.6 }}>
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
            </View>
            <View style={{ flex: 0.2, margin: "3%" }}></View>
          </View>
          <View style={styles.passenger_header_view}>
            <View style={styles.faq_header_inner_view_1}>
              <Text style={styles.faq_header_text}>Passengers</Text>
            </View>
          </View>
          <View style={styles.faq_passenger_view}>
            <View style={{ flex: 0.2, margin: "3%" }}></View>
            <View style={{ flex: 0.6 }}>
              <Accordion
                activeSections={activeSections_2}
                sections={CONTENT_2}
                touchableComponent={TouchableOpacity}
                expandMultiple={multipleSelect_2}
                renderHeader={this.renderHeader_2}
                renderContent={this.renderContent_2}
                duration={400}
                onChange={this.setSections_2}
              />
            </View>
            <View style={{ flex: 0.2, margin: "3%" }}></View>
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white_color
  },
  header: {
    flex: 0.24
  },
  headerText: {
    alignSelf: "center",
    color: colors.light.white_color,
    fontSize: 25
  },
  faq_view: {
    flex: 0.76
  },
  faq_header_view: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%"
  },
  faq_header_text: {
    fontSize: 30,
    textAlignVertical: "center",
    textAlign: "center",
    color: colors.light.white_color
  },
  faq_header_inner_view_1: {
    width: "95%",
    flex: 1,
    // borderWidth: 0.5,
    borderRadius: 25,
    backgroundColor: "#45C298"
    // borderBottomWidth: 0.5
  },
  faq_booking_releted_view: {
    flex: 0.2,
    backgroundColor: "#185C75",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    alignSelf: "center",
    borderRadius: 25,
    borderWidth: 0.5,
    marginTop: "3%"
  },
  faq_passenger_view: {
    flex: 0.2,
    backgroundColor: "#185C75",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    marginBottom: "3%",
    alignSelf: "center",
    borderRadius: 25,
    borderWidth: 0.5,
    marginTop: "1%"
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
    backgroundColor: "red",
    borderRadius: 25
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
    marginTop: "0.5%"
  },
  inactive: {
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginTop: "0.5%",
    width: "95%",
    alignSelf: "center"
  },
  passenger_header_view: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%"
  }
});
