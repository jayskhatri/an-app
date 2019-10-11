import React from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width:"100%",
            height:"100%",
            resizeMode:"stretch"
          }}
          source={require("../../assets/wawe.png")}
        ></Image>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"transparent"
  }
});
