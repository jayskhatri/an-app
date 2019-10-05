import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";
import Header from "../header/header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomBar from "../bottomTabBar/BottomBar";
import colors from "../constants/Colors";
import firebase from 'firebase';
export default class setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: null,
      last_name: null,
      profile_pic_url: null,
      is_loaded: null
    };
    this.myAccountHandleEvent = this.myAccountHandleEvent.bind(this);
    this.notificationHandleEvent = this.notificationHandleEvent.bind(this);
    this.historyHandleEvent = this.historyHandleEvent.bind(this);
    this.helpHandleEvent = this.helpHandleEvent.bind(this);
  }
  async componentWillMount(){
    this.setState({is_loaded:false});

    console.log("component will mount edit profile");
    let user = await firebase.auth().currentUser;
    console.log("user: ",user.uid);
    var userRef = firebase.database().ref('Passengers/'+user.uid);

    var personal_details = null;

    await userRef.once('value').then((snapshot)=>{
      if(snapshot!=null){
        
        personal_details = (snapshot.val() && snapshot.val().personal_details);

        this.setState({
          first_name:personal_details.first_name,
          last_name:personal_details.last_name,
          profile_pic_url : personal_details.profile_pic_url,
        });
      }
    });
    this.setState({is_loaded:true});
  }
  myAccountHandleEvent(e) {
    this.props.navigation.navigate("editProfile");
  }
  notificationHandleEvent(e) {
    this.props.navigation.navigate("Notification");
  }
  historyHandleEvent(e) {
    this.props.navigation.navigate("History");
  }
  helpHandleEvent(e) {
    this.props.navigation.navigate("Help");
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <SafeAreaView
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 0.4,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.light.blue_color
              }}
            >
              <View>
                <Text style={styles.headerText}>Home</Text>
              </View>
            </SafeAreaView>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </View>
        </View>
        {this.state.is_loaded ?
          <View style={styles.settingView}>
            <View
              style={{
                flex: 0.15,
                flexDirection: "row",
                width: "100%",
                marginTop: Platform.OS === "ios" ? "-10%" : "0%"
              }}
            >
              { this.state.profile_pic_url ?
                <Image
                  style={{
                    height: hp("12%"),
                    width: Platform.OS === "ios" ? wp("25%") : wp("21%"),
                    marginLeft: "5%",
                    marginTop: "-3%",
                    borderRadius: Platform.OS === "ios" ? 50 : 60,
                    borderWidth: 3,
                    borderColor: colors.light.white_color
                  }}
                  source={{uri : this.state.profile_pic_url}}
                />
                :
                <Image
                  style={{
                    height: hp("12%"),
                    width: Platform.OS === "ios" ? wp("25%") : wp("21%"),
                    marginLeft: "5%",
                    marginTop: "-3%",
                    borderRadius: Platform.OS === "ios" ? 50 : 60,
                    borderWidth: 3,
                    borderColor: colors.light.white_color
                  }}
                  source={require("../../assets/pic.jpg")}
                />

              }
              <View
                style={{
                  flexDirection: "column",
                  marginTop: "5%",
                  marginLeft: "3%"
                }}
              >
                <Text style={{ fontSize: 23, color: colors.light.black_color }}>
                  {this.state.first_name + " " + this.state.last_name}
                </Text>
              </View>
            </View>
            <View
              style={{ flex: 0.75, backgroundColor: colors.light.white_color }}
            >
              <TouchableOpacity onPress={this.myAccountHandleEvent}>
                <View
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    borderTopWidth: 0.5,
                    borderTopColor: colors.light.placeholder_text_Color,
                    flexDirection: "row"
                  }}
                >
                  <View style={{ marginTop: "2%", marginLeft: "4%" }}>
                    <Image
                      style={{
                        marginTop: "3%",
                        flex: 1,
                        height: hp("6%"),
                        width: wp("6%"),
                        resizeMode: "contain"
                      }}
                      source={require("../../assets/adminlogo.png")}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: "5%",
                      marginTop: "2%"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Platform.OS === "ios" ? 23 : 18,
                        color: colors.light.black_color
                      }}
                    >
                      My Account
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        opacity: 0.6,
                        color: colors.light.black_color
                      }}
                    >
                      Personal Info , Auto details
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.notificationHandleEvent}>
                <View
                  style={{
                    width: "100%",
                    marginTop: "4%",
                    borderTopWidth: 0.5,
                    borderTopColor: colors.light.placeholder_text_Color,
                    flexDirection: "row"
                  }}
                >
                  <View style={{ marginTop: "2%", marginLeft: "4%" }}>
                    <Image
                      style={{
                        marginTop: "3%",
                        flex: 1,
                        height: hp("6%"),
                        width: wp("6%"),
                        resizeMode: "contain"
                      }}
                      source={require("../../assets/NOTIFICATION.png")}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: "5%",
                      marginTop: "2%"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Platform.OS === "ios" ? 23 : 18,
                        color: colors.light.black_color
                      }}
                    >
                      Notifications
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        opacity: 0.6,
                        color: colors.light.black_color
                      }}
                    >
                      Online/Offilne , message
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.historyHandleEvent}>
                <View
                  style={{
                    width: "100%",
                    marginTop: "4%",
                    borderTopWidth: 0.5,
                    borderTopColor: colors.light.placeholder_text_Color,
                    flexDirection: "row"
                  }}
                >
                  <View style={{ marginTop: "2%", marginLeft: "4%" }}>
                    <Image
                      style={{
                        marginTop: "3%",
                        flex: 1,
                        height: hp("6%"),
                        width: wp("6%"),
                        resizeMode: "contain"
                      }}
                      source={require("../../assets/HISTORY.png")}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: "5%",
                      marginTop: "2%"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Platform.OS === "ios" ? 23 : 18,
                        color: colors.light.black_color
                      }}
                    >
                      History
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        opacity: 0.6,
                        color: colors.light.black_color
                      }}
                    >
                      history
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.helpHandleEvent}>
                <View
                  style={{
                    width: "100%",
                    marginTop: "4%",
                    borderTopWidth: 0.5,
                    borderTopColor: colors.light.placeholder_text_Color,
                    flexDirection: "row",
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.light.placeholder_text_Color
                  }}
                >
                  <View style={{ marginTop: "0%", marginLeft: "4%" }}>
                    <Image
                      style={{
                        marginTop: "1%",
                        flex: 1,
                        height: hp("6%"),
                        width: wp("6%"),
                        resizeMode: "contain"
                      }}
                      source={require("../../assets/HELP.png")}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: "5%",
                      marginBottom: "4%",
                      marginTop: "2%"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Platform.OS === "ios" ? 23 : 18,
                        color: colors.light.black_color
                      }}
                    >
                      HELP
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        opacity: 0.6,
                        color: colors.light.black_color
                      }}
                    >
                      FAQ , Contact us , Privacy policy{" "}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.1 }}>
              <BottomBar {...this.props} />
            </View>
          </View>
        :
          <View style={styles.ActivityIndicator}>
            <ActivityIndicator  size="large"   color={colors.light.blue_color} />
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white_color
  },
  waveView: {
    flex: 0.14
  },
  settingView: {
    flex: 0.85
  },
  header: {
    flex: 0.15
  },
  headerText: {
    alignSelf: "center",
    color: colors.light.white_color,
    fontSize: 25
  },
  containerActivityIndicator: {
    flex:1,
  },
  ActivityIndicator: {
    // flex:86,
    alignItems:"center",
    justifyContent:"center"
  }
});
