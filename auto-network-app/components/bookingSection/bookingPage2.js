
import React from "react";
import { StyleSheet, Text, View, SafeAreaView , Platform , Image ,TextInput,TouchableOpacity } from "react-native";
import OptionsMenu from "react-native-options-menu";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../header/header';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker'

export default  class profilePageSecond extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
  render() {
    return(
        <View style={styles.container}>
            <View style={{ flex:Platform.OS === 'ios' ? 0.10 : 0.08}}>
            <SafeAreaView style={styles.header}>
                       <View>
                            <Image 
                                 style={styles.backImage} 
                                 source={require("../../assets/back1.png")} 
                             /> 
                       </View>
                       <View>
                           <Text style={styles.headerText} >Continue Booking</Text>
                       </View>
                       <View>
                             <OptionsMenu
                                button={require("../../assets/More.png")}
                                buttonStyle={styles.optionButton}
                                destructiveIndex={1}
                                options={["Edit", "Delete", "Cancel"]}
                                actions={[this.editPost, this.deletePost]}
                             />
                       </View>
            </SafeAreaView>  
            </View>
            <View style={styles.inputView}>

                <View style={styles.S_D_view}>
                      <View style={styles.sourceTODestinationLine}>
                            <Image 
                                 style={styles.sourceTOdestinationImage} 
                                 source={require("../../assets/so_de_icon_side_line.png")} 
                             /> 
                      </View>
                      <View style={styles.S_D_input_view}>
                            <View style={styles.s_input_view}>
                                  <View style={styles.outter_view_s_input}>
                                        <TextInput 
                                            style={styles.signInTextInputOne}
                                            placeholder="choose starting point, or click on the map  "
                                            placeholderTextColor="#fff"
                                            fontSize={14}
                                            onChange={this.handleSetEmail}
                                        />
                                  </View>
                            </View>
                            <View style={styles.d_input_view}>
                                    <View style={styles.outter_view_s_input}>
                                                <TextInput 
                                                    style={styles.signInTextInputOne}
                                                    placeholder="choose starting point, or click on the map  "
                                                    placeholderTextColor="#fff"
                                                    fontSize={14}
                                                    onChange={this.handleSetEmail}
                                                />
                                        </View>
                            </View>

                      </View>


                </View>
                <View style={styles.Input_Date_Time_view}>
                    <View style={styles.outter_view_Input_Date_Time}>
                        <View style={ styles.header_view_D_T}>
                            <View style={styles.header_DT_logo_view}>
                              <View style={styles.outterViewOfDtIcon}>
                                  <Image 
                                            style={styles.date_time_Image} 
                                            source={require("../../assets/ccalender_and_clock_icon.png")} 
                                        />
                              </View>
                               
                            </View>
                            <View style={styles.header_DT_text_view}>
                               <Text style={styles.header_D_T_text}>Journey Date And Time</Text>
                            </View>
                        </View>
                        <View style={styles.enter_Date_Time_View}>
                          <View style={{flex:0.60/*,backgroundColor:"red"*/}}>
                              <DatePicker
                                      style={{width:wp('50%')}}
                                      date={this.state.birthdate}
                                      // onChange = {this.changeBirthDateEvent} 
                                      mode="date"
                                      placeholder="Enter date (dd/mm/yy)"
                                      placeholderTextColor="yellow"
                                      format="DD-MM-YY"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                                  dateIcon: {
                                                            width:wp('0%'),
                                                            // position: 'absolute',
                                                            // left: 0,
                                                            // top: 20,
                                                            backgroundColor:"yellow",
                                                            // marginLeft:'1%',
                                                            // resizeMode:"contain"
                                                            },
                                                  dateInput: {
                                                            width:"100%",
                                                            marginLeft:"4%",
                                                            borderWidth:0,
                                                            color:"black",
                                                            position: 'absolute',
                                                            left: 0,
                                                            top: 22,
                                                              }
                                                      }}
                                                    onDateChange={(date) => this.setState({birthdate:date})}                                                
                              />
                            </View>
                            <View style={{flex:0.40,flexDirection:"row",marginLeft:"5%"}}>
                               <TouchableOpacity >
                                 <Text style={styles.date_today_today}>Today</Text>
                               </TouchableOpacity>
                               <Text style={{position:"absolute",bottom:3,marginLeft:"33%",color:"#fff"}}> | </Text>
                               <TouchableOpacity style={{        marginLeft:"42%",}}>
                                 <Text style={styles.date_today_tomorrow}>Tomorrow</Text>
                               </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.enter_Date_Time_View}>
                            
                        </View>
                    </View>
                </View> 


            </View>

        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
      },
      header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#269DF9',
        paddingTop:Platform.OS === 'android' ? "5%" : "0%",
      },
      backImage:{
        height:60,
        width:60 ,
        marginTop:"-22%",
        resizeMode:"contain"
      },
      headerText:{
        flex:1,
        alignSelf:"center",
        color:"#fff",
        fontSize:30,
      },
      optionButton:{
        width: 32 , 
        height:35,
        marginRight:"3%",
        resizeMode: "contain"
      },
      inputView:{
          flex:0.70,
          backgroundColor:"#269DF9"
      },
      S_D_view:{
          flex:0.33,
        //   backgroundColor:"orange",
          flexDirection:"row"
      },
      sourceTODestinationLine:{
        flex:0.15,
        // backgroundColor:"red",
        alignItems:"center",
        justifyContent:"center"
      },
      sourceTOdestinationImage:{
        height:120,
        width:60,
        alignSelf:"center",
        resizeMode:"contain"
      },
      S_D_input_view:
      {
        flex:0.85,
        // backgroundColor:"lightgray",
        flexDirection:"column"
      },
      s_input_view:{
          flex:0.50,
        //   backgroundColor:"yellow",
          alignItems:"center",
          justifyContent:"center"
      },
      d_input_view:{
        flex:0.50,
        alignItems:"center",
          justifyContent:"center"
    },
      outter_view_s_input:{
        borderWidth:0.5,
        height:"38%",
        width:"90%",
        position:"absolute",
        left:0,
        borderRadius:25,
        borderColor:"#fff",
      },
      signInTextInputOne:{
        paddingLeft:"2%",
        width:"95%",
        marginLeft:"3%",
        marginRight:"3%",
        position:"absolute",
        bottom:6,
        borderRadius:15,
        borderBottomColor:"#988c8c",
        borderBottomWidth:1,
      },
      Input_Date_Time_view:{
          flex:0.35,
          backgroundColor:"orange",
          alignItems:"center",
          justifyContent:"center"
      },
      outter_view_Input_Date_Time:{
          width:"90%",
          height:"85%",
          padding:"2%",
          backgroundColor:"lightblue",
          borderRadius:25
      },
      header_view_D_T:{
         flex:0.25,
         backgroundColor:"lightblue", 
        flexDirection:"row",
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        justifyContent:"space-between",
      },
      date_time_Image:{
            height:30   ,
            width:30 ,
            // marginLeft:"6%",
            // marginTop:"6%",
            alignSelf:"center",
            // position:"absolute",
            // left:4,
            // top:4,
            resizeMode:"contain",
            // borderRadius:10,
      },
      header_DT_logo_view:{
        flex:0.15,
        alignItems:"center",
        justifyContent:"center",
      },
      outterViewOfDtIcon:{
        width:40,
        padding:"5%",
        backgroundColor:"#269DF9",
        borderRadius:10,
      },
      header_DT_text_view:{
        flex:0.85,
        alignItems:"center",
        justifyContent:"center",
        borderBottomWidth:2,
        borderBottomColor:"#fff",
        marginLeft:"2%",
        marginRight:"2%"
        // backgroundColor:"red"
      },
      header_D_T_text:{
        alignSelf:"center",
        color:"#000",
        fontSize:20,
        // position:"absolute",
        // bottom:15
        // backgroundColor:"red"
      },
      enter_Date_Time_View:{
        flex:0.30,
        marginTop:"2%",
        marginLeft:"10%",
        marginRight:"5%",
        borderBottomWidth:1.5,
        borderBottomColor:"#fff",
        flexDirection:"row"
      },
      // enterTimeView:{
      //   flex:0.30,
      //   marginTop:"2%",
      //   marginLeft:"10%",
      //   borderBottomWidth:1.5,
      //   borderBottomColor:"#fff",
      //   marginRight:"5%",
      // },
      date_today_tomorrow:{
        color:"#fff",
        position:"absolute",
        bottom:3,

      },
      date_today_today:{
        position:"absolute",
        bottom:3,
        color:"#fff"
      }

    

});