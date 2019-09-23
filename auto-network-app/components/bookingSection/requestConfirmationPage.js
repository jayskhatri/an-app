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

        let userRef=firebase.database().ref('requests/6SNKmlXwESZjkl4U2h6h2TBJSiz2/confirmation_status');

        userRef.on('value', function(snapshot) {
            let confirmation_status=snapshot.val();
            console.log(confirmation_status);
            if(confirmation_status==true)
            {
                this.setState({
                    status:true
                })
            }
            else{
                console.log('poojan')
                this._findUserPosition();
            }
          }.bind(this));
    }

    _findUserPosition= async(e)=>{

        console.log('in the function');
        // let user_id='';
        //   navigator.geolocation.getCurrentPosition(
        //     (position) =>{
        //           var userRef = firebase.database().ref('online_drivers/');
        //           userRef.once('value').then(function(snapshot) {
        //             let min=900000000 ;
        //             snapshot.forEach((userId) =>{
        //               let distance=geolib.getDistance(position.coords,userId.val().position.coords);
        //               if(min > distance)
        //               {
        //                 console.log("min: ",min);
        //                 min = distance;
        //                 user_id=userId.key;
        //               }
        //             });
        //             console.log("user_id: ",user_id);
        //             this.setState({uid:user_id});
        //             console.log('in function;',this.state.uid)
        //             this.sendNotification(user_id);
        //           }.bind(this))
        //           ,
        //           () => {
        //                alert('Position could not be determined.');
        //           }
        //     }
        // );
        firebase.database().ref('requests/6SNKmlXwESZjkl4U2h6h2TBJSiz2').update({
            confirmation_status:true,
        })
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
    }
    
  
      sendNotificationTo(user_id){
        console.log("sendNotifications user_id: ",user_id);
        var tokenRef = firebase.database().ref('Passengers/'+user_id+'/Token/expo_token');
        
        tokenRef.once('value').then((snapshot)=>{
          let token = snapshot.val()
          console.log('user_id2',user_id);
        
          console.log('uid: ',this.state.uid);
          console.log("please see here token: ",token);
          // token="ExponentPushToken[YcZDEzL7ZAsBZFJjc9hFoT]";
          this.sendPushNotification(token);
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