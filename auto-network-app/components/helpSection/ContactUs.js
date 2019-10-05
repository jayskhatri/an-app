import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  View,
  Switch
} from "react-native";
import colors from "../constants/Colors";
import Header from "../header/header";
import { red } from "ansi-colors";
import { ScrollView } from "react-native-gesture-handler";

export default class ContactUs extends React.Component {
  constructor() {
    super();
    this.backEvent = this.backEvent.bind(this);
  }
  backEvent() {
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
                justifyContent: "space-between",
                backgroundColor: colors.light.blue_color
              }}
            >
              <View style={{ flex: 0.3 }}>
                <TouchableOpacity
                  onPress={this.backEvent}
                  style={{ width: 70, height: 30 }}
                >
                  <Image
                    style={{
                      height: 25,
                      width: 60,
                      alignSelf: "center"
                    }}
                    source={require("../../assets/back1.png")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headerText}>Contact Us</Text>
              </View>
              <View style={{ flex: 0.3 }}></View>
            </SafeAreaView>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </View>
        </View>
        <View style={styles.contactView}>
          <View style={styles.member_view}>
            <View style={styles.imageView}>
              <Image
                style={styles.image_css}
                source={require("../../assets/pic.jpg")}
              />
            </View>
            <View style={styles.name_posotion_View}>
              <View style={styles.name_view}>
                <Text style={styles.text_odd_1}>Jay Khatri</Text>
              </View>
              <View style={styles.position_view}>
                <Text style={styles.text_odd_2}>@ the_Project_Manager</Text>
              </View>
            </View>
          </View>
          <View style={styles.member_view}>
            <View style={styles.name_posotion_View}>
              <View style={styles.name_view}>
                <Text style={styles.text_even_1}>Poojan Dharaiya</Text>
              </View>
              <View style={styles.position_view}>
                <Text style={styles.text_even_2}>@ the_Backend_developer</Text>
              </View>
            </View>
            <View style={styles.imageView}>
              <Image
                style={styles.image_css}
                source={require("../../assets/pic.jpg")}
              />
            </View>
          </View>
          <View style={styles.member_view}>
            <View style={styles.imageView}>
              <Image
                style={styles.image_css}
                source={require("../../assets/pic.jpg")}
              />
            </View>
            <View style={styles.name_posotion_View}>
              <View style={styles.name_view}>
                <Text style={styles.text_odd_1}>Aadarsh Ghodasara</Text>
              </View>
              <View style={styles.position_view}>
                <Text style={styles.text_odd_2}>@ the_Frontend_Developer</Text>
              </View>
            </View>
          </View>
          <View style={styles.member_view}>
            <View style={styles.name_posotion_View}>
              <View style={styles.name_view}>
                <Text style={styles.text_even_1}>Naimish Ghevariya</Text>
              </View>
              <View style={styles.position_view}>
                <Text style={styles.text_even_2}>@ the_UI_Designer</Text>
              </View>
            </View>
            <View style={styles.imageView}>
              <Image
                style={styles.image_css}
                source={require("../../assets/pic.jpg")}
              />
            </View>
          </View>
          <View style={styles.member_view}>
            <View style={styles.imageView}>
              <Image
                style={styles.image_css}
                source={require("../../assets/pic.jpg")}
              />
            </View>
            <View style={styles.name_posotion_View}>
              <View style={styles.name_view}>
                <Text style={styles.text_odd_1}>Vishvesh Khandpur</Text>
              </View>
              <View style={styles.position_view}>
                <Text style={styles.text_odd_2}>@the_Business_Analyst</Text>
              </View>
            </View>
          </View>
          <View style={styles.member_view}>
            <View style={styles.name_posotion_View}>
              <View style={styles.name_view}>
                <Text style={styles.text_even_1}>Prit gopani</Text>
              </View>
              <View style={styles.position_view}>
                <Text style={styles.text_even_2}>@the_Tester</Text>
              </View>
            </View>
            <View style={styles.imageView}>
              <Image
                style={styles.image_css}
                source={require("../../assets/pic.jpg")}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white_color
  },
  header: {
    flex: 0.2
  },
  headerText: {
    alignSelf: "center",
    color: colors.light.white_color,
    fontSize: 25
  },
  contactView: {
    flex: 0.8,
    padding: "1%",
    marginLeft: "1%",
    marginRight: "1%"
  },
  member_view: {
    flex: 0.2,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    backgroundColor: colors.light.light_blue,
    borderRadius: 15,
    marginBottom: "1%",
    shadowColor: colors.light.black_color,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2
  },
  imageView: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center"
  },
  image_css: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "red"
  },
  name_posotion_View: {
    flex: 0.65
  },
  name_view: {
    flex: 0.5,
    justifyContent: "flex-end"
  },
  position_view: {
    flex: 0.5,
    justifyContent: "flex-start"
  },
  text_odd_1: {
    fontSize: 20
  },
  text_odd_2: {
    fontSize: 20,
    marginTop: "2%"
  },
  text_even_1: {
    fontSize: 20,
    textAlign: "right"
  },
  text_even_2: {
    fontSize: 20,
    textAlign: "right",
    marginTop: "2%"
  }
});
