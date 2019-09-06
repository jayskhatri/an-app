import React from "react";
import { StyleSheet, Text, View, SafeAreaView , Image ,TextInput,TouchableOpacity ,Platform } from "react-native";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
// const {widthOfScreen , heightOfScreen } = Dimensions.get('window');
import Header from '../header/header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker'
var options=[
  {label:"Male",value: 111},
  {label:"Female",value: 112},
  {label:"Other",value: 113}
];
export default  class profilePageOne extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: 0,
        first_name: '',
        last_name: '',
        birth_date: '01-01-1990',
        gender: 111,
      }
      this.nextEvent = this.nextEvent.bind(this);
      this.submitDetails = this.submitDetails.bind(this);
    }
    
    submitDetails(){
      firebase.database().ref('Drivers/'+this.state.phone_number).set({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        birth_date: this.state.birth_date,
        gender: this.state.gender,
      });
    }
    
    nextEvent(e){
        console.log("gender: ",this.state.gender);
        this.submitDetails();
        this.props.navigation.navigate("ProfilePageSecond");
    }
    
    render() {
    return(
    <View style={styles.container}>
        <View style={styles.waveView}>
              <SafeAreaView style={{backgroundColor:"#269DF9"}}>
                  <Text style={{alignSelf:"center",color:"#fff",fontSize:25,marginTop:Platform.OS === 'android' ? "4%" : "0%"}}>My Profile</Text>
                  <Header />
              </SafeAreaView>
        
        </View>
        
        <View style={styles.logoView}>
        <Image style={{marginTop:"10%", width:wp('51%'),height:'60%'}} source={require('../../assets/bigAdminLogo.png')} />
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
                       onChangeText={(first_name) => this.setState({first_name})}
                       value={this.state.first_name}
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
                       onChangeText={(last_name) => this.setState({last_name})}
                       value={this.state.last_name}
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View>
            </View>
            <View style={{flex:0.22,backgroundColor:"white",borderWidth:0.5}}>
            <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Birth Date</Text>
             </View>
                <View style={{flex:0.60}}> 
                <DatePicker
                    style={{width:wp('60%'),marginLeft:'3%'}}
                    mode="date"
                    placeholder="Enter Your Birth Date"
                   format="DD-MM-YYYY"
                   initial = {this.state.birth_date}
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
                  onDateChange={(birth_date) => this.setState({birth_date})}
                  value={this.state.birth_date}
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
                          initial={this.state.gender} 
                          onPress={(value)=>{
                            this.setState({
                              gender: value,
                            })
                          }}
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
      flex:0.10
      },
      logoView:{
        flex:0.35,
      },
      signUpView:{
        flex:0.55,
        backgroundColor:'#12afe3',
           height:"100%",
          width:wp('80%'),
           marginLeft:"3%",
           marginRight:"3%",
           marginBottom:"5%",
           borderRadius:15,
      },
});