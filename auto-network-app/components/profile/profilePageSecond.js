
import React from "react";
import { StyleSheet, Text, View, SafeAreaView , Platform , Image ,TextInput,TouchableOpacity } from "react-native";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../header/header';
import firebase from 'firebase';
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
// const {widthOfScreen , heightOfScreen } = Dimensions.get('window');
var options=[
  {label:"Yes",value:0},
  {label:"No",value:1},
];

export default  class profilePageSecond extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: 0,
        aadhar_number: '',
        license_number: '',
        has_puc: 0,
      }
      this.previousEvent = this.previousEvent.bind(this);
      this.nextEvent = this.nextEvent.bind(this);
    }
    previousEvent(e){
        this.props.navigation.navigate("ProfilePageOne");
    }
    nextEvent(e){
      const {navigation} = this.props;
      // console.log("aadhar: ",this.state.aadhar_number," licence: ",this.state.license_number, " has_puc:  ",this.state.has_puc, " last name: ",navigation.getParam('last_name'))
        this.props.navigation.navigate("ProfilePageThird",
        {
          aadhar_number: this.state.aadhar_number, 
          license_number: this.state.license_number, 
          has_puc: this.state.has_puc,
          
          user: navigation.getParam('user'), 
          first_name: navigation.getParam('first_name'), 
          last_name: navigation.getParam('last_name'),
          birth_date: navigation.getParam('birth_date'), 
          gender: navigation.getParam('gender')
        });
    }
  render() {
    return(
    <View style={styles.container}>
      <View style={styles.waveView}>
        {/* <Image style={{width:wp('100%'),height:hp("13%")}} source={require('../../assets/wawe.png')}></Image> */}
        <SafeAreaView style={{backgroundColor:"#269DF9"}}>
                  <Text style={{alignSelf:"center",color:"#fff",fontSize:25,marginTop:Platform.OS === 'android' ? "4%" : "0%"}}>My Profile</Text>
                  <Header />
              </SafeAreaView>
        </View>
        <View style={styles.logoView}>
        <Image style={{marginTop:Platform.OS === 'ios' ? "25%" : "30%",width:wp('55%'),height:hp('23%'),resizeMode:"contain"}} source={require('../../assets/bigAdminLogo.png')} />
        </View>
        <View style={styles.signUpView}>
            <View style={{backgroundColor:"#12afe3",borderTopRightRadius:10,borderTopLeftRadius:10,flex:0.15 }}>
                  {/* Scroller code */}
            </View>
            <View style={{  flex:0.25,backgroundColor:"white",borderLeftWidth:0.5,borderTopWidth:0.5,borderBottomWidth:0.5,borderRightWidth:0.5}}>
                <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}} aadhar_number={value =>{aadhar_number:value}}>Aadhar No.</Text>
                </View>
                <View style={{flex:0.60}}>
                    <TextInput
                       placeholder="Enter Your Aadhar No."
                       onChangeText={(aadhar_number) => this.setState({aadhar_number})}
                       value={this.state.aadhar_number}
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View>

            </View>
            <View style={{flex:0.25,backgroundColor:"white",borderLeftWidth:0.5,borderTopWidth:0.5,borderBottomWidth:0.5,borderRightWidth:0.5}}>
            <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Licence No.</Text>
                </View>
    <View style={{flex:0.60}}>
                    <TextInput
                       placeholder="Enter Your Licence No."
                       onChangeText={(license_number) => this.setState({license_number})}
                       value={this.state.license_number}
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View>
            </View>
            <View style={{flex:0.25,backgroundColor:"white",borderLeftWidth:0.5,borderTopWidth:0.5,borderBottomWidth:0.5,borderRightWidth:0.5}}>
            <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Do You Have PUC?</Text>
                </View>
                <View style={{flex:0.60}}>
                     <RadioForm
                          style={{marginLeft:"5%",marginTop:"4%"}} 
                         radio_props={options}
                         initial={this.state.has_puc} 
                         onPress={(value)=>{
                           this.setState({
                            has_puc: value
                           })
                         }}
                          buttonSize={7}
                          buttonColor={'#000000'}
                         labelStyle={{fontSize:16,marginRight:4}}
                         formHorizontal={true}
                          buttonOuterSize={21}
                          selectedButtonColor={'#43b9e0'}
                          selectedLabelColor={'#0080ab'}
                           />
                </View>
              </View>
              <View style={{flex:0.10,padding:"5%",backgroundColor:"#12afe3",borderBottomLeftRadius:15,borderBottomRightRadius:15,flexDirection:"row"}}>
                     <TouchableOpacity style={{marginTop:"2%",marginLeft:"5%"}} onPress={this.previousEvent}>
                          <Text style={{fontSize:18}}>Go Back</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{marginTop:"2%",marginLeft:"56%"}} onPress={this.nextEvent} >
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
        flex:Platform.OS === 'ios' ? 0.10 : 0.05,
        },
      logoView:{
        flex: Platform.OS === 'ios' ? 0.45 : 0.50,
      },
      signUpView:{
        flex:Platform.OS === 'ios' ? 0.45 : 0.45,
        // backgroundColor:'#12afe3',
           backgroundColor:"#fff",
           height:"80%",
           width:wp('80%'),
          //  margin:"3%",
           marginLeft:"3%",
           marginRight:"3%",
           marginTop:"1%",
           marginBottom:"3%",
           borderRadius:15,
      },
});