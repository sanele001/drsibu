import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useEffect } from "react";

import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

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
            Daily insights
          </Text>
          <Text style={{ color: "white" }}>Recommended articles</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

function LoadingComp() {
  return (
    <View>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}

function Foot() {
  return <View style={{ height: 150 }}></View>;
}

function List({ articleData }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handlelink = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={{ height: "60%" }}>
      <Text style={styles.listtitle}>Featured articles</Text>
      <FlatList
        data={articleData}
        renderItem={({ item }) => (
          <View style={styles.articlecardholder}>
            <ImageBackground
              source={{ uri: item.pic }}
              style={styles.backgoundpic}
            >
              <TouchableOpacity
                style={styles.titleholder}
                onPress={() => handlelink(item.doc)}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: "white" }}>Learn more</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}
        ListEmptyComponent={<LoadingComp />}
        ListFooterComponent={<Foot />}
      />
    </View>
  );
}

export default function Content() {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: "keydANeIcMSXo1If5" }).base(
    "appWDdeVKO3SSRNMi"
  );
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    console.log("runn");
    base("Publication")
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 6,
        view: "Grid view",
      })
      .eachPage(
        function page(records) {
          // This function (`page`) will get called for each page of records.
          let tempdata = [];

          records.forEach(function (record) {
            const obj = {
              title: record.get("Tittle"),
              pic: record.get("Pic"),
              doc: record.get("Document"),
            };
            tempdata.push(obj);
          });
          setArticle(tempdata);

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };

  return (
    <View style={{ height: windowHeight, width: windowWidth }}>
      <Mainarticle />
      <List articleData={article} />
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
