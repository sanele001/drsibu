import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Modal,
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
import { styles } from "react-native-gifted-charts/src/BarChart/styles";

const rootdate = new Date().toString();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// small hack to track chances of getting pregnant in quick view component
// this variable is redifined using the progress value in the prograss component
let cycleDay = 5;

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
  // this variable is used in the quick view component to determine pregnancy chances
  cycleDay = myvalue;

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
        activeStrokeColor={myvalue > 15 ? colors.tertiary : colors.primary}
        inActiveStrokeColor={"grey"}
        inActiveStrokeOpacity={0.3}
        inActiveStrokeWidth={20}
        activeStrokeWidth={10}
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
        justifyContent: "space-between",
      }}
    >
      <View>
        <TouchableOpacity onPress={move} style={style.quickviewcard}>
          <Icon name="calendar-o" size={30} color={colors.primary} />
          <Text
            style={{ marginTop: 5, fontWeight: "bold", color: colors.font }}
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
        <Text style={{ marginTop: 5, fontWeight: "bold", color: colors.font }}>
          Pregnency Chances
        </Text>
        <Text style={{ fontFamily: "Poppins-Light", color: colors.font }}>
          {cycleDay > 17 ? "High" : "Fair"}
        </Text>
      </View>
      <TouchableOpacity style={style.quickviewcard} onPress={gotomore}>
        <Icon name="tint" size={30} color={colors.secondary} />
        <Text style={{ marginTop: 5, fontWeight: "bold", color: colors.font }}>
          Next Period
        </Text>
        <Text style={{ fontFamily: "Poppins-Light", color: colors.font }}>
          {moment(next()).format("LL")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Logperiod({ close }) {
  const [periodLogged, setperiodLogged] = useState(0);
  const [tint, setTint] = useState([]);

  useEffect(() => {
    getPeriod();
    handleTintOnload();
  }, []);
  const tempValue = [];
  for (let i = 0; i < periodLogged; i++) {
    tempValue.push(
      <Icon
        name="tint"
        size={30}
        color={colors.secondary}
        style={{ marginRight: 5 }}
      />
    );
  }
  function handleTintOnload() {
    setTint([...tint, tempValue]);
  }

  const storeLoggedPeriod = async (value) => {
    const currentValue = value + 1;
    try {
      const jsonValue = JSON.stringify(currentValue);
      console.log(jsonValue);
      await AsyncStorage.setItem("periodlogged", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getPeriod = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("periodlogged");
      console.log(jsonValue);
      return jsonValue != null ? setperiodLogged(JSON.parse(jsonValue)) : 0;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const handlePeriodLogging = () => {
    setperiodLogged(periodLogged + 1);

    setTint([
      ...tint,
      <Icon
        name="tint"
        size={30}
        color={colors.secondary}
        style={{ marginRight: 5 }}
      />,
    ]);

    storeLoggedPeriod(periodLogged);
  };

  const reset = () => {
    setperiodLogged(0);
    setTint([]);
    storeLoggedPeriod(0);
  };

  return (
    <View style={style.logperiodmodal}>
      <View style={{ padding: 20 }}>
        <Icon
          name="close"
          size={30}
          color={colors.secondary}
          style={{ marginRight: 5 }}
          onPress={close}
        />
      </View>
      <View style={{ marginTop: 100 }}>
        <View style={{ flexDirection: "row" }}>{tempValue}</View>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              borderBottomWidth: 1,
              paddingBottom: 10,
              fontFamily: "Poppins-Light",
              fontSize: 20,
            }}
          >
            Logged period day number : {periodLogged}
          </Text>
          <Text
            style={{
              paddingBottom: 10,
              marginTop: 10,
              fontFamily: "Poppins-Light",
              fontSize: 20,
            }}
          >
            your period is
            {periodLogged > 7 ? "your period is arbnomal" : " normal"}
          </Text>
        </View>
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
          onPress={handlePeriodLogging}
        >
          <Text
            style={{
              fontFamily: "Poppins-Light",
              fontWeight: "bold",
              color: colors.secondary,
            }}
          >
            Log a period
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center" }}
          >
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FistTime({ navtoform }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Text style={style.fisttimeuserhello}>Hello.</Text>
      <Text style={style.firsttimeintro}>
        Welcome to Ivy Woman, we are going to need you to provide us with some
        information to help us analyze your cycle.
      </Text>

      <TouchableOpacity style={style.firstitmebtn} onPress={navtoform}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Let's get started
        </Text>
      </TouchableOpacity>
      <View style={{ padding: 20, marginTop: 30 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Legal Disclaimer
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            color: colors.font,
          }}
        >
          This app provides only information for educational purposes. This App
          is not medical or treatment advice, professional diagnosis, opinion,
          or services – and may not be treated as such by the user. As such,
          this App may not be relied upon for the purposes of medical diagnosis
          or as a recommendation for medical care or treatment.
        </Text>
      </View>
    </View>
  );
}

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  // modal controler "modal for perio loger"
  const [modalVisible, setModalVisible] = useState(false);
  // modal 2 is for first time user prompt to the form
  const [modalVisible2, setModalVisible2] = useState(false);
  //navigation
  const nextscreen = () => navigation.navigate("Details");
  const gotohistory = () => navigation.navigate("More");
  const gotodiary = () => navigation.navigate("Diary");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // this method has conditional that calls getData func
      //getData(); is a func responsible for loading main user object
      getFirstTime();
    });
    return unsubscribe;
  }, [navigation]);
  // check if user if first time

  const getFirstTime = async () => {
    try {
      const value = await AsyncStorage.getItem("first_time");
      console.log(value);
      if (value == null) {
        // value previously stored
        setModalVisible2(true);
      } else {
        // go to form
        getData();
      }
    } catch (e) {
      // error reading value
      alert(e);
    }
  };

  // get main user object
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
  // close modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const closeModal2 = () => {
    nextscreen();
    setModalVisible2(false);
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
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{
              fontFamily: "Poppins-Light",
              fontWeight: "bold",
              color: colors.secondary,
            }}
          >
            Log a period
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
          move={nextscreen}
          nextPeriod={user.lastperiod}
          usecycle={user.cycle}
          gotomore={gotohistory}
        />
      </SafeAreaView>
      {/* this is  modal for period tracking screen  */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <Logperiod close={closeModal} />
      </Modal>
      <Modal animationType="slide" transparent={false} visible={modalVisible2}>
        <FistTime navtoform={closeModal2} />
      </Modal>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  circles: {
    justifyContent: "center",
    alignItems: "center",
  },
  progresstitle: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: "Poppins-Light",
  },
  quickviewcard: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 9,
    backgroundColor: "white",
  },
  logperiodmodal: {
    width: windowWidth,
    height: windowHeight,
    padding: 10,
  },
  fisttimeuserhello: {
    fontSize: 100,
    color: colors.primary,
    fontWeight: "bold",
  },
  firsttimeintro: {
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Poppins-Light",
  },
  firstitmebtn: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 10,
  },
});
