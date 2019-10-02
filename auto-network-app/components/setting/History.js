import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ScrollView
} from "react-native";
import StarRating from "react-native-star-rating";
import Header from "../header/header";
import { TouchableOpacity } from "react-native-gesture-handler";

function Item({ title, from, to, date, time, fare, driver_name, starCount }) {
  //   function onStarRatingPress(rating) {
  //     this.setState({
  //       starCount: rating
  //     });
  //   }
  return (
    <View style={styles.CardView}>
      <View style={styles.source_destinatio_view}>
        <View style={{ flex: 0.5 }}>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.lableText}>from</Text>
          </View>
          <View style={styles.name_input_view}>
            <View
              style={{
                flex: 0.2,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                style={styles.lable_Image}
                source={require("../../assets/sourceIcon.png")}
              />
            </View>
            <View style={{ flex: 0.8, marginLeft: "4%", marginTop: "-1%" }}>
              <ScrollView horizontal={true}>
                <Text style={styles.text_Of_Details}>{from}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: "7%", flex: 0.5 }}>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.lableText}>To</Text>
          </View>
          <View style={styles.name_input_view}>
            <View
              style={{
                flex: 0.2,

                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                style={styles.destinationIcon}
                source={require("../../assets/destinationIcon.png")}
              />
            </View>
            <View style={{ flex: 0.8, marginLeft: "4%", marginTop: "-1%" }}>
              <ScrollView horizontal={true}>
                <Text style={styles.text_Of_Details}>{to}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.date_time_view}>
        <View style={{ flex: 0.5 }}>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.lableText}>Date</Text>
          </View>
          <View style={styles.name_input_view}>
            <View
              style={{
                flex: 0.2,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                style={styles.lable_Image}
                source={require("../../assets/calender_ion.png")}
              />
            </View>
            <View
              style={{
                flex: 0.8,
                marginLeft: "4%"

                //   marginTop: "-0.5%"
              }}
            >
              <Text style={styles.date_time_text_css}>{date}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: "7%", flex: 0.5 }}>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.lableText}>Time</Text>
          </View>
          <View style={styles.name_input_view}>
            <View
              style={{
                flex: 0.2,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                style={styles.lable_Image}
                source={require("../../assets/clock_icon.png")}
              />
            </View>
            <View
              style={{
                flex: 0.8,
                marginLeft: "4%"
                //   marginTop: "-0.5%"
              }}
            >
              <Text style={styles.date_time_text_css}>{time}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.fare_view}>
        <View
          style={{
            flex: 0.2,
            position: "relative",
            bottom: "1%"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#fff"
              // textAlignVertical: "center"
            }}
          >
            Fare :{" "}
          </Text>
        </View>
        <View
          style={{
            flex: 0.9,
            width: "80%",
            position: "relative",
            bottom: "1%"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#474747",
              textAlignVertical: "center"
            }}
          >
            {fare}
          </Text>
        </View>
      </View>
      <View style={styles.driver_name_view}>
        <View
          style={{
            flex: 0.35,
            position: "relative",
            bottom: "1%"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#fff"
              // textAlignVertical: "center"
            }}
          >
            Driver Name :{" "}
          </Text>
        </View>
        <View
          style={{
            flex: 0.65,
            width: "80%",
            position: "relative",
            bottom: "1%"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#474747",
              textAlignVertical: "center"
            }}
          >
            {driver_name}
          </Text>
        </View>
      </View>
      <View style={styles.start_view}>
        <View
          style={{
            flex: 0.4,
            position: "relative",
            bottom: "1%"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#fff"
              // textAlignVertical: "center"
            }}
          >
            Given Rating :{" "}
          </Text>
        </View>
        <View
          style={{
            flex: 0.6,
            width: "80%",
            position: "relative",
            bottom: "1%"
          }}
        >
          <StarRating
            starSize={25}
            emptyStarColor="black"
            fullStarColor="yellow"
            disabled={false}
            maxStars={5}
            rating={starCount}
          />
        </View>
      </View>
      <View style={{ flex: 0.1 }}></View>
    </View>
    // </View>
  );
}
var DATA = [
  {
    id: "1",
    from: "changa",
    to: "Aanad",
    date: "16/6/19",
    time: "10 : 12 AM",
    fare: "2",
    driver_name: "KING",
    starCount: 1.5
  },
  {
    id: "2",
    from: "changa",
    to: "Aanad",
    date: "16/6/19",
    time: "10 : 12 AM",
    fare: "2",
    driver_name: "KING",
    starCount: 1.5
  },
  {
    id: "3",
    from: "changa",
    to: "Aanad",
    date: "16/6/19",
    time: "10 : 12 AM",
    fare: "2",
    driver_name: "KING",
    starCount: 1.5
  }
];
export default class History extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.backEvent = this.backEvent.bind(this);
  }

  componentWillMount() {
    DATA.push({
      id: "4",
      from: "changa",
      to: "Aanad",
      date: "16/6/19",
      time: "10 : 12 AM",
      fare: "2",
      driver_name: "KING",
      starCount: 5
    });
    console.log(DATA);
  }
  backEvent() {
    this.props.navigation.navigate("Setting");
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
                backgroundColor: "#269DF9"
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
                <Text style={styles.headerText}>History</Text>
              </View>
              <View style={{ flex: 0.3 }}></View>
            </SafeAreaView>
            <View style={{ flex: 0.6 }}>
              <Header />
            </View>
          </View>
        </View>
        <View style={{ flex: 0.78 }}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Item
                title={item.title}
                from={item.from}
                to={item.to}
                date={item.date}
                time={item.time}
                fare={item.fare}
                driver_name={item.driver_name}
                starCount={item.starCount}
              />
            )}
            keyExtractor={item => item.id}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 0.22
  },
  headerText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 25
  },
  item: {
    flex: 1,

    backgroundColor: "#f9c2ff",
    height: "100%",
    padding: "2%",
    marginVertical: "2%",
    marginHorizontal: "2%"
  },
  title: {
    fontSize: 32
  },
  CardView: {
    backgroundColor: "lightblue",
    height: 250,
    padding: "2%",
    width: "95%",
    marginVertical: "2%",
    marginHorizontal: "2%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "2%",
    borderRadius: 25,
    shadowColor: "lightblue",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 1.5,
    shadowRadius: 3.84,
    elevation: 4
    // marginTop: "-10%"
  },
  fare_Details_View: {
    flex: 1,
    alignSelf: "center",
    marginTop: "2%"
  },
  source_destinatio_view: {
    flex: 0.2,
    flexDirection: "row",
    width: "85%",
    height: "100%"
    // backgroundColor: "red"
  },
  date_time_view: {
    flex: 0.2,
    flexDirection: "row",
    width: "85%",
    height: "100%",
    marginTop: "4%"
    // backgroundColor: "red"
  },
  fare_view: {
    flex: 0.2,
    flexDirection: "row",
    width: "85%",
    height: "100%",
    marginTop: "4%",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  driver_name_view: {
    flex: 0.2,
    flexDirection: "row",
    width: "85%",
    height: "100%",
    marginTop: "2%",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  start_view: {
    flex: 0.2,
    flexDirection: "row",
    width: "85%",
    height: "100%",
    marginTop: "2%",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1%"
  },
  lableText: {
    fontSize: 10,
    color: "#fff",
    alignSelf: "center",
    position: "absolute",
    left: 0,
    bottom: "5%"
  },
  name_input_view: {
    flex: 0.7,
    width: "100%",
    height: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  lable_Image: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    left: 0
  },
  text_Of_Details: {
    fontSize: 16,
    alignSelf: "center",
    color: "#474747",
    position: "relative",
    bottom: "5%"
  },
  destinationIcon: {
    width: "50%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    left: 0
  },
  date_time_text_css: {
    color: "#474747",
    fontSize: 16,
    position: "absolute",
    bottom: "10%"
  }
});
