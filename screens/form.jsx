import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  Touchable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "../brand";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootdate = new Date().toString();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const tkn = "ExponentPushToken[bWXS3QKjpyDgvBfVe4VP7L]";

export default function Form({ renderit, navigation }) {
  const [name, setName] = useState("");
  const [myperiod, setPeriod] = useState("");
  const [dateinput, setDateinput] = useState(new Date());
  const [show, setShow] = useState(false);
  //
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "28 days", value: 28 },
    { label: "29 days", value: 29 },
    { label: "30 days", value: 30 },
  ]);
  //

  const gotoMonitor = () => navigation.navigate("Monitor");

  const maininfamationobj = {
    name: name,
    lastperiod: dateinput,
    cycle: value,
    period: myperiod,
  };

  const storeData = async (maininfamationobj) => {
    try {
      const jsonValue = JSON.stringify(maininfamationobj);
      await AsyncStorage.setItem("mainobject", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const savedetails = () => {
    if (name == "" || myperiod == "" || !value) {
      return alert("all fields must be filled");
    } else {
      storeData(maininfamationobj);
      setName("");
      setPeriod("");
      alert("success");
    }
  };

  return (
    <ScrollView style={styles.holder}>
      <View>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 15,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          First name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your First name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>

      <View>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          When did your last period start?
        </Text>
        {show && (
          <DateTimePicker
            value={dateinput}
            mode="date"
            onChange={(event, selected) => {
              if (show) {
                setShow(false);
                setDateinput(selected);
              }
            }}
            textColor="black"
            style={{ color: "red" }}
            maximumDate={new Date()}
          />
        )}
        <View style={styles.inputview}>
          <TextInput
            style={styles.dateinput}
            placeholder="05/07/2020"
            value={moment(dateinput).format("ll")}
            editable={false}
          />
          <Icon
            name="calendar"
            size={30}
            color="lightgrey"
            onPress={() => setShow(true)}
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          How long is your cycle?
        </Text>
        <Text style={{ marginBottom: 10 }}>everage cycle is 28 days</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={{
            backgroundColor: "lavender",
          }}
        />
        <TouchableOpacity style={{ padding: 10 }} onPress={gotoMonitor}>
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            Click here if you don't know
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          How long is your period?
        </Text>
        <Text>everage period is 7 days.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the length on your last period"
          keyboardType="numeric"
          onChangeText={(text) => setPeriod(text)}
          value={myperiod}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={savedetails}>
        <Text
          style={{
            color: colors.primary,
            fontFamily: "Poppins-Light",
            fontWeight: "bold",
          }}
        >
          Save detials
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  holder: {
    width: windowWidth,
    height: windowHeight,
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    fontSize: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  dateinput: {
    backgroundColor: "white",
    width: "80%",
    marginTop: 10,
    marginBottom: 20,

    fontSize: 15,
  },
  inputview: {
    backgroundColor: "white",
    width: windowWidth,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  btn: {
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 9,
    marginLeft: "10%",
    marginTop: 50,
  },
});
