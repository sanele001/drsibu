import React, { useState } from "react";
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
} from "react-native";
import { colors } from "../brand";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
const rootdate = new Date().toString();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Form() {
  const [name, Setname] = useState("");
  const [dateinput, setDateinput] = useState("");
  const [date, setDate] = useState(rootdate);
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

  return (
    <View style={styles.holder}>
      <View>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          First name
        </Text>
        <TextInput style={styles.input} placeholder="Enter your First name" />
      </View>

      <View>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Last Period start date
        </Text>
        {show && (
          <DateTimePicker
            value={new Date()}
            display="spinner"
            mode="date"
            onChange={(event, date) => {
              if (event) {
                setDate(date);
              }

              if (show) {
                setShow(false);
              }
            }}
          />
        )}
        <View style={styles.inputview}>
          <TextInput
            style={styles.dateinput}
            placeholder="05/07/2020"
            value={moment(date).format("ll")}
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
            marginBottom: 10,
          }}
        >
          How long is your cycle?
        </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
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
        <TextInput style={styles.input} placeholder="Enter your First name" />
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text
          style={{
            color: colors.primary,
            fontFamily: "Poppins-Light",
            fontWeight: "bold",
          }}
        >
          Save datials
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  holder: {
    width: windowWidth,
    height: windowHeight,
    padding: 10,
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
