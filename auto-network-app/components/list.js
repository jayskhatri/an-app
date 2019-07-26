import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity} from 'react-native';

export default class list extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
   
 };
  handleSubmit(e){
 this.props.navigation.navigate("Home");
}
  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}> List  page </Text>
        <TouchableOpacity onPress={this.handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Home</Text>
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