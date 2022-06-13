import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/FontAwesome";

import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "react-native/Libraries/NewAppScreen";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const historyobject = [
  {
    cycleend: "20 jan 2022",
    cyclestart: "20,Jan 2023",
    perioslenght: "5",
    symptomsloge: ["happy", "sad", "cramps"],
  },
  {
    cycleend: "20 jan 2022",
    cyclestart: "20,Jan 2023",
    perioslenght: "5",
    symptomsloge: ["happy", "sad", "mmm"],
  },
  {
    cycleend: "20 jan 2022",
    cyclestart: "20,Jan 2023",
    perioslenght: "5",
    symptomsloge: ["happy", "sad", "mmm"],
  },
  {
    cycleend: "20 jan 2022",
    cyclestart: "20,Jan 2023",
    perioslenght: "5",
    symptomsloge: ["happy", "sad", "mmm"],
  },
];
export default function More() {
  const [symptomslist, setSymtomslist] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("symptomsarr");
      return jsonValue != null
        ? setSymtomslist(JSON.parse(jsonValue))
        : setSymtomslist([]);
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View styles={styles.mainholder}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>Current cycle</Text>

          <Text style={{ fontFamily: "Poppins-Light" }}>
            Clycle end: 25 jan 2022
          </Text>
        </View>
        <View
          style={{ borderTopWidth: 1, borderColor: "lightgrey", marginTop: 20 }}
        >
          <Text style={styles.title}>Symptoms logged</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {symptomslist.map((symp) => (
              <Text style={{ fontFamily: "Poppins-Light", marginRight: 5 }}>
                {symp}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <Text
        style={{
          marginLeft: 20,
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        History
      </Text>
      <View style={{ height: "70%" }}>
        <FlatList
          data={historyobject}
          renderItem={({ item }) => (
            <View style={styles.listcard}>
              <Text style={styles.generaltext}>
                Cycle start : {item.cyclestart}
              </Text>
              <Text style={styles.generaltext}>
                Cycle end : {item.cyclestart}
              </Text>
              <Text style={styles.generaltext}>
                Period Lenght: {item.perioslenght}
              </Text>
              <Text style={{ marginTop: 10, color: colors.tertiary }}>
                Symptoms
              </Text>
              <View style={{ flexDirection: "row" }}>
                {item.symptomsloge.map((symptom) => (
                  <Text
                    style={{ marginRight: 10, fontFamily: "Poppins-Light" }}
                  >
                    {symptom}
                  </Text>
                ))}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainholder: {
    height: windowHeight,
    width: windowWidth,
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
  listcard: {
    width: "90%",
    backgroundColor: "lavender",
    marginLeft: 20,
    marginTop: 10,

    padding: 10,
  },
  generaltext: {
    fontFamily: "Poppins-Light",
  },
});
