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
  TouchableOpacity
} from "react-native";
import RadioForm from "react-native-simple-radio-button";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import DatePicker from 'react-native-datepicker';
import firebase from 'firebase';
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";

var options=[
    {label:"Male",value: 0},
    {label:"Female",value: 1},
    {label:"Other",value: 2}
];
export default class editProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      gender:null,
      has_puc:0,
      own_Auto:0,
      is_loaded:false,
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
    };

    this.editPhotoEvent = this.editPhotoEvent.bind(this);
    this.changeFirstNameEvent = this.changeFirstNameEvent.bind(this);
    this.changeLastNameEvent = this.changeLastNameEvent.bind(this);
    this.changeaadharNumberEvent = this.changeaadharNumberEvent.bind(this);
    this.changelicenceNumberEvent = this.changelicenceNumberEvent.bind(this);
    this.changeautoNumberEvent = this.changeautoNumberEvent.bind(this);
    this.changeownerNameEvent = this.changeownerNameEvent.bind(this);
    this.changeownerContactNumberEvent = this.changeownerContactNumberEvent.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
  }
  async componentWillMount(){
    this.setState({is_loaded:false});

    console.log("component will mount edit profile");
    let user = await firebase.auth().currentUser;
    var userRef = firebase.database().ref('Passengers/'+user.uid);

    var personal_details = null;

    userRef.once('value').then((snapshot)=>{
      if(snapshot!=null){
        
        personal_details = (snapshot.val() && snapshot.val().personal_details);

        this.setState({
          gender:personal_details.gender,
          is_loaded:false,
          image: personal_details.profile_pic_url,
          isPicLoaded: true,
          birthdate:personal_details.birth_date,
          firstName:personal_details.first_name,
          lastName:personal_details.last_name,
          profile_pic_url : personal_details.profile_pic_url,
          is_loaded:true,
          old_values: null,
        });
        console.log("gender: ",this.state.gender);
      }
    });
    this.setState({is_loaded:true});
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

  async updateDetails(){

    this.setState({
      is_loaded: false,
    });

    let user = await firebase.auth().currentUser;
    var personalDetailsRef = firebase.database().ref('Passengers/'+user.uid+'/personal_details');

    personalDetailsRef.update({
      first_name: this.state.firstName,
      email_id: user.email,
      last_name: this.state.lastName,
      birth_date: this.state.birthdate,
      gender: this.state.gender,
      has_profile_completed: true,
    });

    Alert.alert("Successfully Data Saved");

    this.setState({
      is_loaded: true,
    });
  }

  saveEvent(e){
    // Works on both iOS and Android
    Alert.alert(
      'Do you want to update the changes?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.updateDetails()},
      ],
      {cancelable: false},
    );

  }
  render() {
      
    return (
      // <View style={{flex:1}}>
       
          <View style={styles.container}>
          <View style={styles.waveView}>
              <SafeAreaView style={{backgroundColor:"#269DF9"}}>
                <Text style={{alignSelf:"center",color:"#fff",fontSize:25,marginTop:Platform.OS === 'android' ? "4%" : "0%"}}>Edit Profile</Text>
                <Header />
              </SafeAreaView>
          </View>
          {this.state.is_loaded ? 
            (
          <ScrollView style={styles.userInfo}>
                  <View  style={{flex:0.64,width:"100%"}}>
                  { this.state.profile_pic_url ? 
                    <Image
                          style={{
                               alignSelf:"center",
                              //  height:Platform.OS === 'ios' ? hp('22%') : hp('20.5%'), 
                              //  width:Platform.OS === 'ios' ? wp('47%') : wp('34%') ,
                              height:200,
                              width:200,
                                //  marginLeft:"5%",
                               //  marginTop:Platform.OS === 'ios' ? "-20%" : "-16%",
                  
                              // borderRadius: Platform.OS === 'ios' ? 95 : 100,
                              borderRadius:100,
                              borderWidth:3,
                              borderColor:"black",
                              //  resizeMode:"contain"
                             }}   
                           source={{uri: this.state.profile_pic_url}}  
                        />
                       :  
                       <Image
                          style={{
                               alignSelf:"center",
                              //  height:Platform.OS === 'ios' ? hp('22%') : hp('20.5%'), 
                              //  width:Platform.OS === 'ios' ? wp('47%') : wp('34%') ,
                              height:200,
                              width:200,
                                //  marginLeft:"5%",
                               //  marginTop:Platform.OS === 'ios' ? "-20%" : "-16%",
                  
                              // borderRadius: Platform.OS === 'ios' ? 95 : 100,
                              borderRadius:100,
                              borderWidth:3,
                              borderColor:"black",
                              //  resizeMode:"contain"
                             }}   
                             source={require("../../assets/pic.jpg")}
                        />
                        }

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
                      <Text style={{fontSize:28}}>{this.state.firstName + " " + this.state.lastName}</Text>
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
                              <View style={{  flex:0.20,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
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
                                <View style={{flex:0.20,backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"#988c8c"}}>
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
                       <View style={{flex:0.22,width:"100%",alignItems:"center"}}>
                               <View style={{flex:1,alignItems:"center",height:"40%",width:"80%",marginBottom:"8%",justifyContent:"center"}}>
                               <TouchableOpacity style={{borderRadius:50,height:"50%",marginBottom:"3%",width:"80%",backgroundColor:"#269DF9"}}
                                                 onPress = {this.saveEvent}
                               >
                                      <Text style={{fontSize:35,marginBottom:"7%",alignSelf:"center",letterSpacing:4,color:"#fff"}}>Save</Text>
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
        /* // ) : 
        // (
          
          // <View style={styles.containerActivityIndicator}>
          //    <View style={styles.waveView}>
          //    <SafeAreaView style={{backgroundColor:"#269DF9"}}>
          //       <Text style={{alignSelf:"center",color:"#fff",fontSize:25,marginTop:Platform.OS === 'android' ? "4%" : "0%"}}>Edit Profile</Text>
          //       <Header />
          //     </SafeAreaView>
          //     </View>
          //     <View style={styles.ActivityIndicator}>
          //       <ActivityIndicator  size="large"   color="#269DF9" />
          //     </View>
          // </View>
        // ) */
         
      // </View>
     
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
  }
});
