import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import firebase from 'firebase';
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
    this.skipEvent = this.skipEvent.bind(this);
    this.nextEvent = this.nextEvent.bind(this);
  }
  submitDetails(){
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    firebase.database().ref('Drivers/' + user.uid).set({
      first_name: navigation.getParam('first_name'),
      email_id: user.email,
      last_name: navigation.getParam('last_name'),
      birth_date: navigation.getParam('birth_date'),
      gender: navigation.getParam('gender'),
      aadhar_number: navigation.getParam('aadhar_number'),
      license_number: navigation.getParam('license_number'),
      has_puc: navigation.getParam('has_puc'),
      auto_number: navigation.getParam('auto_number'),
      has_own_vehicle: navigation.getParam('has_own_vehicle'),
      owner_name: navigation.getParam('owner_name'),
      owner_contact_number: navigation.getParam('owner_contact_number'),
      is_profile_completed: true,
    });
    
    this.props.navigation.navigate('mainScreen');
  }
  skipEvent(e){
    
    const {navigation} = this.props;
    firebase.database().ref('Drivers/').push({
      first_name: navigation.getParam('first_name'),
      last_name: navigation.getParam('last_name'),
      birth_date: navigation.getParam('birth_date'),
      gender: navigation.getParam('gender'),
      aadhar_number: navigation.getParam('aadhar_number'),
      license_number: navigation.getParam('license_number'),
      has_puc: navigation.getParam('has_puc'),
      auto_number: navigation.getParam('auto_number'),
      has_own_vehicle: navigation.getParam('has_own_vehicle'),
      owner_name: navigation.getParam('owner_name'),
      owner_contact_number: navigation.getParam('owner_contact_number'),
      is_profile_completed: false,
    });
    
    this.props.navigation.navigate('mainScreen');
  }
  nextEvent(e){
    this.submitDetails();
  }

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.waveView}>
          <Image
            style={{ width: wp("100%"), height: hp("12%") }}
            source={require("../../assets/wawe.png")}
          ></Image>
        </View>
        <View style={styles.logoView}>
          <Image style={{marginTop:"10%",width:wp('51%'),height:'60%'}} source={require('../../assets/bigAdminLogo.png')} />
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
    flex: 0.05
  },
  logoView: {
    flex: 0.55
  },
  signUpView: {
    flex: 0.4,
    backgroundColor: "#12afe3",
    height: "100%",
    width: wp("92%"),
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "5%",
    borderRadius: 15
  }
});
