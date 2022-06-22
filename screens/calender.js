import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootdate = new Date().toString();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const symptoms = [
  { symtom: "Headacke", pic: require("../assets/headache.png") },
  { symtom: "Fatigue", pic: require("../assets/fatigue.png") },
  { symtom: "Fever", pic: require("../assets/fever.png") },
  { symtom: "Cramps", pic: require("../assets/cramps.png") },
];

const discharge = [
  { disch: "Watery", pic: require("../assets/waterry.png") },
  { disch: "Normal", pic: require("../assets/nomal.png") },
  { disch: "Sticky", pic: require("../assets/sticky.png") },
];
const moody = [
  { mood: "Happy", pic: require("../assets/happy.png") },
  { mood: "Sad", pic: require("../assets/sad.png") },
  { mood: "tired", pic: require("../assets/tired.png") },
  { mood: "Excited", pic: require("../assets/excited.png") },
];

function Clndr() {
  const [aperiod, setAperiod] = useState({});

  let temparreydates = [];
  for (let i = 0; i < aperiod.period; i++) {
    const firstperiodday = moment(aperiod.lastperiod).add(
      aperiod.cycle,
      "days"
    );
    const addtodate = moment(firstperiodday)
      .add(i, "days")
      .format("YYYY-MM-DD");
    temparreydates.push(addtodate);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  let newDaysObject = {};
  temparreydates.forEach((day) => {
    newDaysObject[day] = {
      selected: false,

      color: "#E03B8B",
      textColor: "white",
    };
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("mainobject");
      return jsonValue != null ? setAperiod(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
      if (e) {
        alert(
          "you haven't added any details, please go to home and change cycle details."
        );
      }
      console.log(e);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Calendar markingType={"period"} markedDates={newDaysObject} />
    </View>
  );
}

function Fourtabs({ closingmodal }) {
  const [pStart, setPstart] = useState("");
  const [pEnd, setPend] = useState("");
  const [ovulation, SetOvulation] = useState("");
  const [main, setMain] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("mainobject");
      const getobject = jsonValue != null ? JSON.parse(jsonValue) : null;
      const pstarting = moment(getobject.lastperiod).add(
        getobject.cycle,
        "days"
      );

      const pEnding = moment(pstarting).add(getobject.period, "days");
      const ovul = moment(pstarting).add(15, "days");
      //  console.log(getobject);
      setPstart(pstarting);
      setPend(pEnding);
      SetOvulation(ovul);
    } catch (e) {
      // error reading value
      if (e) {
        alert(
          "please change cycle details. go to home and click on change details and save your cycle details"
        );
      }
      console.log(e);
    }
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <View
        style={{
          width: windowWidth,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.cardtab}>
          <Text style={styles.carrdtitle}>
            {pStart ? moment(pStart).format("ll") : "March 24 2020"}
          </Text>
          <Text style={styles.smalltest}>Period starts</Text>
        </View>
        <View style={styles.cardtab}>
          <Text style={styles.carrdtitle}>
            {ovulation ? moment(ovulation).format("ll") : "March 24 2020"}
          </Text>
          <Text style={styles.smalltest}>Ovulation start</Text>
        </View>
      </View>
      <View
        style={{
          width: windowWidth,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.cardtab}>
          <Text style={styles.carrdtitle}>
            {pEnd ? moment(pEnd).format("ll") : "March 24 2020"}
          </Text>
          <Text style={styles.smalltest}>Period end</Text>
        </View>
        <TouchableOpacity
          style={{
            width: "45%",
            backgroundColor: "lavender",
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 9,

            flexDirection: "row",
            justifyContent: "space-around",
          }}
          onPress={closingmodal}
        >
          <Icon name="plus" size={30} color={colors.primary} />
          <Text style={styles.smalltest}>symptoms </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Loger({ closingmodal }) {
  const [numberofitems, setNumberofitms] = useState([]);
  const [disable, setDesable] = useState(false);

  const additem = (item) => {
    setNumberofitms((prev) => [...prev, item]);
    storesymptoms();
  };

  const storesymptoms = async () => {
    try {
      const jsonValue = JSON.stringify(numberofitems);
      await AsyncStorage.setItem("symptomsarr", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: "whitesmoke",
      }}
    >
      <TouchableOpacity style={{ padding: 20 }} onPress={closingmodal}>
        <Icon name="close" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.logertitile}>Symptoms</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: "15%",
        }}
      >
        {symptoms.map((item) => {
          return (
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => additem(item.symtom)}
            >
              <Image source={item.pic} style={{ width: 50, height: 50 }} />

              <Text>{item.symtom}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.logertitile}>Mood</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: "15%",
        }}
      >
        {moody.map((item, index) => {
          return (
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => additem(item.mood)}
            >
              <Image source={item.pic} style={{ width: 50, height: 50 }} />

              <Text>{item.mood}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.logertitile}>discharge</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {discharge.map((item) => {
          return (
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => additem(item.disch)}
            >
              <Image source={item.pic} style={{ width: 50, height: 50 }} />

              <Text>{item.disch}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        style={{
          width: "80%",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.primary,
          alignSelf: "center",
          borderRadius: 10,
          marginTop: "10%",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
          Save {numberofitems.length} selected items
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Mycalendar() {
  const [modalVisible, setModalVisible] = useState(false);

  const closemodal = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };
  return (
    <ScrollView style={{ padding: 10 }}>
      <Clndr />
      <Text
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontFamily: "Poppins-Light",
          fontSize: 15,
        }}
      >
        Please note that Ivy-women uses cycle period to make calculations. To
        get accurate result make sure that you provide accurate details about
        your menstrual cycle. For information on how to know your cycle please
        read our articles.
      </Text>
      <Fourtabs closingmodal={closemodal} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Loger closingmodal={closemodal} />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardtab: {
    width: "45%",
    backgroundColor: "lavender",
    padding: 12,
    borderRadius: 9,
  },

  carrdtitle: {
    fontSize: 17,
    fontFamily: "Poppins-Light",
    fontWeight: "bold",
  },
  smalltest: {
    fontSize: 15,
    fontFamily: "Poppins-Light",
  },
  logertitile: {
    fontSize: 20,
    fontFamily: "Poppins-Light",
    paddingLeft: 20,
    paddingBottom: 10,
  },
});
