import React from "react";
import { StyleSheet, Text, View, Easing, Animated , Image ,TextInput,TouchableOpacity } from "react-native";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
// const {widthOfScreen , heightOfScreen } = Dimensions.get('window');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker'
var options=[
  {label:"Female",value:0},
  {label:"Male",value:1},
  {label:"Other",value:2}
];
export default  class profilePageOne extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: 0
      }
      this.nextEvent = this.nextEvent.bind(this);
    }
    nextEvent(e){
        this.props.navigation.navigate("ProfilePageSecond");
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
            <View style={{backgroundColor:"#12afe3",borderTopRightRadius:10,borderTopLeftRadius:10,flex:0.12 }}>
                  {/* Scroller code */}
            </View>
            <View style={{  flex:0.20,backgroundColor:"white",borderWidth:0.5}}>
                <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>First Name</Text>
                </View>
                <View style={{flex:0.60}}>
                    <TextInput
                       placeholder="Enter Your First Name"
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View>
            </View>
            <View style={{flex:0.20,backgroundColor:"white",borderWidth:0.5}}>
            <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Last Name</Text>
                </View>
                <View style={{flex:0.60}}>
                    <TextInput
                       placeholder="Enter Your Last Name"
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View>
            </View>
            <View style={{flex:0.22,backgroundColor:"white",borderWidth:0.5}}>
            <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Birthdate</Text>
                </View>
                <View style={{flex:0.60}}> 
                <DatePicker
                    style={{width:wp('60%'),marginLeft:'3%'}}
                    date={this.state.date}
                    mode="date"
                    placeholder="Enter Your Birth-date"
                   format="DD-MM-YYYY"
                  //  minDate="01-01-1990"
                  //  maxDate="31-12-2003"
                   confirmBtnText="Confirm"
                   cancelBtnText="Cancel"
                   customStyles={{
                         dateIcon: {
                             width:wp('1%'),
                             position: 'absolute',
                             left: 0,
                             top: 4,
                             marginLeft:'10%'
                          },
                   dateInput: {
                         marginLeft:"25%",
                         borderWidth:0,
                         borderBottomWidth:0.5
                   }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
                </View> 
              </View>
              <View style={{flex:0.19,backgroundColor:"white",borderWidth:0.5}}>
              <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Gender</Text>
                </View>
                <View style={{flex:0.60}}>
                    <RadioForm
                          style={{marginLeft:"5%",marginTop:"4%"}} 
                          radio_props={options}
                          initial={0} 
                          onPress={(value)=>{}}
                          buttonSize={7}  
                          buttonColor={'#000000'}
                          labelStyle={{fontSize:16,marginRight:'7%'}}
                          formHorizontal={true}
                          buttonOuterSize={21}
                          selectedButtonColor={'#43b9e0'}
                          selectedLabelColor={'#0080ab'}
                     />
                </View>
              </View>
              <View style={{flex:0.07,backgroundColor:"#12afe3",flexDirection:"row"}}>
                     <TouchableOpacity style={{marginTop:"4%",marginLeft:"5%"}}>
                          <Text style={{fontSize:18}}>Go Back</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{marginTop:"4%",marginLeft:"56%"}} onPress={this.nextEvent} >
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
        flex:0.35,
      },
      signUpView:{
        flex:0.60,
        backgroundColor:'#12afe3',
           height:"100%",
          width:wp('80%'),
           marginLeft:"3%",
           marginRight:"3%",
           marginBottom:"5%",
           borderRadius:15,
      },
});