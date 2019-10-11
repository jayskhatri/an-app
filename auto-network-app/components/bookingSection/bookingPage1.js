import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import OptionsMenu from "react-native-options-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Header from "../header/header";
import firebase from "firebase";
import MapPicker from "react-native-map-picker";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import requestLocationPermission from "../utils/askForPermission";
import * as geolib from "geolib";
import SearchableDropdown from "react-native-searchable-dropdown";

var source_place = [
  //name key is must.It is to show the text in front
  { id: 1, name: "Current position" },
  { id: 2, name: "codepen" },
  { id: 3, name: "envelope" },
  { id: 4, name: "etsy" },
  { id: 5, name: "facebook" },
  { id: 6, name: "foursquare" },
  { id: 7, name: "github-alt" },
  { id: 8, name: "github" },
  { id: 9, name: "gitlab" },
  { id: 10, name: "instagram" }
];
var destination_place = [
  //name key is must.It is to show the text in front
  { id: 1, name: "Current position" },
  { id: 2, name: "codepen" },
  { id: 3, name: "envelope" },
  { id: 4, name: "amazon" },
  { id: 5, name: "facebook" },
  { id: 6, name: "foursquare" },
  { id: 7, name: "github-alt" },
  { id: 8, name: "github" },
  { id: 9, name: "gitlab" },
  { id: 10, name: "instagram" }
];
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class BookingPageOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      source: "",
      user: "",
      destination: "",
      notification: {},
      lastPosition: {
        coords: {
          latitude: 22.6007418,
          longitude: 72.8255146
        }
      },
      isReadyToLoad: false,

      // this will get true when user clicks find location inside modal
      modalMarkerLocation: 0
    };
    this.previousEvent = this.previousEvent.bind(this);
    this.handleSetSource = this.handleSetSource.bind(this);
    this.handleSetDestination = this.handleSetDestination.bind(this);
    this.nextEvent = this.nextEvent.bind(this);

  }



  handleSetSource = e => {
    const temp = e.nativeEvent.text;
    this.setState({ source: temp });
  };

  handleSetDestination = e => {
    const temp = e.nativeEvent.text;
    this.setState({ destination: temp });
  };

  async nextEvent(e) {
    this.props.navigation.navigate("BookingPageSecond",{
      source:this.state.source,
      destination:this.state.destination
    });

  }

  previousEvent() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          width:"100%",
          flex:.035,
          backgroundColor:"#269DF9"
        }}/>
        <SafeAreaView
        style={{
          flex: Platform.OS === "ios" ? 0.08 : 0.08,
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center",
          backgroundColor: "#269DF9",
          }}>
              <TouchableOpacity
                style={{
                  flex:0.1,
                  height:"100%",
                  alignItems:"center",
                  justifyContent:"center",
                }}
                onPress={this.previousEvent}>
                  <Image
                    style={{
                      maxHeight:60,
                      maxWidth:60,
                      resizeMode:"contain",
                    }}
                    source={require("../../assets/back1.png")}
                  />
              </TouchableOpacity>
              <View
              style={{
                flex:0.8,
                alignItems:"center",
                justifyContent:"center"
              }}
              >
              <Text style={{
                alignItems:"center",
                justifyContent:"center",
                color:"#fff",
                textAlignVertical:"center",
                fontSize:22
              }}>Book Your Tickets</Text>
            </View>
            <View
             style={{
              flex:0.1,
              height:"100%",
              alignItems:"center",
              justifyContent:"center"
            }}>
              <OptionsMenu
                button={require("../../assets/More.png")}
                buttonStyle={{
                  maxHeight:30,
                    maxWidth:30,
                    resizeMode:"contain",
                    alignItems:"center",
                    justifyContent:"center"
                }}
                destructiveIndex={1}
                options={["Edit", "Delete", "Cancel"]}
                actions={[this.editPost, this.deletePost]}
              />
            </View>
        </SafeAreaView>
        <View style={{
          flex: Platform.OS === "ios" ? 0.35: 0.35,
          alignItems:"center",
          backgroundColor: "#269DF9",
        }}>
          <View style={{
            flex:0.9,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
          }}>
            <View style={{
              flex:0.1,
              alignItems:"center",
              justifyContent:"center",
              height:"100%",
            }}>
              <Image
                style={{
                  maxHeight:"60%",
                  maxWidth:"60%",
                  resizeMode:"contain",
                }}
                source={require("../../assets/so_de_icon_side_line.png")}
              />
            </View>
            <View style={{
              flex:0.8,
              flexDirection:"column",
              alignItems:"center",
              justifyContent:"space-around",
              height:"100%",
            }}>

                  <SearchableDropdown
                    containerStyle={{
                      width:"100%",
                      height:"25%",
                      borderRadius:30,
                      borderWidth:1,
                      borderColor:"#FFF",
                      alignItems:"center",
                      justifyContent:"center",
                      paddingLeft:"5%",
                      paddingRight:"5%",
                      zIndex:1,
                      position:"relative"
                    }}

                    itemsContainerStyle={{
                      width:"100%",
                      maxHeight:150,
                      padding:"2%",
                      position:"absolute",
                      top:"100%",
                      backgroundColor:"#fff",
                      borderBottomRightRadius:15,
                      borderTopLeftRadius:15,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1
                      },
                      shadowOpacity: 1.5,
                      shadowRadius: 5,
                      elevation: 4
                    }}

                    itemStyle={{
                      paddingVertical:"5%",
                      paddingLeft:"5%"
                    }}
                    itemTextStyle={{
                      color:"#222"
                    }}


                    selectedItems={this.state.source}
                    onItemSelect={item => {
                      const items = this.state.source;
                      if (item.name == "Current position") {
                        // write a code for current position
                      }
                      this.setState({ source: items });
                    }}

                    items={source_place}

                    textInputProps={{
                      // value={this.state.source}
                      // onChange={this.handleSetSource} //TODO
                      placeholder:"choose starting point, or click on the map ",
                      fontSize: 14,
                      placeholderTextColor:"#fff",
                      style: {
                        borderBottomColor:"#c3c3c3",
                        borderBottomWidth:1,
                        color:"#fff",
                        zIndex:2
                      }
                    }}

                    listProps={{
                      nestedScrollEnabled:true,
                    }}
                  />

                  <SearchableDropdown
                    containerStyle={{
                      width:"100%",
                      height:"25%",
                      borderRadius:30,
                      borderWidth:1,
                      borderColor:"#FFF",
                      alignItems:"center",
                      justifyContent:"center",
                      paddingLeft:"5%",
                      paddingRight:"5%",
                      zIndex:0,
                      position:"relative"
                    }}

                    itemsContainerStyle={{
                      width:"100%",
                      maxHeight:150,
                      padding:"2%",
                      position:"absolute",
                      top:"100%",
                      backgroundColor:"#fff",
                      borderBottomRightRadius:15,
                      borderTopLeftRadius:15,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1
                      },
                      shadowOpacity: 1.5,
                      shadowRadius: 5,
                      elevation: 4
                    }}

                    itemStyle={{
                      paddingVertical:"5%",
                      paddingLeft:"5%"
                    }}
                    itemTextStyle={{
                      color:"#222"
                    }}

                    multi={true}
                    selectedItems={this.state.destination}
                    onItemSelect={item => {
                      const items = this.state.destination;
                      if (item.name == "Current position") {
                        // write a code for current position
                      }
                      // items.push(item);
                      this.setState({ destination: items });
                    }}

                    items={destination_place}
                    chip={true}
                    resetValue={false}

                    textInputProps={{

                      placeholder:"choose destination point, or click on the map ",
                      fontSize: 14,
                      placeholderTextColor:"#fff",

                      style: {
                        borderBottomColor:"#c3c3c3",
                        borderBottomWidth:1,
                        color:"#fff",
                        zIndex:2
                      }
                    }}

                    listProps={{
                      nestedScrollEnabled: true
                    }}
                  />
            </View>

                <TouchableOpacity style={{
                 flex:0.1,
                 alignItems:"center",
                 justifyContent:"center",
              }}>
                <Image
                  style={{
                    maxHeight:25,
                    maxWidth:25,
                    resizeMode:"contain"
                  }}
                  source={require("../../assets/sawap_icon.png")}
                />
              </TouchableOpacity>
          </View>







          <View style={{
            flex:0.15,
            alignItems:"center",
            justifyContent:"center",
            width:"100%",
            height:"100%",
            zIndex:-2,
          }}>
            <TouchableOpacity
              style={{
                width:"30%",
                height:"100%",
                backgroundColor:"#fff",
                borderRadius:30,
                alignItems:"center",
                justifyContent:"center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowOpacity: 1.5,
                shadowRadius: 5,
                elevation: 4
              }}
              onPress={this.nextEvent}
            >
              <Text style={{
                color:"#269DF9",
                fontSize:18,
                fontWeight:"bold",
                margin:"5%"
              }}> Next </Text>
            </TouchableOpacity>
          </View>

          </View>

