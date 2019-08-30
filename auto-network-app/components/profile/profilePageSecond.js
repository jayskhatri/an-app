
import React from "react";
import { StyleSheet, Text, View, Easing, Animated , Image ,TextInput,TouchableOpacity } from "react-native";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// const {widthOfScreen , heightOfScreen } = Dimensions.get('window');
var options=[
  {label:"Yes",value:0},
  {label:"No",value:1},
];

export default  class profilePageSecond extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: 0
      }
      this.previousEvent = this.previousEvent.bind(this);
      this.nextEvent = this.nextEvent.bind(this);
    }
    previousEvent(e){
        this.props.navigation.navigate("ProfilePageOne");
    }
    nextEvent(e){
        console.log("IN third");
        this.props.navigation.navigate("ProfilePageThird");
        console.log("IN third");
    }
  render() {
    return(
    <View style={styles.container}>
      <View style={styles.waveView}>
        <Image style={{width:wp('100%'),height:hp("13%")}} source={require('../../assets/wawe.png')}></Image>
        </View>
        
        <View style={styles.logoView}>
        <Image style={{marginTop:"10%",width:wp('51%'),height:'60%'}} source={require('../../assets/bigAdminLogo.png')} />
        </View>
        <View style={styles.signUpView}>
            <View style={{backgroundColor:"#12afe3",borderTopRightRadius:10,borderTopLeftRadius:10,flex:0.15 }}>
                  {/* Scroller code */}
            </View>
            <View style={{  flex:0.25,backgroundColor:"white",borderLeftWidth:0.5,borderTopWidth:0.5,borderBottomWidth:0.5,borderRightWidth:0.5}}>
                < View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Aadhar No.</Text>
                </View>
                <View style={{flex:0.60}}>
                    <TextInput
                       placeholder="Enter Your Aadhar No."
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View>

            </View>
            <View style={{flex:0.25,backgroundColor:"white",borderLeftWidth:0.5,borderTopWidth:0.5,borderBottomWidth:0.5,borderRightWidth:0.5}}>
            < View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Licence No.</Text>
                </View>
    <View style={{flex:0.60}}>
                    <TextInput
                       placeholder="Enter Your Licence No."
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View>
            </View>
            <View style={{flex:0.25,backgroundColor:"white",borderLeftWidth:0.5,borderTopWidth:0.5,borderBottomWidth:0.5,borderRightWidth:0.5}}>
            < View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Do You Have PUC?</Text>
                </View>
                <View style={{flex:0.60}}>
                     <RadioForm
                          style={{marginLeft:"5%",marginTop:"4%"}} 
                         radio_props={options}
                         initial={0} 
                         onPress={(value)=>{}}
                          buttonSize={7}
                          buttonColor={'#000000'}
                         labelStyle={{fontSize:16,marginRight:4}}
                         formHorizontal={true}
                          buttonOuterSize={21}
                          selectedButtonColor={'#43b9e0'}
                          selectedLabelColor={'#0080ab'}
                           />
                </View>
              </View>
              <View style={{flex:0.10,backgroundColor:"#12afe3",flexDirection:"row"}}>
                     <TouchableOpacity style={{marginTop:"3%",marginLeft:"5%"}} onPress={this.previousEvent}>
                          <Text style={{fontSize:18}}>Go Back</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{marginTop:"3%",marginLeft:"56%"}} onPress={this.nextEvent} >
                           <Text style={{fontSize:18}}>Next</Text>
                     </TouchableOpacity>
              </View>
        </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
      container:{
        flex:1,
        alignItems:"center"
      },
      waveView:{
        flex:0.05,
        },
      logoView:{
        flex:0.45,
      },
      signUpView:{
        flex:0.55,
        backgroundColor:'#12afe3',
           height:"100%",
           width:wp('80%'),
           margin:"3%",
           marginBottom:"5%",
           borderRadius:15,
      },
});