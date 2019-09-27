import React from "react";
import { StyleSheet, Text, View, SafeAreaView , Platform , Image ,TextInput,TouchableOpacity } from "react-native";
import OptionsMenu from "react-native-options-menu";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../header/header';
import firebase from 'firebase';
import MapPicker from "react-native-map-picker";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import requestLocationPermission from '../utils/askForPermission'
import * as geolib from 'geolib';

export default  class requestConfirmationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            passengerId:'',
            driverId:'',
            status:false
        };
      this._findUserPosition = this._findUserPosition.bind(this);
      this.sendPushNotification = this.sendPushNotification.bind(this);
      this.sendNotificationTo = this.sendNotificationTo.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount(){
        let user=await firebase.auth().currentUser;
        let userRef=firebase.database().ref('requests/'+user.uid+'/confirmation_status');
        console.log("userRef: ",userRef);
        userRef.on('value', function(snapshot) {
            let confirmation_status=snapshot.val() ;
            console.log('confirmation status: ',confirmation_status);
            if(confirmation_status==true)
            {
                this.setState({
                    status:true
                })
            }
            else{
                this._findUserPosition();
            }
          }.bind(this));
    }

    async _findUserPosition (e) {
        console.log('in find user position');
        navigator.geolocation.getCurrentPosition(
          async(position) =>{
                let user=firebase.auth().currentUser;
                var userRef = firebase.database().ref('online_drivers/');
                userRef.once('value').then(async function(snapshot) {
                  let min=90000000 ;
                  snapshot.forEach((userId) =>{
                if(userId !== "GiROyZTiNdNZiuIJdVUTU72ewWr1"){
                    console.log('in the if statement');
                    let distance=geolib.getDistance(position.coords,userId.val().position.coords);
                    if(min > distance)
                    {
                      min = distance;
                      user_id=userId.key ;
                      console.log("driver id: ",user_id) ;
                    }
                    }
                  });
                  this.setState({uid:user_id});
                  firebase.database().ref('requests/'+user.uid).update({
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
        var tokenRef = firebase.database().ref('Passengers/'+user.uid+'/Token/expo_token');
        
        tokenRef.once('value').then(async(snapshot)=>{
          let token = snapshot.val()
          console.log('user_id',user);
          console.log("please see here token: ",token);
           await this.sendPushNotification(token);     
        });
      }
      
      sendPushNotification = async(token) =>{

        console.log("poojan");
        const message = {
          to: token,
          sound: 'default',
          title: 'Booking Request',
          body: 'Passenger Details:' ,
          data: {
            'Name': 'poojan dharaiya',
            'source': 'Valetva Chowkdi',
            'Destination': 'Nadiad',
          }
        };
    
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
    
        });
    
        const data = response._bodyInit;
        console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
        let user=await firebase.auth().currentUser;
        firebase.database().ref('requests/'+user.uid).update({
            confirmation_status:true
          });
    
      }
    
      render(){
          return(
        <View style={{flex:1}}>
          {this.state.status ? (
              <View>
              <Text>poojan</Text>
              </View>
          ) :
        
        (
            <View>
            <Text>dharaiya</Text>
            </View>
        )}
        </View>
          );
      }
}