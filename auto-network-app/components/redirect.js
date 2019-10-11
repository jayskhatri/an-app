// import React from "react";
// import { View, Text, Picker, TextInput } from "react-native";
// import BookingPageOne from "../components/bookingSection/bookingPage1";
// import { Dropdown } from "react-native-material-dropdown";
// import SearchableDropdown from "react-native-searchable-dropdown";

// import Select from "react-virtualized-select";
// var items = [
//   //name key is must.It is to show the text in front
//   { id: 1, name: "angellist" },
//   { id: 2, name: "codepen" },
//   { id: 3, name: "envelope" },
//   { id: 4, name: "etsy" },
//   { id: 5, name: "facebook" },
//   { id: 6, name: "foursquare" },
//   { id: 7, name: "github-alt" },
//   { id: 8, name: "github" },
//   { id: 9, name: "gitlab" },
//   { id: 10, name: "instagram" }
// ];
// export default class Redirect extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       selectedItems: ""
//     };
//   }
//   componentWillMount() {}
//   render() {
//     return (
//       <View style={{ flex: 1, backgroundColor: "lightblue" }}>
//         <View style={{ marginTop: "30%", flex: 1 }}>
//           <SearchableDropdown
//             multi={true}
//             selectedItems={this.state.selectedItems}
//             onItemSelect={item => {
//               const items = this.state.selectedItems;
//               // items.push(item);
//               this.setState({ selectedItems: items });
//             }}
//             containerStyle={{ padding: 5 }}
//             itemStyle={{
//               padding: 12,
//               marginTop: 2,
//               backgroundColor: "#ddd",
//               borderColor: "#bbb",
//               borderWidth: 1,
//               borderRadius: 5
//             }}
//             itemTextStyle={{ color: "#222" }}
//             itemsContainerStyle={{ maxHeight: 180 }}
//             items={items}
//             defaultIndex={2}
//             chip={true}
//             resetValue={false}
//             textInputProps={{
//               placeholder: "placeholder",
//               underlineColorAndroid: "transparent",
//               style: {
//                 padding: 12,
//                 borderWidth: 1,
//                 borderColor: "#ccc",
//                 borderRadius: 5
//               }
//               // onTextChange: text => alert(text)
//             }}
//             listProps={{
//               nestedScrollEnabled: true
//             }}
//           />
//         </View>
//       </View>
//     );
//   }
// }
import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Switch
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
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

//To make the selector (Something like tabs)
const SELECTORS = [
  { title: "T&C", value: 0 },
  { title: "Privacy Policy", value: 1 },
  { title: "Return Policy", value: 2 }
];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
    console.log(item);
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={styles.slide}>
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 25
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
        containerStyle={{ backgroundColor: "white" }}
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
      <View style={[styles.header, isActive ? styles.active : styles.inactive]}>
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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.2 }}></View>
        <View
          style={{
            flex: 0.2,
            width: "100%",
            height: "100%",
            // backgroundColor: "lightblue",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={500}
            sliderHeight={500}
            itemWidth={300}
            itemHeight={300}
            style={{ width: "100%", alignSelf: "center", flex: 0.9 }}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
          {this.pagination}
        </View>
        <ScrollView>
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
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    width: "100%",
    height: "95%",
    // backgroundColor: "red",
    alignSelf: "center"
  },

  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "300",
    marginBottom: 20
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  accordion_header_text: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "500"
  },
  content: {
    padding: 20,
    backgroundColor: "#fff"
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)"
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)"
  }
});
