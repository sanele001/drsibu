import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/FontAwesome";

const backgoundpic = require("../assets/period2.png");
const mainpic = require("../assets/period1.jpg");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Mainarticle() {
  return (
    <View style={{ height: "40%" }}>
      <ImageBackground source={backgoundpic} style={styles.backgoundpic}>
        <TouchableOpacity style={styles.titleholder}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Period pain
          </Text>
          <Text style={{ color: "white" }}>Learn more</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

function List() {
  const articles = [1, 2, 3, 4, 5, 6];
  return (
    <View style={{ height: "60%" }}>
      <Text style={styles.listtitle}>Featured articles</Text>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View style={styles.articlecardholder}>
            <ImageBackground source={backgoundpic} style={styles.backgoundpic}>
              <TouchableOpacity style={styles.titleholder}>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
                >
                  Period pain
                </Text>
                <Text style={{ color: "white" }}>Learn more</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}
      />
    </View>
  );
}

export default function Content() {
  return (
    <View style={{ height: windowHeight, width: windowWidth }}>
      <Mainarticle />
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  articlecardholder: {
    width: "40%",
    height: 200,
    borderRadius: 10,

    marginBottom: 10,
  },
  backgoundpic: {
    flex: 1,
    resizeMode: "cover",
    padding: 10,
    justifyContent: "flex-end",
    borderRadius: 10,
  },
  titleholder: {
    padding: 5,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  listtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
});
