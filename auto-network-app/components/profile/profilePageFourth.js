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
  Alert
} from "react-native";
import firebase from 'firebase';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import Header from '../header/header';
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";


var options = [{ label: "Yes", value: 0 }, { label: "No", value: 1 }];
export default class profilePageFourth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      image: null,
      isPicLoaded: true,
      downloadUrl:'',
      result:'',
      uploading:false
    };
    this.skipEvent = this.skipEvent.bind(this);
    this.nextEvent = this.nextEvent.bind(this);
    // this.uriToBlob = this.uriToBlob.bind(this);
  }
  componentWillMount(){
    let storageRef = firebase.storage().ref();

  }
  submitUserDetails(){
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    const thirtySecs = 30 * 1000;
    firebase.storage().setMaxOperationRetryTime(thirtySecs)

    firebase.database().ref('Passengers/' + user.uid + '/personal_details').set({
      profile_pic_url: this.state.downloadUrl,
      first_name: navigation.getParam('first_name'),
      email_id: user.email,
      last_name: navigation.getParam('last_name'),
      birth_date: navigation.getParam('birth_date'),
      gender: navigation.getParam('gender'),
      // aadhar_number: navigation.getParam('aadhar_number'),
      // license_number: navigation.getParam('license_number'),
      // has_puc: navigation.getParam('has_puc'),
      // auto_number: navigation.getParam('auto_number'),
      // has_own_vehicle: navigation.getParam('has_own_vehicle'),
      // owner_name: navigation.getParam('owner_name'),
      // owner_contact_number: navigation.getParam('owner_contact_number'),
      has_profile_completed: true,
    });
    
    this.props.navigation.navigate('mainScreen');
  }
 

  skipEvent(e){
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    firebase.database().ref('Passengers/'+ user.uid).set({
      profile_pic_url: '',
      first_name: navigation.getParam('first_name'),
      last_name: navigation.getParam('last_name'),
      birth_date: navigation.getParam('birth_date'),
      gender: navigation.getParam('gender'),
      // aadhar_number: navigation.getParam('aadhar_number'),
      // license_number: navigation.getParam('license_number'),
      // has_puc: navigation.getParam('has_puc'),
      // auto_number: navigation.getParam('auto_number'),
      // has_own_vehicle: navigation.getParam('has_own_vehicle'),
      // owner_name: navigation.getParam('owner_name'),
      // owner_contact_number: navigation.getParam('owner_contact_number'),
      has_profile_completed: false,
    });
    this.props.navigation.navigate('mainScreen');
  }

  nextEvent(e){
    this._handleImagePicked(this.state.result);
    this.submitUserDetails();
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
            > Hello, dear</Text>
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
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
    });

    if(!pickerResult.cancelled) {
      this.setState( {isPicLoaded:false});
      this.setState({image:pickerResult.uri});
      this.setState({result:pickerResult});
    }
    
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      
    } finally {
      this.setState({ uploading: false });
    }
  };
}


async function uploadImageAsync(uri) {
  console.log("First Line uploadImageAcsync");
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  const {navigation} = this.props;
  let user = navigation.getParam('user');
  //take the currentuser and replace the child(profilepic.jpeg) with the user id of the current user
  const ref = firebase
    .storage()
    .ref("/Images/Passengers/")
    .child(user.uid + ".jpeg");
  const snapshot = await ref.put(blob);
  console.log("Image uploaded");
  // We're done with the blob, close and release it
  blob.close();

  let downloadurl = await snapshot.ref.getDownloadURL();
  console.log(downloadurl);
  //store the download url in the database in the current user's object.
  this.setState({downloadUrl : downloadurl});

 
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
    flex: Platform.OS === 'ios' ? 0.52 : 0.55,
  },
  signUpView: {
    flex:Platform.OS === 'ios' ? 0.38 : 0.40,
    backgroundColor: "#12afe3",
    height: "100%",
    width: wp("92%"),
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "5%",
    borderRadius: 15
  }
});