<View style={{
          flex:0.10,
          alignItems:"flex-start",
          justifyContent:"center",
          zIndex:-20,
        }}>
          <Image
            style={{
              width:"100%",
              height:"100%",
              resizeMode:"stretch"
            }}
            source={require("../../assets/wawe.png")}
          ></Image>
        </View>






        <View style={styles.mapView}>
          <View style={styles.mapTextView}>
            <Text style={styles.mapTextCss}>
              find your destination on map
            </Text>
          </View>
          <View style={styles.mapViewBorder}>
            <MapPicker style={styles.map}
              minZoomLevel={10}
              initialCoordinate={{
                latitude: 22.5975015,
                longitude: 72.8238184,
              }}

              buttonStyle={{
                width:undefined,
                backgroundColor:"#008CF8",
                borderRadius:50,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowOpacity: 1.5,
                shadowRadius: 5,
                elevation: 4
              }}
              textStyle={{
                margin:"5%"
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
    flex: 1
  },
  mapView: {
    flex:0.70,
  },
  mapTextView: {
    flex: 0.05,
    marginLeft: "25%",
    marginRight: "25%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: 0.5,
  },
  mapTextCss: {
    color: "#bbbbbb",
    backgroundColor:"transparent",
  },
  mapViewBorder: {
    flex: 0.95,
    marginTop: "2.5%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow:"hidden",
    position:"relative",
    backgroundColor:"transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: Platform.OS === "ios" ? 10: 50,
    elevation:10
  },
  map:{
    width:"100%",
    height:"100%",
    position:"absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
  }
});
