import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/FontAwesome";
import CalendarStrip from "react-native-calendar-strip";
import CircularProgress from "react-native-circular-progress-indicator";
import { color } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { useState } from "react";
import * as WebBrowser from "expo-web-browser";

const rootdate = new Date().toString();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Landing({ navigation }) {
  const handleWebterms = async () => {
    await WebBrowser.openBrowserAsync(
      "https://pages.flycricket.io/ivy-woman/terms.html"
    );
  };

  const handleWebPri = async () => {
    await WebBrowser.openBrowserAsync(
      "https://pages.flycricket.io/ivy-woman/privacy.html"
    );
  };
  return (
    <View style={styles.holder}>
      <View style={styles.coulosal}>
        <ImageBackground
          source={require("../assets/women.jpg")}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <Svg
            viewBox="0 0 1440 320"
            height="60%"
            width="100%"
            style={{ position: "absolute", top: "60%" }}
          >
            <Path
              fill="lavender"
              fill-opacity="1"
              d="M0,32L48,74.7C96,117,192,203,288,234.7C384,267,480,245,576,229.3C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></Path>
          </Svg>
          <View
            style={{
              flexDirection: "row",
              width: "40%",

              justifyContent: "space-around",
              marginTop: "20%",
            }}
          >
            <TouchableOpacity style={styles.twobtns} onPress={handleWebterms}>
              <Icon name="warning" size={20} color={colors.primary} />
              <Text>Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.twobtns} onPress={handleWebPri}>
              <Icon name="info-circle" size={20} color={colors.primary} />
              <Text>Privecy</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <Text style={{ fontSize: 35, fontWeight: "bold", color: colors.primary }}>
        WELCOME TO IVY
      </Text>
      <Text
        style={{
          alignSelf: "flex-start",
          marginLeft: "12%",
          color: colors.font,
          fontWeight: "bold",
        }}
      >
        Track , Learn , Relax
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Icon name="check-square" size={20} color={colors.primary} />
        <Text style={{ fontSize: 15, color: colors.font, marginLeft: 5 }}>
          procced to agree to our terms of service
        </Text>
      </View>

      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: colors.primary,
          width: "80%",
          marginTop: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("tabs")}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>
          Proceed
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "lavender",
  },

  coulosal: {
    width: windowWidth,
    height: "50%",
  },
  twobtns: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderColor: colors.primary,
    borderWidth: 1,
    marginRight: 5,

    borderRadius: 10,
  },
});
