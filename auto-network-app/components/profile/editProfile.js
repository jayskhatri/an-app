import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TextInput,
  Platform,
  TouchableOpacity
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import DatePicker from 'react-native-datepicker'
import { ScrollView } from "react-native-gesture-handler";
// import console = require("console");s
var options=[
    {label:"Male",value: 0},
    {label:"Female",value: 1},
    {label:"Other",value: 2}
  ];
  var optionsForAuto=[
    {label:"Yes",value:0},
    {label:"No",value:1},
  ];
  var optionsForOwnAuto=[
    {label:"Yes",value:0},
    {label:"No",value:1},
  ];
export default class profilePageFourth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      load:false,
      image: null,
      isPicLoaded: true,
      birthdate:""
    };

  }
  componentWillMount(){
    console.log("load code");
    // write a code for fatching data of user from db
    this.setState({load:true});
  }
  render() {
    let { image } = this.state;
    
    
    return (
      <View style={{flex:1}}>
        {this.state.load ? 
        (
          <View style={styles.container}>
          <View style={styles.waveView}>
            <Image
              style={{ width: wp("100%"), height: hp("13%") }}
              source={require("../../assets/wawe.png")}
            ></Image>
          </View>
          <ScrollView style={styles.userInfo}>
                  <View  style={{flex:0.64,width:"100%"}}>
                        <Image
                          style={{
                               alignSelf:"center",
                               height:Platform.OS === 'ios' ? hp('22%') : hp('20.5%'), 
                               width:Platform.OS === 'ios' ? wp('47%') : wp('34%') ,
                                //  marginLeft:"5%",
                               //  marginTop:Platform.OS === 'ios' ? "-20%" : "-16%",
                  
                              borderRadius: Platform.OS === 'ios' ? 95 : 100,
                              borderWidth:3,
                              borderColor:"black",
                              //  resizeMode:"contain"
                             }}   
                           source={require("../../assets/pic.jpg")}
                          />
                          <Image
                              style={{
                                    height: 50,
                                    width: 50,
                                    alignSelf: "center",
                                    marginTop: "-12%",
                                    marginLeft:"30%",
                                    borderRadius:25
                                }}
                            source={require("../../assets/Component.png")}
                          />
                      <View style={{flexDirection:"column",marginTop:"4%",alignItems:"center"}}>
                      <Text style={{fontSize:28}}>Sukhdev Prasad</Text>
                      <Text style={{fontSize:15}}> The Verified Driver </Text>
                      </View>
                  </View>
                  <View style={{flex:0.36,marginTop:"6%",width:"100%"}}>
                       <View style={{flex:0.35,width:"100%"}}>
                             <View style={{flex:0.10,borderTopWidth:0.5,borderBottomColor:"#988c8c"}}>
                                 <Text style={{fontSize:20,marginLeft:"2%",marginTop:"3%"}}>Personal Information</Text>
                              </View>
                              <View style={{  flex:0.20,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                 <View style={{flex:0.40}}> 
                                   <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>First Name</Text>
                                 </View>
                                 <View style={{flex:0.60}}>
                                       <TextInput
                                              placeholder="Enter Your First Name"
                                              // onChangeText={(first_name) => this.setState({first_name})}
                                              // value={this.state.first_name}
  
                                             style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                        /> 
                                  </View>
                                </View>  
                                <View style={{flex:0.20,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                     <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Last Name</Text>
                                        </View>
                                     <View style={{flex:0.60}}>
                                               <TextInput
                                                      placeholder="Enter Your Last Name"
                                                      onChangeText={(last_name) => this.setState({last_name})}
                                                      value={this.state.last_name}
                                                      style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                                /> 
                                      </View>
                                </View> 
                                <View style={{flex:0.25,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                       <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Birth Date</Text>
                                       </View>
                                       <View style={{flex:0.60}}> 
                                               <DatePicker
                                                     style={{width:wp('80%'),marginBottom:"2.5%",marginLeft:'3%'}}
                                                     date={this.state.birthdate}
                                                     mode="date"
                                                     placeholder="Enter Your Birth Date"
                                                     format="DD-MM-YYYY"
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
  
                                                        }}
                                                      onDateChange={(date) => this.setState({birthdate:date})}
                                                      
                                                 />
                                           </View> 
                                   </View>
                                   <View style={{flex:0.25,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                          <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Gender</Text>
                                          </View>
                                          <View style={{flex:0.60}}>
                                              <RadioForm
                                                  style={{marginLeft:"5%",marginBottom:"2.5%",marginTop:"4%"}} 
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
                       </View>
                       <View style={{flex:0.35,width:"100%"}}>
                             <View style={{flex:0.10,borderTopWidth:0.5,borderTopColor:"#988c8c",borderBottomColor:"#988c8c",borderBottomWidth:0.5}}>
                                 <Text style={{fontSize:20,marginLeft:"2%",marginTop:"2%",marginBottom:"2%"}}>Required Information</Text>
                              </View>
                              <View style={{  flex:0.30,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                   <View style={{flex:0.40}}> 
                                        <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Aadhar No.</Text>
                                   </View>
                                   <View style={{flex:0.60}}>
                                        <TextInput
                                              placeholder="Enter Your Aadhar No."
                                               style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                         /> 
                                  </View>
                               </View>
                               <View style={{flex:0.30,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                      <View style={{flex:0.40}}> 
                                          <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Licence No.</Text>
                                      </View>
                                      <View style={{flex:0.60}}>
                                           <TextInput
                                              placeholder="Enter Your Licence No."
                                              style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                           /> 
                                       </View>
                                 </View>
                                 <View style={{flex:0.30,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                        <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Do You Have PUC?</Text>
                                        </View>
                                        <View style={{flex:0.60}}>
                                              <RadioForm
                                                        style={{marginLeft:"5%",marginTop:"4%",marginBottom:"2.5%"}} 
                                                        radio_props={optionsForAuto}
                                                        initial={this.state.has_puc} 
                                                        onPress={(value)=>{
                                                        this.setState({
                                                            has_puc: value
                                                          })
                                                        }}
                                                          buttonSize={7}
                                                          buttonColor={'#000000'}
                                                          labelStyle={{fontSize:16,marginRight:"6%"}}
                                                          formHorizontal={true}
                                                          buttonOuterSize={21}
                                                          selectedButtonColor={'#43b9e0'}
                                                          selectedLabelColor={'#0080ab'}
                                              />
                                          </View>
                                   </View>
                                
                                   
                       </View>  
                       <View style={{flex:0.30,width:"100%",marginBottom:"5%"}}>
                              <View style={{flex:0.10,borderTopWidth:0.5,borderBottomColor:"#988c8c",borderTopColor:"#988c8c",borderBottomWidth:0.5}}>
                                 <Text style={{fontSize:20,marginLeft:"2%",marginTop:"2%",marginBottom:"2%"}}>Other Details</Text>
                              </View>
                              <View style={{  flex:0.30,backgroundColor:"white",borderBottomColor:"#988c8c",borderBottomWidth:0.5}}>
                                   <View style={{flex:0.40}}> 
                                        <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Auto No.</Text>
                                   </View>
                                   <View style={{flex:0.60}}>
                                        <TextInput
                                              placeholder="Enter Your vehicle auto rickshaw no. "
                                               style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                         /> 
                                  </View>
                               </View>
                               <View style={{flex:0.20,backgroundColor:"white",borderBottomColor:"#988c8c",borderBottomWidth:0.5}}>
                                        <View style={{flex:0.40}}> 
                                            <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Do you have your own vehivle ?</Text>
                                        </View>
                                        <View style={{flex:0.60}}>
                                           <RadioForm
                                                  style={{marginLeft:"5%",marginTop:"4%",marginBottom:"2.5%"}} 
                                                  radio_props={optionsForOwnAuto}
                                                  initial={0} 
                                                  onPress={(value)=>{}}
                                                  buttonSize={7}
                                                  buttonColor={'#000000'}
                                                  labelStyle={{fontSize:16,marginRight:"6%"}}
                                                  formHorizontal={true}
                                                  buttonOuterSize={21}
                                                  selectedButtonColor={'#43b9e0'}
                                                  selectedLabelColor={'#0080ab'}
                                                  />
                                         </View>
                                 </View>
                                 <View style={{flex:0.22,backgroundColor:"white",borderBottomColor:"#988c8c",borderWidth:0.5}}>
                                  <View style={{flex:0.40}}> 
                                          <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Owner Name</Text>
                                      </View>
                                      <View style={{flex:0.60}}> 
                                          <TextInput
                                            placeholder="Enter Your vehicle owner name"
                                            style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                          /> 
                                      </View> 
                                    </View>
                                    <View style={{flex:0.19,backgroundColor:"white",borderBottomColor:"#988c8c",borderWidth:0.5}}>
                                    < View style={{flex:0.40}}> 
                                          <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Owner Contact No.</Text>
                                      </View>
                                      <View style={{flex:0.60}}>
                                      <TextInput
                                            placeholder="Enter Your vehicle owner contact No."
                                            style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                          /> 
                                      </View>
                                    </View>   
                       </View>          
                  </View>
          </ScrollView>
        </View>
        ) : 
        (
          
          <View style={styles.containerActivityIndicator}>
             <View style={styles.waveView}>
               <Image
                 style={{ width: wp("100%"), height: hp("13%") }}
                 source={require("../../assets/wawe.png")}
               ></Image>
              </View>
              <View style={styles.ActivityIndicator}>
                <ActivityIndicator  size="large"   color="#269DF9" />
              </View>
          </View>
        ) }
      </View>
     
    );
  }
 
}
const styles = StyleSheet.create({
  containerActivityIndicator: {
    flex:1,

  },
  ActivityIndicator: {
    flex:86,
    alignItems:"center",
    justifyContent:"center"
  },
  container: {
    flex: 1
  },
  waveView: {
    flex: 0.14
  },
  userInfo: {
        flex:0.86
  }
});
