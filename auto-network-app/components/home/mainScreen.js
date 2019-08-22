import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View  , Text  , TextInput , TouchableOpacity , ImageBackground , Alert , Image , Dimensions} from 'react-native';
import { responsiveWidth , responsiveHeight , responsiveFontSize  } from 'react-native-responsive-dimensions';
export default class mainScreen extends React.Component {
  render(){
  return (
    <View style={styles.container}>
        <Text> Home Screen </Text> 
      </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1
  },
  Text:{
      fontSize:responsiveFontSize(5)
  }
});