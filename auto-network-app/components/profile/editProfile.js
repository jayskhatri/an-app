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
import colors from '../constants/Colors';
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
    this.props.navigation.navigate("EditPhoto");
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
    return (
      // <View style={{flex:1}}>
      //  <DismissKeyboard>
          <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <SafeAreaView
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 0.4,
                  justifyContent: "space-between",
                  backgroundColor: colors.light.blue_color
                }}
              >
                <View style={{ flex: 0.3 }}>
                  <TouchableOpacity
                    onPress={this.previousEvent}
                    style={{ width: 70, height: 30 }}
                  >
                    <Image
                      style={{
                        height: 25,
                        width: 60,
                        alignSelf: "center"
                      }}
                      source={require("../../assets/back1.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.headerText}>Edit Profile</Text>
                </View>
                <View style={{ flex: 0.3 }}></View>
              </SafeAreaView>
              <View style={{ flex: 0.6 }}>
                <Header />
              </View>
            </View>
          </View>

          {this.state.load ? 
            (
          <ScrollView style={styles.userInfo}>
                  <View  style={{flex:0.64,width:"100%"}}>
                      <View style={{flex:0.8 }}>
                        <View style={{flex:0.7}}>
                        <Image
                          style={{
                               alignSelf:"center",
                              height:200,
                              width:200,
                              borderRadius:100,
                              borderWidth:3,
                              borderColor:colors.light.black_color,
                              //  resizeMode:"contain"
                             }}   
                           source={require("../../assets/pic.jpg")}
                          />
                        </View>
                        <View style={{flex:0.3 , alignItems:"center" , justifyContent:"center"}}>
                             <View style={{flex:1,alignSelf:"center",marginLeft:"28%",marginTop:"-13%", width:50,height:50}}>
                             <TouchableOpacity onPress={this.editPhotoEvent} style={{ 
                           width:50,
                           height:50
                           }}> 
                          <Image
                              style={{
                                    height: 50,
                                    width: 50,
                                    alignSelf: "center",
                                    borderRadius:25,
                                }}
                            source={require("../../assets/Component.png")}
                          />
                         </TouchableOpacity> 
                             </View>

                        </View>
                      </View>
                      <View style={{flex:0.2}}>
                      <View style={{flexDirection:"column",marginTop:"4%",alignItems:"center"}}>
                      <Text style={{fontSize:28 , color:colors.light.black_color}}>Sukhdev Prasad</Text>
                            <View style={{flexDirection:"row"}}>
                                <Image 
                               style={{
                                        marginTop:Platform.OS === 'android' ? "1%" : "-2%",
                                        marginLeft:"2%",
                                        height: Platform.OS === 'ios' ? hp('4%') : hp('2%')  ,
                                        width:Platform.OS === 'ios' ? wp('4%') : wp('3%')   ,
                                        borderRadius:Platform.OS === 'ios' ? 20 : 50,
                                        resizeMode:"contain"
                                         }} 
                                     source={require('../../assets/varifiedlogo.png')} />
                                 <Text style={{fontSize:15 , color:colors.light.black_color}}> The Verified Driver </Text>
                            </View>
                      </View>
                      </View>
                  </View>
                  <View style={{flex:0.36,marginTop:"6%",width:"100%"}}>
                       <View style={{flex:0.26,width:"100%"}}>
                                <View style={{flex:0.10,borderTopWidth:0.5,borderBottomColor:colors.light.placeholder_text_Color}}>
                                 <Text style={{fontSize:20,marginLeft:"2%",marginTop:"3%",color:colors.light.black_color}}>Personal Information</Text>
                              </View>
                                <View style={{flex:0.13,borderBottomWidth:0.5,borderBottomColor:colors.light.placeholder_text_Color}}>
                                 <View style={{flex:0.40}}> 
                                   <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%',color:colors.light.black_color}}>First Name</Text>
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
                                <View style={{flex:0.13,borderBottomWidth:0.5,borderBottomColor:colors.light.placeholder_text_Color}}>
                                     <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%',color:colors.light.black_color}}>Last Name</Text>
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
                                <View style={{flex:0.14,borderBottomWidth:0.5,borderBottomColor:colors.light.placeholder_text_Color}}>
                                     <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%',color:colors.light.black_color}}>Organisation Email Id</Text>
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
                                <View style={{flex:0.25,borderBottomWidth:0.5,borderBottomColor:colors.light.placeholder_text_Color}}>
                                       <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%',color:colors.light.black_color}}>Birth Date</Text>
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
                                <View style={{flex:0.25,borderBottomWidth:0.5,borderBottomColor:colors.light.placeholder_text_Color}}>
                                          <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%',color:colors.light.black_color}}>Gender</Text>
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
                                                  buttonColor={colors.light.black_color}
                                                  labelStyle={{fontSize:16,marginRight:'7%'}}
                                                  formHorizontal={true}
                                                  buttonOuterSize={21}
                                                  selectedButtonColor={colors.light.blue_color}
                                                  selectedLabelColor={colors.light.blue_color}
                                              />
                                          </View>
                                    </View>
                       </View>
                       <View style={{flex:0.26,width:"100%"}}>
                             <View style={{flex:0.10,borderTopWidth:0.5,borderTopColor:colors.light.placeholder_text_Color,borderBottomColor:colors.light.placeholder_text_Color,borderBottomWidth:0.5}}>
                                 <Text style={{fontSize:20,marginLeft:"2%",marginTop:"2%",marginBottom:"2%",color:colors.light.black_color}}>Required Information</Text>
                              </View>
                              <View style={{  flex:0.30,borderBottomWidth:0.5,borderBottomColor:colors.light.placeholder_text_Color}}>
                                   <View style={{flex:0.40}}> 
                                        <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%',color:colors.light.black_color}}>Aadhar No.</Text>
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
                               <View style={{flex:0.30}}>
                                      <View style={{flex:0.40}}> 
                                          <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%',color:colors.light.black_color}}>Licence No.</Text>
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
                                 <View style={{flex:0.30,
                                 borderTopWidth:0.5,borderTopColor:colors.light.placeholder_text_Color,
                                 borderBottomWidth:0.5,borderBottomColor:colors.light.placeholder_text_Color}}>
                                        <View style={{flex:0.40}}> 
                                              <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%',color:colors.light.black_color}}>Do You Have PUC?</Text>
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
                                                          buttonColor={colors.light.black_color}
                                                          labelStyle={{fontSize:16,marginRight:"6%"}}
                                                          formHorizontal={true}
                                                          buttonOuterSize={21}
                                                          selectedButtonColor={colors.light.blue_color}
                                                          selectedLabelColor={colors.light.blue_color}
                                              />
                                          </View>
                                   </View>
                                
                                   
                       </View>  
                       <View style={{flex:0.26,width:"100%",marginBottom:"5%"}}>
                              <View style={{flex:0.10,borderBottomColor:colors.light.placeholder_text_Color,borderBottomWidth:0.5}}>
                                 <Text style={{fontSize:20,marginLeft:"2%",marginTop:"2%",marginBottom:"2%",color:colors.light.black_color}}>Other Details</Text>
                              </View>
                              <View style={{  flex:0.30,borderBottomColor:colors.light.placeholder_text_Color,borderBottomWidth:0.5}}>
                                   <View style={{flex:0.40}}> 
                                        <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%',color:colors.light.black_color}}>Auto No.</Text>
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
                               <View style={{flex:0.20,borderBottomColor:colors.light.placeholder_text_Color,borderBottomWidth:0.5}}>
                                        <View style={{flex:0.40}}> 
                                            <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%',color:colors.light.black_color}}>Do you have your own vehivle ?</Text>
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
                                                  buttonColor={colors.light.black_color}
                                                  labelStyle={{fontSize:16,marginRight:"6%"}}
                                                  formHorizontal={true}
                                                  buttonOuterSize={21}
                                                  selectedButtonColor={colors.light.blue_color}
                                                  selectedLabelColor={colors.light.blue_color}
                                                  />
                                         </View>
                                 </View>
                                 <View style={{flex:0.22,borderBottomColor:colors.light.placeholder_text_Color,borderWidth:0.5}}>
                                  <View style={{flex:0.40}}> 
                                          <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%',color:colors.light.black_color}}>Owner Name</Text>
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
                                    <View style={{flex:0.19,borderBottomColor:colors.light.placeholder_text_Color,borderWidth:0.5}}>
                                    < View style={{flex:0.40}}> 
                                          <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%',color:colors.light.black_color}}>Owner Contact No.</Text>
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
                               <TouchableOpacity style={{borderRadius:50,height:"50%",marginBottom:"3%",width:"50%",backgroundColor:colors.light.blue_color,
                               shadowColor: colors.light.black_color,
                                                shadowOffset: {
                                                  width: 0,
                                                  height: 5
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,

                                                elevation: 2}}
                                                 onPress = {this.saveEvent}
                               >
                                      <Text style={{fontSize:35,marginBottom:"7%",alignSelf:"center",letterSpacing:1,color:colors.light.white_color}}>Save</Text>
                               </TouchableOpacity>                     
                               </View>
                       </View>      
                  </View>
          </ScrollView>
            ) :
            (
              <View style={styles.ActivityIndicator}>
                <ActivityIndicator  size="large"   color={colors.light.blue_color} />
              </View>
            )}
        </View>
      //  </DismissKeyboard>
     
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
    flex: 1,
    backgroundColor:colors.light.white_color
  },
  waveView: {
    flex: 0.24
  },
  userInfo: {
        flex:0.78
  },
  header: {
    flex: 0.22
  },
  backImage: {
    height: 60,
    width: 60,
    marginTop: "-13%",
    resizeMode: "contain"
  },
  headerText: {
    alignSelf: "center",
    color: colors.light.white_color,
    fontSize: 25,

  },
});
