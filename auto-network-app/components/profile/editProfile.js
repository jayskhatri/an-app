import React from "react";
import Header from '../header/header';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Alert,
  TextInput,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
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
import { SafeAreaView } from "react-navigation";
// import console = require("console");s
var options=[
    {label:"Male",value: 0},
    {label:"Female",value: 1},
    {label:"Other",value: 2}
  ];
  var optionsForAutoPuc=[
    {label:"Yes",value:0},
    {label:"No",value:1},
  ];
  var optionsForOwnAuto=[
    {label:"Yes",value:0},
    {label:"No",value:1},
  ];
  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
export default class editProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      gender:0,
      has_puc:0,
      own_Auto:0,
      load:false,
      image: null,
      isPicLoaded: true,
      birthdate:"",
      firstName:"",
      lastName:"",
      aadharNumber:"",
      licenceNumber:"",
      autoNumber:"",
      ownerName:"",
      ownerContactNumber:"",
      organisationEmailId:"",
    };

    this.editPhotoEvent = this.editPhotoEvent.bind(this);
    this.changeFirstNameEvent = this.changeFirstNameEvent.bind(this);
    this.changeLastNameEvent = this.changeLastNameEvent.bind(this);
    this.changeaadharNumberEvent = this.changeaadharNumberEvent.bind(this);
    this.changelicenceNumberEvent = this.changelicenceNumberEvent.bind(this);
    this.changeautoNumberEvent = this.changeautoNumberEvent.bind(this);
    this.changeownerNameEvent = this.changeownerNameEvent.bind(this);
    this.changeownerContactNumberEvent = this.changeownerContactNumberEvent.bind(this);
    this.changeOrganisationEmailIdEvent = this.changeOrganisationEmailIdEvent.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.previousEvent = this.previousEvent.bind(this);
  }
  editPhotoEvent(e){
    this.props.navigation.navigate("ProfilePageFourth");
  }
  changeFirstNameEvent(e){
    const temp = e.nativeEvent.text;
    this.setState({firstName:temp});
  }
  changeLastNameEvent(e){
    const temp = e.nativeEvent.text;
    this.setState({lastName:temp});
  }
  changeOrganisationEmailIdEvent(e){
    const temp = e.nativeEvent.text;
    this.setState({organisationEmailId:temp});
  }
  changeaadharNumberEvent(e){
    const temp = e.nativeEvent.text;
    this.setState({aadharNumber:temp});
  }
  changelicenceNumberEvent(e){
    const temp = e.nativeEvent.text;
    this.setState({licenceNumber:temp});
  }
  changeautoNumberEvent(e){
    const temp = e.nativeEvent.text;
    this.setState({autoNumber:temp});
  }
  changeownerNameEvent(e){
    const temp = e.nativeEvent.text;
    this.setState({ownerName:temp});
  }
  changeownerContactNumberEvent(e){
    const temp = e.nativeEvent.text;
    this.setState({ownerContactNumber:temp});
  }
  componentWillMount(){
    console.log("load code");
    // write a code for fatching data of user from db
    this.setState({load:true});
  }
  saveEvent(e){
    console.log("F name : ",this.state.firstName);
    console.log("L name : ",this.state.lastName);
    console.log("O Email ID : ",this.state.organisationEmailId);
    console.log("date : ",this.state.birthdate);
    console.log("gender : ",this.state.gender);
    console.log("Aadhar no : ",this.state.aadharNumber);
    console.log("licence no : ",this.state.licenceNumber);
    console.log("PUC : ",this.state.has_puc);
    console.log("Auto no : ",this.state.autoNumber);
    console.log("Own vehicle : ",this.state.own_Auto);
    console.log("owner Name : ",this.state.ownerName);
    console.log("owner contact number : ",this.state.ownerContactNumber);

    // write a code for update perticuler user data

    Alert.alert(' Successfully Save ');

  }
  previousEvent(){
    this.props.navigation.navigate("Setting");
  }
  render() {
    let { image } = this.state;
    
    
    return (
      // <View style={{flex:1}}>
       <DismissKeyboard>
          <View style={styles.container}>
            <View style={styles.header}>
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 0.4,
                backgroundColor: "#269DF9",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={{marginTop:"-4%"}}>
                <TouchableOpacity onPress={this.previousEvent} >
                  <Image
                    style={{
                      width: 60,
                      height: 70,
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/back1.png")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headerText}>Edit Profile</Text>
              </View>
              <View></View>
            </View>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </SafeAreaView>
        </View>

          {this.state.load ? 
            (
          <ScrollView style={styles.userInfo}>
                  <View  style={{flex:0.64,width:"100%"}}>
                        <Image
                          style={{
                               alignSelf:"center",
                              height:200,
                              width:200,
                              borderRadius:100,
                              borderWidth:3,
                              borderColor:"black",
                              //  resizeMode:"contain"
                             }}   
                           source={require("../../assets/pic.jpg")}
                          />
                         <TouchableOpacity onPress={this.editPhotoEvent}> 
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
                         </TouchableOpacity> 
                      <View style={{flexDirection:"column",marginTop:"4%",alignItems:"center"}}>
                      <Text style={{fontSize:28}}>Sukhdev Prasad</Text>
                            <View style={{flexDirection:"row"}}>
                                <Image 
                               style={{
                                        marginTop:Platform.OS === 'android' ? "2.5%" : "-2%",
                                        marginLeft:"2%",
                                        height: Platform.OS === 'ios' ? hp('4%') : hp('2%')  ,
                                        width:Platform.OS === 'ios' ? wp('4%') : wp('3%')   ,
                                        // height:hp('10%'),
                                        // width:wp('10%'),
                                        borderRadius:Platform.OS === 'ios' ? 20 : 50,
                                        resizeMode:"contain"
                                         }} 
                                     source={require('../../assets/varifiedlogo.png')} />
                                 <Text style={{fontSize:15}}> The Verified Driver </Text>
                            </View>
                      </View>
                  </View>
                  <View style={{flex:0.36,marginTop:"6%",width:"100%"}}>
                       <View style={{flex:0.26,width:"100%"}}>
                                <View style={{flex:0.10,borderTopWidth:0.5,borderBottomColor:"#988c8c"}}>
                                 <Text style={{fontSize:20,marginLeft:"2%",marginTop:"3%"}}>Personal Information</Text>
                              </View>
                                <View style={{flex:0.13,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                 <View style={{flex:0.40}}> 
                                   <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>First Name</Text>
                                 </View>
                                 <View style={{flex:0.60}}>
                                       <TextInput
                                              placeholder="Enter Your First Name"
                                              onChange = {this.changeFirstNameEvent}
                                              value = {this.state.firstName}
                                             style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                        /> 
                                  </View>
                                </View>  
                                <View style={{flex:0.13,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                     <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Last Name</Text>
                                        </View>
                                     <View style={{flex:0.60}}>
                                               <TextInput
                                                      placeholder="Enter Your Last Name"
                                                      onChange = {this.changeLastNameEvent}
                                                      value = {this.state.lastName}
                                                      style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                                /> 
                                      </View>
                                </View> 
                                <View style={{flex:0.14,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
                                     <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Organisation Email Id</Text>
                                        </View>
                                     <View style={{flex:0.60}}>
                                               <TextInput
                                                      placeholder="Enter Your Organisation Email Id"
                                                      onChange = {this.changeOrganisationEmailIdEvent}
                                                      value = {this.state.organisationEmailId}
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
                                                     onChange = {this.changeBirthDateEvent} 
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
                                                      });
                                                      console.log(this.state.gender);
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
                       <View style={{flex:0.26,width:"100%"}}>
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
                                              onChange = {this.changeaadharNumberEvent}
                                              value = {this.state.aadharNumber}
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
                                              onChange = {this.changelicenceNumberEvent}
                                              value = {this.state.licenceNumber}
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
                                                        radio_props={optionsForAutoPuc}
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
                       <View style={{flex:0.26,width:"100%",marginBottom:"5%"}}>
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
                                              onChange = {this.changeautoNumberEvent}
                                              value = {this.state.autoNumber}
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
                                                  initial={this.state.own_Auto} 
                                                  onPress={(value)=>{
                                                    this.setState({
                                                      own_Auto: value
                                                    });
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
                                 <View style={{flex:0.22,backgroundColor:"white",borderBottomColor:"#988c8c",borderWidth:0.5}}>
                                  <View style={{flex:0.40}}> 
                                          <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Owner Name</Text>
                                      </View>
                                      <View style={{flex:0.60}}> 
                                          <TextInput
                                            placeholder="Enter Your vehicle owner name"
                                            onChange = {this.changeownerNameEvent}
                                            value = {this.state.ownerName}
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
                                            onChange = {this.changeownerContactNumberEvent}
                                            value = {this.state.ownerContactNumber}
                                            style={{borderBottomWidth:1,height:35,marginBottom:"2.5%",marginLeft:"5%",marginRight:"5%"}}
                                          /> 
                                      </View>
                                    </View>   
                       </View>    
                       <View style={{flex:0.22,width:"100%",alignItems:"center"}}>
                               <View style={{flex:1,alignItems:"center",height:"40%",width:"80%",marginBottom:"8%",justifyContent:"center"}}>
                               <TouchableOpacity style={{borderRadius:50,height:"50%",marginBottom:"3%",width:"50%",backgroundColor:"#269DF9",shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 2}}
                                                 onPress = {this.saveEvent}
                               >
                                      <Text style={{fontSize:35,marginBottom:"7%",alignSelf:"center",letterSpacing:1,color:"#fff"}}>Save</Text>
                               </TouchableOpacity>                     
                               </View>
                       </View>      
                  </View>
          </ScrollView>
            ) :
            (
              <View style={styles.ActivityIndicator}>
                <ActivityIndicator  size="large"   color="#269DF9" />
              </View>
            )}
        </View>
       </DismissKeyboard>
     
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
    flex: 0.24
  },
  userInfo: {
        flex:0.76
  },
  header: {
    flex: 0.18
  },
  backImage: {
    height: 60,
    width: 60,
    marginTop: "-13%",
    resizeMode: "contain"
  },
  headerText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 25
  },
});
