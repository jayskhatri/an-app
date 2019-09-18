import React from "react";
import { View, Text } from "react-native";
import BookingPageOne from "../components/bookingSection/bookingPage1";

export default class Redirect extends React.Component {
  componentWillMount() {
    this.props.navigation.navigate("BookingPageOne");
  }
  render() {
    return (
      <View>
        <Text>King</Text>
      </View>
    );
  }
}
