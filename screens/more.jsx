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
  Alert,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/FontAwesome";

import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "react-native/Libraries/NewAppScreen";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Foot() {
  return <View style={{ height: 150 }}></View>;
}

function Emptylist() {
  return (
    <View style={{ padding: 20 }}>
      <Text>You dont have data to show yet.</Text>
    </View>
  );
}

export default function More() {
  const [symptomslist, setSymtomslist] = useState([]);
  const [logedhistroy, setLogedhistory] = useState([]);
  const [Current, setCurrent] = useState("");

  useEffect(() => {
    getList().then(getCurrent());
  }, []);

  const showpromt = (index) => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Remove",
        onPress: () => removeitem(index),
      },
      {
        text: "Cancel",

        style: "cancel",
      },
    ]);
  };
  // removing item using splice method, passing the index
  const removeitem = (index) => {
    const temparrey = logedhistroy;
    temparrey.splice(index, 1);
    setLogedhistory([...temparrey]);
    // dont fogert to save from storage and remove this note when it's done
    storeData(logedhistroy);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("history", value);
    } catch (e) {
      // saving error
    }
  };

  const getList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("symptomsarr");
      const symmptomdata =
        jsonValue != null
          ? setSymtomslist(JSON.parse(jsonValue))
          : setSymtomslist([]);
      const gethistory = await AsyncStorage.getItem("history");

      const histdata =
        gethistory != null
          ? setLogedhistory(JSON.parse(gethistory))
          : setLogedhistory([]);
    } catch (e) {
      // error reading value
    }
  };

  const getCurrent = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("mainobject");
      return jsonValue != null
        ? setCurrent(JSON.parse(jsonValue))
        : setCurrent(null);
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
            {Current
              ? moment(Current.lastperiod).format("llll")
              : "jun 25 1998"}
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
          data={logedhistroy}
          renderItem={({ item, index }) => (
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
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {item.symptarr.map((symptom) => (
                  <Text
                    style={{ marginRight: 10, fontFamily: "Poppins-Light" }}
                  >
                    {symptom}
                  </Text>
                ))}
              </View>
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => showpromt(index)}
              >
                <Icon name="trash-o" size={30} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Emptylist />}
          ListFooterComponent={<Foot />}
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
    flexWrap: "wrap",
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
