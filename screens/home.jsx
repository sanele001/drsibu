import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/FontAwesome";
import CalendarStrip from "react-native-calendar-strip";
import CircularProgress from "react-native-circular-progress-indicator";
import { useEffect, useState } from "react";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Form from "./form";
import { Modal } from "react-native-web";

const rootdate = new Date().toString();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Datestrip() {
  return (
    <View>
      <CalendarStrip
        scrollable
        style={{ height: 150, paddingTop: 20, paddingBottom: 5 }}
        calendarColor={colors.primary}
        calendarHeaderStyle={{ color: "white" }}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        iconContainer={{ flex: 0.1 }}
      />
    </View>
  );
}

function Indicators({ usename }) {
  return (
    <View style={{ width: windowWidth, padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins-Light",
            color: colors.font,
          }}
        >
          {usename ? usename : "New user"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={style.circles}>
            <Icon name="circle" size={20} color={colors.secondary} />
            <Text style={{ color: "lightgrey" }}> menstrual </Text>
          </View>
          <View style={style.circles}>
            <Icon name="circle" size={20} color={colors.primary} />
            <Text style={{ color: "lightgrey" }}> luteal</Text>
          </View>
          <View style={style.circles}>
            <Icon name="circle" size={20} color={colors.tertiary} />
            <Text style={{ color: "lightgrey" }}> ovulation</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function Progess({ usecycle, nextPeriod }) {
  const [symptomsarr, setSymptomsarr] = useState([]);
  const [myhistory, setMyhistroy] = useState([]);

  const getsymptomsarr = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("symptomsarr");

      const sypmt =
        jsonValue != null
          ? setSymptomsarr(JSON.parse(jsonValue))
          : setSymptomsarr([]);
      const histValue = await AsyncStorage.getItem("history");
      const hist =
        histValue != null
          ? setMyhistroy(JSON.parse(histValue))
          : setMyhistroy([]);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getsymptomsarr();
  }, []);
  const days = Number(usecycle);
  // calculate difference betwee dates to come with value
  const target = moment(nextPeriod).add(days, "days");
  const date2 = new Date();
  const diffTime = Math.abs(date2 - target);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  /// culculate max value
  const valuemax = Number(usecycle);
  const myvalue = Math.abs(valuemax - diffDays);
  // sorting out an object we going to push to history

  const storeData = async () => {
    const Preperedobjtostore = {
      cyclestart: nextPeriod,
      cycleend: target,
      symptarr: symptomsarr,
    };
    const data = [...myhistory, Preperedobjtostore];
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("history", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  if (myvalue == days || myvalue > days) {
    storeData();
  }

  return (
    <View
      style={{
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <CircularProgress
        value={myvalue ? myvalue : 0}
        radius={120}
        maxValue={valuemax}
        title="Cycle day"
        titleStyle={style.progresstitle}
        progressValueColor={colors.tertiary}
        activeStrokeColor={colors.secondary}
        inActiveStrokeColor={"grey"}
        inActiveStrokeOpacity={0.3}
        inActiveStrokeWidth={20}
        activeStrokeWidth={20}
      />
    </View>
  );
}

function QuickView({ move, nextPeriod, usecycle, gotomore }) {
  const [nextdate, setNextdate] = useState("");

  const next = () => {
    // taking cycle string tuning into into a number to add it to moment below.
    const days = Number(usecycle);
    if (nextPeriod) {
      const tempdate = moment(nextPeriod).add(days, "days");
      //setNextdate(tempdate);
      return tempdate;
    } else {
      return "Jan 6 1998";
    }
  };
  return (
    <View
      style={{
        width: windowWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View>
        <TouchableOpacity onPress={move} style={style.quickviewcard}>
          <Icon name="calendar-o" size={30} color={colors.primary} />
          <Text
            style={{ marginTop: 10, fontWeight: "bold", color: colors.font }}
          >
            Change Date
          </Text>
          <Text style={{ fontFamily: "Poppins-Light", color: colors.font }}>
            Cycle Details
          </Text>
        </TouchableOpacity>
      </View>
      <View style={style.quickviewcard}>
        <Icon name="venus" size={30} color={colors.primary} />
        <Text style={{ marginTop: 10, fontWeight: "bold", color: colors.font }}>
          Pregnency Chances
        </Text>
        <Text style={{ fontFamily: "Poppins-Light", color: colors.font }}>
          Low
        </Text>
      </View>
      <TouchableOpacity style={style.quickviewcard} onPress={gotomore}>
        <Icon name="tint" size={30} color={colors.primary} />
        <Text style={{ marginTop: 10, fontWeight: "bold", color: colors.font }}>
          Next Period
        </Text>
        <Text style={{ fontFamily: "Poppins-Light", color: colors.font }}>
          {moment(next()).format("LL")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Home({ navigation }) {
  const [user, setUser] = useState({});

  const nextscren = () => navigation.navigate("Details");
  const gotohistory = () => navigation.navigate("More");
  const gotodiary = () => navigation.navigate("Diary");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("mainobject");

      return jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
      if (e) {
        alert("something went wrong please restart the app");
      }
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <Datestrip />

        <Indicators usename={user.name} />
        <Progess usecycle={user.cycle} nextPeriod={user.lastperiod} />
        <Text
          style={{
            fontFamily: "Poppins-Light",
            padding: 5,
            marginTop: 10,
            color: colors.font,
          }}
        >
          The average cycle is 28 days long; however, a cycle can range in
          length from 21 days to about 35 days. Ovulation occurs roughly at
          about day 14 in a 28-day menstrual cycle. A sudden increase in another
          hormone—luteinizing hormone—causes the ovary to release its egg. This
          event is called ovulation.
        </Text>
        <TouchableOpacity
          style={{
            width: "80%",
            borderWidth: 1,
            borderColor: colors.primary,
            alignSelf: "center",
            alignItems: "center",
            padding: 10,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 9,
          }}
          onPress={gotodiary}
        >
          <Text
            style={{
              fontFamily: "Poppins-Light",
              fontWeight: "bold",
              color: colors.secondary,
            }}
          >
            Journal
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 5,
            color: colors.font,
            fontSize: 15,
            fontFamily: "Poppins-Light",
          }}
        >
          Quick View
        </Text>
        <QuickView
          move={nextscren}
          nextPeriod={user.lastperiod}
          usecycle={user.cycle}
          gotomore={gotohistory}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  circles: {
    justifyContent: "center",
    alignItems: "center",
  },
  progresstitle: {
    fontSize: 20,
    color: colors.primary,
    fontFamily: "Poppins-Light",
  },
  quickviewcard: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    height: 100,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 9,
    backgroundColor: "white",
  },
});
