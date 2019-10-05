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
          <View
            style={{
              flex: 0.8,
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
          <ScrollView style={{ flex: 0.2 }}>
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
          </ScrollView>
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
  }
});
