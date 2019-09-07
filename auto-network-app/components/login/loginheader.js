import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View  , Text  , TextInput , TouchableOpacity , ImageBackground , Alert , Image , Dimensions} from 'react-native';
import {widthPercentageToDP  , heightPercentageToDP  } from 'react-native-responsive-screen';
import { responsiveWidth , responsiveHeight , responsiveFontSize  } from 'react-native-responsive-dimensions';
import Header from '../header/header';
export default class loginheader extends React.Component {

constructor(){
  super();
}

  render(){
  return (
<View style={styles.container}>
      <View style={styles.header}>
          <View style={{flexDirection:"row",}}>
               <Image
                    style={{
                      height: 50,
                      width: 50,
                      marginTop:"10%",
                      borderRadius:25
                    }}
                  source={require("../../assets/icon.png")}
                />
                <Text style={{fontSize:30,marginTop:"11%",marginLeft:"2%"}} >AutoMintra</Text>
          </View>
              <Header />
      </View>
</View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1
  },
  header:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#269DF9"
  },
});