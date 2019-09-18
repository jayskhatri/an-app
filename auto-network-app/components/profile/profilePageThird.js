
import React from "react";
import { StyleSheet, Text, View, SafeAreaView , Platform , Image ,TextInput,TouchableOpacity } from "react-native";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../header/header';
var options=[
    {label:"Yes",value:0},
    {label:"No",value:1},
  
  ];
export default  class profilePageThird extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: 0,
        auto_number: '',
        has_own_vehicle:'',
        owner_name:'',
        owner_contact_number:'',
      }
      this.previousEvent = this.previousEvent.bind(this);
      this.nextEvent = this.nextEvent.bind(this);
    }
    previousEvent(e){
        this.props.navigation.navigate("ProfilePageSecond");
    }
    nextEvent(e){
        const {navigation} = this.props;

        this.props.navigation.navigate("ProfilePageFourth",
          {
            auto_number: this.state.auto_number, 
            has_own_vehicle: this.state.has_own_vehicle,
            owner_name: this.state.owner_name,
            owner_contact_number: this.state.owner_contact_number,
            
            user: navigation.getParam('user'), 
            first_name: navigation.getParam('first_name'), 
            last_name: navigation.getParam('last_name'),
            birth_date: navigation.getParam('birth_date'), 
            gender: navigation.getParam('gender'),
            aadhar_number:navigation.getParam('aadhar_number'),
            license_number: navigation.getParam('license_number'),
            has_puc: navigation.getParam('has_puc')
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
        <Image style={{marginTop:"18%",width:wp('55%'),height:hp('23%'),resizeMode:"contain"}} source={require('../../assets/bigAdminLogo.png')} />
        </View>
        <View style={styles.signUpView}>
            <View style={{backgroundColor:"#12afe3",borderTopRightRadius:10,borderTopLeftRadius:10,flex:0.12 }}>
                  {/* Scroller code */}
            </View>
            <View style={{  flex:0.20,backgroundColor:"white",borderWidth:0.5}}>
                <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Auto No.</Text>
                </View>
                <View style={{flex:0.60}}>
                    <TextInput
                       placeholder="Enter Your Auto No."
                       onChangeText={(auto_number) => this.setState({auto_number})}
                       value={this.state.auto_number}
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View>
            </View>
            <View style={{flex:0.20,backgroundColor:"white",borderWidth:0.5}}>
            <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"2.5%",marginLeft:'5%'}}>Do you have your own vehivle ?</Text>
                </View>
                <View style={{flex:0.60}}>
                <RadioForm
                          style={{marginLeft:"5%",marginTop:"4%"}} 
                         radio_props={options}
                         initial={0} 
                         onPress={(value)=>{has_own_vehicle:value}}
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
            <View style={{flex:0.22,backgroundColor:"white",borderWidth:0.5}}>
            <View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Owner Name</Text>
                </View>
                <View style={{flex:0.60}}> 
                    <TextInput
                       placeholder="Enter Your vehicle owner name"
                       onChangeText={(owner_name) => this.setState({owner_name})}
                       value={this.state.owner_name}
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View> 
              </View>
              <View style={{flex:0.19,backgroundColor:"white",borderWidth:0.5}}>
              < View style={{flex:0.40}}> 
                    <Text style={{fontSize:18,marginTop:"3%",marginLeft:'5%'}}>Owner Contact No.</Text>
                </View>
                <View style={{flex:0.60}}>
                <TextInput
                       placeholder="Enter Your vehicle owner contact No."
                       onChangeText={(owner_contact_number) => this.setState({owner_contact_number})}
                       value={this.state.owner_contact_number}
                       style={{borderBottomWidth:1,height:35,marginBottom:"1%",marginLeft:"5%",marginRight:"5%"}}
                     /> 
                </View>
              </View>
              <View style={{flex:0.07,backgroundColor:"#12afe3",flexDirection:"row"}}>
                     <TouchableOpacity style={{marginTop:"4%",marginLeft:"5%"}} onPress={this.previousEvent}>
                          <Text style={{fontSize:18}}>Go Back</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{marginTop:"4%",marginLeft:"56%"}} onPress={this.nextEvent}>
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
          alignItems:"center",
        flex:1,
      },
      waveView:{
        flex:Platform.OS === 'ios' ? 0.10 : 0.05,
        },
      logoView:{
        flex: Platform.OS === 'ios' ? 0.35 : 0.40,
      },
      signUpView:{
        flex:Platform.OS === 'ios' ? 0.55 : 0.55,
        backgroundColor:'#12afe3',
           height:"100%",
          width:wp('80%'),
           marginLeft:"3%",
           marginRight:"3%",
           marginBottom:"5%",
           borderRadius:15,
      },
});