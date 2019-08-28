profilePgeFourth

import React from "react";
import { StyleSheet, Text, View, Easing, Animated , Image ,TextInput,TouchableOpacity } from "react-native";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default  class profilePgeFourth extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: 0
      }
    }

    
  render() {
    return(
    <View style={styles.container}>
            <Text> Profile Fourth Page </Text>
    </View>
    );
  }
}
const styles = StyleSheet.create({
      container:{
        flex:1,
        alignItems:"center"
      },
});