import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";

const rootdate = new Date().toString();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Clndr() {
  return (
    <View style={{ marginTop: 20 }}>
      <Calendar
        markingType={"period"}
        markedDates={{
          "2022-05-25": {
            startingDay: true,
            textColor: "white",
            color: colors.primary,
          },
          "2022-05-26": { color: colors.primary, selected: true },
          "2022-05-27": {
            selected: true,

            color: colors.primary,
            textColor: "white",
          },
          "2022-05-28": {
            disabled: true,

            color: colors.primary,
            endingDay: true,
          },
        }}
      />
    </View>
  );
}

function Fourtabs() {
  return (
    <View style={{ alignItems: "center" }}>
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
          <Text style={styles.carrdtitle}>March 25 2022</Text>
          <Text style={styles.smalltest}>Period starts</Text>
        </View>
        <View style={styles.cardtab}>
          <Text style={styles.carrdtitle}>March 25 2022</Text>
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
          <Text style={styles.carrdtitle}>March 25 2022</Text>
          <Text style={styles.smalltest}>Period end</Text>
        </View>
        <View
          style={{
            width: "45%",
            backgroundColor: "lavender",
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 9,

            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Icon name="plus" size={30} color={colors.primary} />
          <Text style={styles.smalltest}>symptoms </Text>
        </View>
      </View>
    </View>
  );
}

export default function Mycalendar() {
  return (
    <SafeAreaView style={{ padding: 10 }}>
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
      <Fourtabs />
    </SafeAreaView>
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
});
