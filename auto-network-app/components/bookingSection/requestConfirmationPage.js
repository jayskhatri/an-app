import React from "react";
import { StyleSheet, Text, View, SafeAreaView , Platform , Image ,TextInput,TouchableOpacity,ActivityIndicator } from "react-native";
import OptionsMenu from "react-native-options-menu";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../header/header';
import firebase from 'firebase';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import requestLocationPermission from '../utils/askForPermission'
import * as geolib from 'geolib';
import BookingPage3_one from "./BookingPage3_one";
import HomeScreen from '../src/HomeScreen'
import OnGoingBookingDetails from "../src/OnGoingBookingDetails";
import { BallIndicator } from "react-native-indicators";
import { Modal as ActivityModel } from "react-native-paper";
import colors from "../constants/Colors";
export default  class requestConfirmationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            passengerId:'',
            status:false,
            uid:'',
            drivers:[],
            sharingAllowed:false,
            driverName:'',
            driverPic:'',
            autoNumber:'',
            activityModelVisible:false
            
        };
      this._findUserPosition = this._findUserPosition.bind(this);
      this.sendPushNotification = this.sendPushNotification.bind(this);
      this.sendNotificationTo = this.sendNotificationTo.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.moveToOngoing = this.moveToOngoing.bind(this);
      this.checkForSharing = this.checkForSharing.bind(this);
      this.sendNotification = this.sendNotification.bind(this);
      this.broadcastPushNotification = this.broadcastPushNotification.bind(this);
      this.passingVal = this.passingVal.bind(this);
    }

    async componentDidMount(){
      this.setState({activityModelVisible:true});
        let user=await firebase.auth().currentUser;
        let userRef=firebase.database().ref('requests/'+user.uid+'/confirmation_status');
        console.log("userRef: ",userRef);
        userRef.on('value', function(snapshot) {
            let confirmation_status=snapshot.val() ;
            console.log('confirmation status: ',confirmation_status);
            if(confirmation_status === true)
            { 
                this.moveToOngoing();
                this.setState({activityModelVisible:false});
            }
            else if(confirmation_status === false) {
                this._findUserPosition();
                this.setState({activityModelVisible:true});
            }
          }.bind(this));
    }

    async _findUserPosition (e) {
        const drivers = this.state.drivers;
        console.log('in find user position');
        navigator.geolocation.getCurrentPosition(
          async(position) =>{
                console.log("get position")
                let user=firebase.auth().currentUser;
                var userRef = firebase.database().ref('online_drivers/');
                userRef.once('value').then(async function(snapshot) {
                  let min=90000000 ;
                  let user_id='';
                  snapshot.forEach(function(userId) {
                
                    // console.log('in the if statement');
                    console.log(userId.key);
                    console.log('status: ',!drivers.includes(userId.key))
                    if (!drivers.includes(userId.key)){
                    console.log('in if');
                    let distance=geolib.getDistance(position.coords,userId.val().position.coords);
                    if(min > distance)
                    {
                      min = distance;
                      user_id=userId.key ;
                      console.log("driver id: ",user_id) ;

                    }
                  }

                  }.bind(this));
                  this.setState({uid:user_id}) ;
                  console.log("uid: ",this.state.uid);
                  
                  drivers.push(user_id)
                  // console.log(this.state.drivers);
                  firebase.database().ref('requests/'+user.uid).update({
                    confirmation_status:'',
                    DriverId:user_id,
                  });
                  await this.sendNotificationTo(user_id);
                }.bind(this))
                ,
                () => {
                     alert('Position could not be determined.');
                }
          }
      );
    }

    async sendNotificationTo(user_id){
        let user= await firebase.auth().currentUser;
        let tokenRef = firebase.database().ref('online_drivers/'+user_id+'/token');
        
        tokenRef.once('value').then(async(snapshot)=>{
          let token = snapshot.val()
          // console.log("please see here token: ",token);
          this.sendPushNotification(token);     
        });
      }
      async sendNotification(userId){
        // console.log('in send notification')
        var tokenRef = firebase.database().ref('Passengers/'+userId+'/Token/expo_token');
        
        tokenRef.once('value').then(async(snapshot)=>{
          let token = snapshot.val()
          // console.log("please see here token: ",token);
          await this.broadcastPushNotification(token);     
        });
      }
      
      sendPushNotification = async(Token) =>{
        let user=await firebase.auth().currentUser;
        const {navigation} = this.props
        console.log("in push notification");
        // Token="ExponentPushToken[DmSR2QHiDFot1IgXU2phFB]"
        const message = {
          to: Token,
          sound: 'default',
          title: 'Booking Request',
          body: 'Passenger Details:' ,
          data: {
            'Name': navigation.getParam('name'),
            'PickUp': navigation.getParam('source'),
            'Drop': navigation.getParam('destination'),
            'Fare' : navigation.getParam('totalAmount'),
            'NumberOfPassengers' : navigation.getParam('noOfPerson'),
            'Date' : navigation.getParam('date'),
            'Time' : navigation.getParam('time'),
            'Uid': user.uid
          }
        };
    
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message) ,
    
        });
    
        const data = response._bodyInit;
        console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
        // firebase.database().ref('requests/'+user.uid).update({
        //     confirmation_status:true
        //   });
          // console.log('notification done');
      }

      broadcastPushNotification = async(Token) =>{
        const {navigation} = this.props
        let user=await firebase.auth().currentUser;
        console.log("in broadcast notification");
        const message = {
          to: Token,
          sound: 'default',
          title: 'Booking Request',
          body: 'Passenger Details:' ,
          data: {
            'Name': navigation.getParam('name'),
            'PickUp': navigation.getParam('source'),
            'Drop': navigation.getParam('destination'),
            'Fare' : navigation.getParam('totalAmount'),
            'NumberOfPassengers' : navigation.getParam('noOfPerson'),
            'Date' : navigation.getParam('date'),
            'Time' : navigation.getParam('time'),
            'PassengerId' : user.uid,
            'DriverId' : this.state.uid
          }
        };
    
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message) ,
    
        });
    
        const data = response._bodyInit;
        console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
        
        // firebase.database().ref('requests/'+user.uid).update({
        //     confirmation_status:true
        //   });
          // console.log('notification done');
      }

     moveToOngoing=async()=>{
        let user=firebase.auth().currentUser;

        let reqRef=firebase.database().ref('requests/');
        reqRef.child(user.uid).remove();
        let fname='';
        let lname='';
        let url='';
        
        let fnameRef= firebase.database().ref('drivers/'+this.state.uid+'/personal_details/')
        await fnameRef.once('value').then(async(snapshot)=>{
          fname = snapshot.val() && snapshot.val().first_name;
          lname = snapshot.val() && snapshot.val().last_name;
          url = snapshot.val() && snapshot.val().profile_pic_url;
          if(snapshot!==null){
            this.setState({
              driverName: fname + ' ' + lname,
              driverPic: url 
            })
          }
         
        })
        let autoNo=''
        let autoRef=firebase.database().ref('drivers/'+this.state.uid+'/auto_details/auto_number')
        await autoRef.once('value').then(async(snapshot)=>{
          autoNo = snapshot.val();
          this.setState({
            autoNumber: autoNo
          })
          
        });
        console.log("auto :",autoNo,'  fname: ',fname);
        let  rideRef=await firebase.database().ref('Passengers/'+user.uid+'/ongoing_rides/');
        const {navigation} = this.props
        rideRef.set({
          source:navigation.getParam('source'),
          destination:navigation.getParam('destination'),
          fare:navigation.getParam('totalAmount'),
          number_of_passengers:navigation.getParam('noOfPerson'),
          driver_id:this.state.uid,
          date:navigation.getParam('date'),
          time:navigation.getParam('time'),
          driver_name: fname+' '+lname,
          auto_number: autoNo,
          driver_pic:url,
          // passenger_name:navigation.getParam('Name')
        })
        this.setState({
          status:true
      })
        this.checkForSharing();
      }

    passingVal=()=>{
      this.props.navigation.navigate('BookingPage3_one',{
        source:this.state.uid
      }

      )
    }
    async checkForSharing(){
      const {navigation} = this.props
      let user=firebase.auth().currentUser
      this.setState({
        sharingAllowed : navigation.getParam('switchValue')
      })
      if(this.state.sharingAllowed){
        console.log("in sharing function");
        firebase.database().ref('Passengers').once('value').then(function(snapshot) {
          snapshot.forEach(function(users){
           let email= users.child('personal_details').child('email_id').val() ;
           console.log('email passenger: ',email)
           if(email.includes('charusat.') && email != user.email) {
            console.log('charusat includes')
            this.sendNotification(users.key);
           }
          }.bind(this))
      }.bind(this))
    }
  }
      render(){
          return(
        <View style={{flex:1}}>
          {this.state.status ? (
           <HomeScreen/>
          ) :
        
        (
          <ActivityModel
          animationType="slide"
          transparent={false}
          visible={this.state.activityModelVisible}
        >
          <View
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: colors.light.dark_blue,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  height: "30%",
                  width: "60%",
                  borderRadius: 25,
                  backgroundColor: colors.light.white_color,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <BallIndicator color={colors.light.black_color} />
              </View>
              <View style={{marginTop:"5%",height:"10%",width:"80%"}}>
                  <Text style={{fontSize:25,textAlign:"center",textAlignVertical:"center"}}>Finding Driver ...
                  </Text>
              </View>
            </View>
          </View>
        </ActivityModel>
        )}
        </View>
          );
      }
}