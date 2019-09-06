import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import Header from '../header/header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
var options = [{ label: "Yes", value: 0 }, { label: "No", value: 1 }];
export default class profilePageFourth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      image: null,
      isPicLoaded: true
    };
    this.previousEvent = this.previousEvent.bind(this);
    this.nextEvent = this.nextEvent.bind(this);
    this.skipEvent = this.skipEvent.bind(this);
    this.nextEvent = this.nextEvent.bind(this);
  }
  previousEvent(e) {
    this.props.navigation.navigate("ProfilePageSecond");
  }
  nextEvent(e) {
    this.props.navigation.navigate("ProfilePageFourth");
  }
  submitDetails(){
    firebase.database().ref('Drivers/'+this.state.phone_number).set({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      birth_date: this.state.birth_date,
      gender: this.state.gender,
      aadhar_number: this.state.aadhar_number,
      license_number: this.state.license_number,
      has_puc: this.state.has_puc,
      auto_reg_no: this.state.auto_reg_no,
      has_own_vehicle: this.state.has_own_vehicle,
      owner_name: this.state.owner_name,
      owner_contact_number: this.state.owner_contact_number,
    });
    this.setState(
      {
        has_own_vehicle: false,
        owner_name: "",
        owner_contact_number: "",
      }
    );
    this.props.navigation.navigate('mainScreen');
  }
  skipEvent(e){
    this.nextEvent();
  }
  nextEvent(e){
    this.props.navigation.navigate("mainScreen");
  }

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.waveView}>
          {/* <Image
            style={{ width: wp("100%"), height: hp("12%") }}
            source={require("../../assets/wawe.png")}
          ></Image> */}
              <SafeAreaView style={{backgroundColor:"#269DF9"}}>
                  <Text style={{alignSelf:"center",color:"#fff",fontSize:25,marginTop:Platform.OS === 'android' ? "4%" : "0%"}}>My Profile</Text>
                  <Header />
              </SafeAreaView>
        </View>
        <View style={styles.logoView}>
          <Image style={{marginTop:"30%",width:wp('55%'),height:hp('23%'),resizeMode:"contain"}} source={require('../../assets/bigAdminLogo.png')} />
        </View>
        <View style={styles.signUpView}>
          <View style={{ flex: 2, alignItems: "center", marginTop: "3%" }}>
            <Text style={{ fontSize: 25, color: "white" }}>Add Your Photo</Text>
          </View>
          <View
            style={{
              flex: 3,
              backgroundColor: "#fff",
              margin: 20,
              borderRadius: 20
            }}
          >
            <TouchableOpacity onPress={this._pickImage}>
              {/* ,elevetion:11 */}
              {this.state.isPicLoaded ? (
                <Image
                  style={{
                    height: 120,
                    width: 120,
                    alignSelf: "center",
                    marginTop: -50,
                    borderRadius:60
                  }}
                  source={require("../../assets/Component.png")}
                />
              ) : (
                <Image
                  style={{
                    height: 120,
                    width: 120,
                    alignSelf: "center",
                    marginTop: -50,
                    borderRadius: 60
                  }}
                  source={{ uri: image }}
                ></Image>
              )}
            </TouchableOpacity>

            <Text
              style={{
                marginTop: "5%",
                alignSelf: "center",
                fontSize: 20,
                color: "#c9c8c8"
              }}
            >
              Hello, dear
            </Text>
          </View>
          <View style={{flex:0.80,flexDirection:"row"}}>
             <TouchableOpacity style={{marginLeft:"3%",marginTop:"1%"}} onPress={this.skipEvent}>
               <Text style={{fontSize:15 , color:"#fff"}}>Skip</Text>
               </TouchableOpacity>
             <TouchableOpacity style={{marginTop:"1%",marginLeft:"78%"}} onPress={this.nextEvent}>
               <Text style={{fontSize:15 , color:"#fff"}}>Next</Text>
               </TouchableOpacity> 
          </View>
        </View>
      </View>
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ isPicLoaded: false });
      this.setState({ image: result.uri });
    }
  };
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  waveView: {
    flex:Platform.OS === 'ios' ? 0.10 : 0.05,
  },
  logoView: {
    flex: Platform.OS === 'ios' ? 0.35 : 0.55,
  },
  signUpView: {
    flex:Platform.OS === 'ios' ? 0.55 : 0.40,
    backgroundColor: "#12afe3",
    height: "100%",
    width: wp("92%"),
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "5%",
    borderRadius: 15
  }
});
