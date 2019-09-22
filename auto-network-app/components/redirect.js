import React from "react";
import { View, Text, Picker, TextInput } from "react-native";
import BookingPageOne from "../components/bookingSection/bookingPage1";
import { Dropdown } from "react-native-material-dropdown";
import SearchableDropdown from "react-native-searchable-dropdown";

import Select from "react-virtualized-select";
var items = [
  //name key is must.It is to show the text in front
  { id: 1, name: "angellist" },
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
export default class Redirect extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedItems: ""
    };
  }
  componentWillMount() {}
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "lightblue" }}>
        <View style={{ marginTop: "30%", flex: 1 }}>
          <SearchableDropdown
            multi={true}
            selectedItems={this.state.selectedItems}
            onItemSelect={item => {
              const items = this.state.selectedItems;
              // items.push(item);
              this.setState({ selectedItems: items });
            }}
            containerStyle={{ padding: 5 }}
            itemStyle={{
              padding: 12,
              marginTop: 2,
              backgroundColor: "#ddd",
              borderColor: "#bbb",
              borderWidth: 1,
              borderRadius: 5
            }}
            itemTextStyle={{ color: "#222" }}
            itemsContainerStyle={{ maxHeight: 180 }}
            items={items}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={{
              placeholder: "placeholder",
              underlineColorAndroid: "transparent",
              style: {
                padding: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5
              }
              // onTextChange: text => alert(text)
            }}
            listProps={{
              nestedScrollEnabled: true
            }}
          />
        </View>
      </View>
    );
  }
}
