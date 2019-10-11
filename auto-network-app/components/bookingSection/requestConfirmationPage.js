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
        let user=await firebase.auth().currentUser;
        let userRef=firebase.database().ref('requests/'+user.uid+'/confirmation_status');
        console.log("userRef: ",userRef);
        userRef.on('value', function(snapshot) {
            let confirmation_status=snapshot.val() ;
            console.log('confirmation status: ',confirmation_status);
            if(confirmation_status === true)
            { 
                this.moveToOngoing();
            }
            else if(confirmation_status === false) {
                this._findUserPosition();
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
        let name='';
        let fnameRef=await firebase.database().ref('drivers/'+this.state.uid+'/personal_details/first_name')
        fnameRef.once('value').then(async(snapshot)=>{
          fname = snapshot.val();
        })
        let lnameRef=await firebase.database().ref('drivers/'+this.state.uid+'/personal_details/last_name')
        lnameRef.once('value').then(async(snapshot)=>{
          lname = snapshot.val();
        })
        name=fname+' '+lname;
        let url='';
        let picRef=await firebase.database().ref('drivers/'+this.state.uid+'/personal_details/profile_pic_url')
        picRef.once('value').then(async(snapshot)=>{
          url = snapshot.val();
        })
        let autoNo=''
        let autoRef=await firebase.database().ref('drivers/'+this.state.uid+'/auto_details/auto_number')
        autoRef.once('value').then(async(snapshot)=>{
          autoNo = snapshot.val();
        })
        this.setState({
          driverName:name,
          driverPic:url,
          autoNumber:autoNo
        })
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
          driver_name: this.state.driverName,
          auto_number: this.state.autoNumber,
          driver_pic:this.state.driverPic,
          passenger_name:navigation.getParam('Name')
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
            <div>
              {this.passingVal}
            </div>
          ) :
        
        (
            <View>
             <ActivityIndicator  size="large"   color="#269DF9" />
            </View>
        )}
        </View>
          );
      }
}