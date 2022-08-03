import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/FontAwesome";

import { useEffect, useState } from "react";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CycleMonitor() {
  const [periodDate, setPeriodDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [dateOne, setDateone] = useState(0);
  const [dateTwo, setDateTwo] = useState(0);
  const [dateThree, setDateThree] = useState(0);
  const [trak, setTrack] = useState(0);
  const [everg, setEvarage] = useState(0);

  useEffect(() => {
    getTracker().then(handleEverage());
  }, []);

  // getting stored values
  const getTracker = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("tracker");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      setDateone(data.one);
      setDateTwo(data.two);
      setDateThree(data.three);
      setTrack(data.tracker);
    } catch (e) {
      // error reading value
    }
  };

  const handleDateInputs = (date) => {
    // this is culclating days passed between the day and the last period day
    const currentDate = moment();
    const returnDate = moment(date);
    var days_diff = currentDate.diff(returnDate, "days");

    if (cycleMonitorobj.tracker === 0) {
      setTrack(1);
      cycleMonitorobj["one"] = days_diff;
      setDateone(days_diff);
      storeCycleLenghtTrackingObj(cycleMonitorobj);
    } else if (cycleMonitorobj.tracker === 1) {
      setTrack(2);
      cycleMonitorobj["two"] = days_diff;
      setDateTwo(days_diff);
      storeCycleLenghtTrackingObj(cycleMonitorobj);
    } else if (cycleMonitorobj.tracker === 2) {
      setDateThree(days_diff);
      cycleMonitorobj["three"] = days_diff;
      storeCycleLenghtTrackingObj(cycleMonitorobj);
    }
  };

  // culculating the everage..............
  const handleEverage = () => {
    if (dateOne && dateTwo && dateThree) {
      const adding = dateOne + dateTwo + dateThree;
      const result = adding / 3;
      setEvarage(result);
    }
  };

  const cycleMonitorobj = {
    one: dateOne,
    two: dateTwo,

    three: dateThree,
    tracker: trak,
  };

  const storeCycleLenghtTrackingObj = async (cycleMonitorobj) => {
    try {
      const jsonValue = JSON.stringify(cycleMonitorobj);
      await AsyncStorage.setItem("tracker", jsonValue);
    } catch (e) {}
  };

  // tracker
  return (
    <View style={styles.holder}>
      <View style={styles.dateinp}>
        <Text>When did your last period start?</Text>
        <TouchableOpacity
          onPress={() => {
            setOpenDate(true);
          }}
        >
          <Icon name="calendar" size={40} />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.monthCard}>
          <Text style={styles.monthsLabes}>Month one</Text>
          <View style={styles.numberHolder}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {dateOne ? dateOne + " days" : "00 days"}
            </Text>
          </View>
        </View>
        <View style={styles.monthCard}>
          <Text style={styles.monthsLabes}>Month two</Text>
          <View style={styles.numberHolder}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {dateTwo ? dateTwo + " days" : "00 days"}
            </Text>
          </View>
        </View>
        <View style={styles.monthCard}>
          <Text style={styles.monthsLabes}>Month three</Text>
          <View style={styles.numberHolder}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {dateThree ? dateThree + " days" : "00 days"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.eveSection}>
        <Text>
          your everage cycle is {""}
          {everg != 0 ? Math.round(Number(everg) * 10) / 10 : " Unkown"} days
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.tertiary,
            padding: 10,
            borderRadius: 9,
          }}
          onPress={handleEverage}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Get everage
          </Text>
        </TouchableOpacity>
        {openDate && (
          <DateTimePicker
            modal
            value={periodDate}
            onChange={(event, selectedDate) => {
              if (event.type !== "dismissed") {
                setOpenDate(false);
                handleDateInputs(selectedDate);
              }
            }}
            maximumDate={new Date()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  holder: {
    width: windowWidth,
    height: windowHeight,
    padding: 10,
  },
  monthsLabes: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 20,
  },
  monthCard: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  numberHolder: {
    padding: 10,
    backgroundColor: "white",
    width: 100,
  },
  dateinp: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10%",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },

  eveSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10%",
    borderTopWidth: 1,
    paddingTop: 30,
  },
});
