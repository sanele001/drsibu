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

function Indicators() {
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
          Asanda
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

function Progess() {
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
        value={10}
        radius={120}
        maxValue={28}
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

function QuickView({ move }) {
  return (
    <View
      style={{
        width: windowWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View style={style.quickviewcard}>
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
      <View style={style.quickviewcard}>
        <Icon name="tint" size={30} color={colors.primary} />
        <Text style={{ marginTop: 10, fontWeight: "bold", color: colors.font }}>
          Next Period
        </Text>
        <Text style={{ fontFamily: "Poppins-Light", color: colors.font }}>
          Jun 23 2022
        </Text>
      </View>
    </View>
  );
}

export default function Home({ navigation }) {
  const nextscren = () => navigation.navigate("Details");

  return (
    <ScrollView>
      <SafeAreaView>
        <Datestrip />
        <Indicators />
        <Progess />
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
        <QuickView move={nextscren} />
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
    backgroundColor: "lavender",
  },
});
