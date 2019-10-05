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
export default class FAQ extends React.Component {
  constructor() {
    super();
    this.state = {
      activeSections: [],
      multipleSelect: false
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
        <ScrollView style={styles.faq_view} contentContainerStyle={{ flex: 1 }}>
          <View style={{ marginTop: "3%", flex: 1 }}>
            <View style={styles.faq_header_view}>
              <View style={styles.faq_header_inner_view_1}>
                <Text style={styles.faq_header_text}>Booking Releted</Text>
              </View>
            </View>
            <View style={styles.faq_booking_releted_view}>
              {/* <View
                style={{
                  
                }}
              > */}
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
              {/* </View> */}
            </View>
          </View>
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
    flex: 0.06,
    alignItems: "center",
    justifyContent: "center"
  },
  faq_header_text: {
    fontSize: 30,
    textAlignVertical: "center",
    textAlign: "center"
  },
  faq_header_inner_view_1: {
    borderWidth: 0.5,
    width: "95%",
    borderRadius: 25
    // borderBottomWidth: 0.5
  },
  faq_booking_releted_view: {
    flex: 0.65,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    alignSelf: "center",
    borderRadius: 25,
    borderWidth: 0.5
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
  }
});
