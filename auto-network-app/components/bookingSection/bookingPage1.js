
import React from "react";
import { StyleSheet, Text, View, SafeAreaView , Platform , Image ,TextInput,TouchableOpacity } from "react-native";
import OptionsMenu from "react-native-options-menu";
import RadioForm,{RadioButton,RadioButtonInput,RadioButtonLabel} from "react-native-simple-radio-button";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../header/header';
import firebase from 'firebase';
import MapPicker from "react-native-map-picker";
import requestLocationPermission from '../utils/askForPermission'

export default  class profilePageSecond extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        source:"",
        destination:"",
        lastPosition: {
          coords: {
            latitude: 22.6007418,
            longitude: 72.8255146,
          }
        },
        isReadyToLoad:false,
        // this will get true when user clicks find location inside modal
        modalMarkerLocation: 0, 
      }
      this.handleSetSource = this.handleSetSource.bind(this);
      this.handleSetDestination = this.handleSetDestination.bind(this);
      this.nextEvent = this.nextEvent.bind(this);
      this._findUserPosition = this._findUserPosition.bind(this);

    }
    
    async componentDidMount(){
      await this._findUserPosition();
    }
    
    _findUserPosition = (e) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = position;
          this.setState({
            initialPosition,
            lastPosition: position
          });
          this.setState({
            isReadyToLoad:true,
          })
          console.log("position", position);
          // this._enableTheButton();
          // if e exists then the call is from inside the map modal
          if (typeof e !== "undefined") {
            this.setState({
              modalMarkerLocation: initialPosition
            })
          }
        },
        (error) => {
          console.log('inside error', error);
          this.setState({
            locationServices: false
          });
        },
        {timeout: 100000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = position;
        // TODO: check why allowing this console is run many times - might be from
        // the geolocation trying to find the exact location of the user
        console.log(position);
        this.setState({
          lastPosition: position
        });
      });
    }
    
    async componentWillMount(){
        await requestLocationPermission();
    }
  
    handleSetSource(e){
      const temp = e.nativeEvent.text;
      this.setState({source:temp});
    }
    
    handleSetDestination(e){
      const temp = e.nativeEvent.text;
      this.setState({destination:temp});
    }
    
    nextEvent(e){
      this.props.navigation.navigate("BookingPageSecond");
    }
    // renderMap(){
    //   return(
      //   <View style={styles.container}>
      //     <View style={{ flex:Platform.OS === 'ios' ? 0.10 : 0.08}}>
      //     <SafeAreaView style={styles.header}>
      //               <View>
      //                     <Image 
      //                         style={styles.backImage} 
      //                         source={require("../../assets/back1.png")} 
      //                     /> 
      //               </View>
      //               <View>
      //                   <Text style={styles.headerText}>Book Your Tickets</Text>
      //               </View>
      //               <View>
      //                     <OptionsMenu
      //                         button={require("../../assets/More.png")}
      //                         buttonStyle={styles.optionButton}
      //                         destructiveIndex={1}
      //                         options={["Edit", "Delete", "Cancel"]}
      //                         actions={[this.editPost, this.deletePost]}
      //                     />
      //               </View>
      //     </SafeAreaView>  
      //     </View>
      //     <View style={styles.enterSourceDestinationView}>
            
      //       <View style={styles.sourceDestinationInputView}>

      //               <View style={styles.sourceTODestinationLine}>
      //                     <Image 
      //                         style={styles.sourceTOdestinationImage} 
      //                         source={require("../../assets/so_de_icon_side_line.png")} 
      //                     /> 
      //               </View>
      //               <View style={styles.inputView}>
      //                 <View style={{flex:0.50,/*backgroundColor:"green"*/}}>
      //                       <View style={styles.outterLookOfInputBox}>
      //                           <TextInput 
      //                             style={styles.signInTextInputOne}
      //                             placeholder="choose starting point, or click on the map  "
      //                             placeholderTextColor="#fff"
      //                             fontSize={14}
      //                             value = {this.state.source}
      //                             onChange={this.handleSetSource}
      //                           />
      //                           </View>
      //                           <Text style={styles.textCss}>choose current location</Text>
      //                 </View>
      //                 <View style={{flex:0.50,/*backgroundColor:"green"*/}}>
      //                       <View style={styles.outterLookOfInputBoxSecond}>
      //                           <TextInput 
      //                             style={styles.signInTextInputOne}
      //                             placeholder="choose destination "
      //                             placeholderTextColor="#fff"
      //                             fontSize={14}
      //                             value = {this.state.destination}
      //                             onChange={this.handleSetDestination}
      //                           />
      //                           </View>
                              
      //                 </View>
      //               </View>
      //               <View style={styles.sourceDestinationSwapIcon}>
      //                 <TouchableOpacity>
      //                       <Image 
      //                           style={styles.swapIcon} 
      //                           source={require("../../assets/sawap_icon.png")} 
      //                       />   
      //                   </TouchableOpacity>
      //               </View>

      //       </View>
      //         <View style={styles.nextButtonView}>
      //             <TouchableOpacity style={styles.nextButtonCss} onPress={this.nextEvent}>
      //                 <Text  style={styles.nextButtonTextCss} > next </Text>
      //             </TouchableOpacity>
      //         </View>
      //     </View>
      //     <View style={styles.waveView}>
      //         <Image
      //         style={styles.waveImageCss}
      //         source={require("../../assets/wawe.png")}
      //         ></Image>
      //     </View>
      //     <View style={styles.mapView}>
      //         <View style={styles.mapTextView}> 
      //             <Text style={styles.mapTextCss}> find your destination on map </Text> 
      //         </View>
      //         <View style={styles.mapViewBorder}>
      //         <MapPicker
      //           initialCoordinate={{
      //             latitude: this.state.lastPosition.coords.latitude,
      //             longitude: this.state.lastPosition.coords.longitude,
      //           }}
      //           onLocationSelect={({latitude, longitude})=>console.log(longitude)}
      //         />
      //         </View>
      //     </View>
          
      // </View>   
  
    // renderMap1(){
    //   return(
    //     <View style={styles.container}>
    //       <View style={{ flex:Platform.OS === 'ios' ? 0.10 : 0.08}}>
    //       <SafeAreaView style={styles.header}>
    //                 <View>
    //                       <Image 
    //                           style={styles.backImage} 
    //                           source={require("../../assets/back1.png")} 
    //                       /> 
    //                 </View>
    //                 <View>
    //                     <Text style={styles.headerText}>Book Your Tickets</Text>
    //                 </View>
    //                 <View>
    //                       <OptionsMenu
    //                           button={require("../../assets/More.png")}
    //                           buttonStyle={styles.optionButton}
    //                           destructiveIndex={1}
    //                           options={["Edit", "Delete", "Cancel"]}
    //                           actions={[this.editPost, this.deletePost]}
    //                       />
    //                 </View>
    //       </SafeAreaView>  
    //       </View>
    //       <View style={styles.enterSourceDestinationView}>
            
    //         <View style={styles.sourceDestinationInputView}>

    //                 <View style={styles.sourceTODestinationLine}>
    //                       <Image 
    //                           style={styles.sourceTOdestinationImage} 
    //                           source={require("../../assets/so_de_icon_side_line.png")} 
    //                       /> 
    //                 </View>
    //                 <View style={styles.inputView}>
    //                   <View style={{flex:0.50,/*backgroundColor:"green"*/}}>
    //                         <View style={styles.outterLookOfInputBox}>
    //                             <TextInput 
    //                               style={styles.signInTextInputOne}
    //                               placeholder="choose starting point, or click on the map  "
    //                               placeholderTextColor="#fff"
    //                               fontSize={14}
    //                               value = {this.state.source}
    //                               onChange={this.handleSetSource}
    //                             />
    //                             </View>
    //                             <Text style={styles.textCss}>choose current location</Text>
    //                   </View>
    //                   <View style={{flex:0.50,/*backgroundColor:"green"*/}}>
    //                         <View style={styles.outterLookOfInputBoxSecond}>
    //                             <TextInput 
    //                               style={styles.signInTextInputOne}
    //                               placeholder="choose destination "
    //                               placeholderTextColor="#fff"
    //                               fontSize={14}
    //                               value = {this.state.destination}
    //                               onChange={this.handleSetDestination}
    //                             />
    //                             </View>
                              
    //                   </View>
    //                 </View>
    //                 <View style={styles.sourceDestinationSwapIcon}>
    //                   <TouchableOpacity>
    //                         <Image 
    //                             style={styles.swapIcon} 
    //                             source={require("../../assets/sawap_icon.png")} 
    //                         />   
    //                     </TouchableOpacity>
    //                 </View>

    //         </View>
    //           <View style={styles.nextButtonView}>
    //               <TouchableOpacity style={styles.nextButtonCss} onPress={this.nextEvent}>
    //                   <Text  style={styles.nextButtonTextCss} > next </Text>
    //               </TouchableOpacity>
    //           </View>
    //       </View>
    //       <View style={styles.waveView}>
    //           <Image
    //           style={styles.waveImageCss}
    //           source={require("../../assets/wawe.png")}
    //           ></Image>
    //       </View>
    //       <View style={styles.mapView}>
    //           <View style={styles.mapTextView}> 
    //               <Text style={styles.mapTextCss}> find your destination on map </Text> 
    //           </View>
    //           <View style={styles.mapViewBorder}>
                
    //           </View>
    //       </View>
          
    //   </View>   
    //   ); 
    // }
    render() {
    const { isReadyToLoad } = this.state;
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
                        <Text style={styles.headerText}>Book Your Tickets</Text>
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
          <View style={styles.enterSourceDestinationView}>
            
            <View style={styles.sourceDestinationInputView}>

                    <View style={styles.sourceTODestinationLine}>
                          <Image 
                              style={styles.sourceTOdestinationImage} 
                              source={require("../../assets/so_de_icon_side_line.png")} 
                          /> 
                    </View>
                    <View style={styles.inputView}>
                      <View style={{flex:0.50,/*backgroundColor:"green"*/}}>
                            <View style={styles.outterLookOfInputBox}>
                                <TextInput 
                                  style={styles.signInTextInputOne}
                                  placeholder="choose starting point, or click on the map  "
                                  placeholderTextColor="#fff"
                                  fontSize={14}
                                  value = {this.state.source}
                                  onChange={this.handleSetSource}
                                />
                                </View>
                                <Text style={styles.textCss}>choose current location</Text>
                      </View>
                      <View style={{flex:0.50,/*backgroundColor:"green"*/}}>
                            <View style={styles.outterLookOfInputBoxSecond}>
                                <TextInput 
                                  style={styles.signInTextInputOne}
                                  placeholder="choose destination "
                                  placeholderTextColor="#fff"
                                  fontSize={14}
                                  value = {this.state.destination}
                                  onChange={this.handleSetDestination}
                                />
                                </View>
                              
                      </View>
                    </View>
                    <View style={styles.sourceDestinationSwapIcon}>
                      <TouchableOpacity>
                            <Image 
                                style={styles.swapIcon} 
                                source={require("../../assets/sawap_icon.png")} 
                            />   
                        </TouchableOpacity>
                    </View>

            </View>
              <View style={styles.nextButtonView}>
                  <TouchableOpacity style={styles.nextButtonCss} onPress={this.nextEvent}>
                      <Text  style={styles.nextButtonTextCss} > next </Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={styles.waveView}>
              <Image
              style={styles.waveImageCss}
              source={require("../../assets/wawe.png")}
              ></Image>
          </View>
          <View style={styles.mapView}>
              <View style={styles.mapTextView}> 
                  <Text style={styles.mapTextCss}> find your destination on map </Text> 
              </View>
              <View style={styles.mapViewBorder}>
              <MapPicker
                initialCoordinate={{
                  latitude: this.state.lastPosition.coords.latitude,
                  longitude: this.state.lastPosition.coords.longitude,
                }}
                onLocationSelect={({latitude, longitude})=>console.log(longitude)}
              />
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
      enterSourceDestinationView:{
        flex:Platform.OS === 'ios' ? 0.40 : 0.42,
        backgroundColor:"#269DF9",
        paddingTop : "2%",
      },
      sourceDestinationInputView:{
        // backgroundColor:"blue",
        flex:0.80,
        // marginTop:Platform.OS ? "4%" : "0%" ,
        flexDirection:"row"
      },
      sourceTODestinationLine:{
        flex:0.15,
        // backgroundColor:"red",
        alignItems:"center",
        justifyContent:"center"
      },
      nextButtonView:{
        flex:0.20,
        alignItems:"center",
        justifyContent:"center",
        marginTop:Platform.OS === 'ios' ? "-18%" : "-14%",

      },
      sourceTOdestinationImage:{
        height:120,
        width:60,
        alignSelf:"center",
        resizeMode:"contain"
      },
      inputView:{
        flex:0.75,
        flexDirection:"column",
        // backgroundColor:"orange"
      },
      outterLookOfInputBox:{
        borderWidth:0.5,
        height:"30%",
        marginTop:Platform.OS === 'ios' ? "28%" : "23%" ,
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
      textCss:{
        alignSelf:"center",
        color:"#fff",
        fontSize:10
      },
      outterLookOfInputBoxSecond:{
        borderWidth:0.5,
        height:"30%",
        marginTop:"5%",
        borderRadius:25,
        borderColor:"#fff"
      },
      sourceDestinationSwapIcon:
      {
          flex:0.10,
          // backgroundColor:"red",
          alignItems:"center",
          justifyContent:"center"
      },
      swapIcon:{
        height:25,
        width:25,
        alignSelf:"center"
      },
      nextButtonCss:{
        alignSelf:"center",
        width:"35%",
        height:"55%",
        backgroundColor:"#fff",
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center"
      },
      nextButtonTextCss:{
        color:"#269DF9",
        alignSelf:"center",
        fontSize:20
      },
      waveView:{
        flex:Platform.OS === 'ios' ? 0.10 : 0.11,
      },
      waveImageCss:{
        width: wp("100%"), 
        height: hp("13%"),
        marginTop:Platform.OS === 'ios' ? "-6%" : "-3%",
        resizeMode:"contain" 
      },
      mapView:{
          flex : Platform.OS === 'ios' ? 0.40 : 0.39 ,
          backgroundColor:"#fff"
      },
      mapViewBorder:{
        flex:0.90,
        marginTop:"1%",
        width:"100%",
        height:"100%",
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        backgroundColor:"lightblue"
      },
      mapTextView:{
        flex:0.10,
        marginLeft:"25%",
        marginRight:"25%",
        alignItems:"center",
        justifyContent:"center",
        borderBottomColor:"#bbbbbb",
        borderBottomWidth:0.5,

      },
      mapTextCss:{
        position:"absolute",
        bottom:0,
        color:"#bbbbbb",
      }
});