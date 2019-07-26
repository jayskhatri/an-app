import React from 'react';

import Login from './login/loginPage';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class App extends React.Component {
  constructor() {
    super();
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleListPage = this.handleListPage.bind(this);
 };
 handleSubmit(e){
 this.props.navigation.navigate("Login");
}
handleListPage(e){
  this.props.navigation.navigate("List");
 }

  render(){
  return (
    <View style={styles.container}>
     
      <Text style={styles.text}>HOME PAGE</Text>
      <TouchableOpacity onPress={this.handleSubmit}
         style={styles.buttonContainer}
         >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.handleListPage}
         style={styles.buttonContainer}
         >
           <Text style={styles.buttonText}>List</Text>
         </TouchableOpacity>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    backgroundColor: '#3498db',
  },
  buttonText:{textAlign:'center',color:'#FFFFFF'},
  buttonContainer:{
    marginTop:50,
    backgroundColor:'#2980b9',
    marginTop:20,
    paddingVertical:10,
    width:370
  },
  text:{
    marginTop:35,
    fontSize:50,
  }

});
// import React, { useState } from "react";
// import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
// import Animated, { Easing } from "react-native-reanimated";
// import { runTiming, bInterpolate } from "react-native-redash";

// const { Value, Clock, useCode, set } = Animated;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// export default function App() {
//   const [expanded, expand] = useState(false);
//   const animation = new Value(expanded ? 1 : 0);
//   const clock = new Clock();
//   useCode(
//     set(
//       animation,
//       runTiming(clock, animation, {
//         toValue: expanded ? 0 : 1,
//         duration: 4000,
//         easing: Easing.inOut(Easing.ease)
//       })
//     ),
//     [animation]
//   );
//   const scale = bInterpolate(animation, 0.4, 1);
//   const rotate = bInterpolate(animation, 0, 2 * Math.PI * 5);
//   return (
//     <TouchableWithoutFeedback onPress={() => expand(!expanded)}>
//       <View style={styles.container}>
//         <Animated.View style={{ transform: [{ scale }, { rotate }] }}>
//           <Logo />
//         </Animated.View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }
