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

import { PieChart, BarChart } from "react-native-gifted-charts";

function Donatchart() {
  const data = [
    { value: 28, text: "28", color: colors.primary },
    { value: 5, text: "5", color: colors.secondary },
    { value: 10, text: "10", color: colors.tertiary },
  ];
  return (
    <View style={style.chartholder}>
      <PieChart data={data} donut radius={100} />
      <View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="circle" size={20} color={colors.primary} />
          <Text style={style.chartlegend}>Cycle length</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="circle" size={20} color={colors.secondary} />
          <Text style={style.chartlegend}>Period length</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="circle" size={20} color={colors.tertiary} />
          <Text style={style.chartlegend}>Ovulation length</Text>
        </View>
      </View>
    </View>
  );
}

function Bar() {
  const barData = [
    { value: 10, frontColor: "lavender" },
    { value: 20, frontColor: "lavender" },
    { value: 30, frontColor: colors.primary },
    { value: 30, frontColor: colors.primary },
    { value: 20, frontColor: "lavender" },
    { value: 15, frontColor: "lavender" },
  ];
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>Period Forecust</Text>
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        isAnimated
        animationDuration={1200}
        hideYAxisText
      />
    </View>
  );
}
export default function Analysis() {
  return (
    <ScrollView>
      <View style={{ padding: 10, alignItems: "center" }}>
        <Donatchart />
        <Text style={{ fontFamily: "Poppins-Light" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        <Bar />
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  chartholder: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  chartlegend: {
    fontSize: 15,
    fontFamily: "Poppins-Light",
    marginLeft: 10,
  },
});
