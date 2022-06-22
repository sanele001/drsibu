import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/Feather";
import { Calendar } from "react-native-calendars";

import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "react-native/Libraries/NewAppScreen";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function MyCal() {
  const [day, setDay] = useState(new Date().toString());

  return (
    <View>
      <Calendar
        // Initially visible month. Default = now
        initialDate={day}
      />
    </View>
  );
}

function Emptynote() {
  return (
    <View>
      <Text>Your diary is empty, create notes</Text>
    </View>
  );
}
///////////////////////////////////////////////////////////////////////////
export default function Journal() {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [notedate, setNotedate] = useState(new Date().toString());
  const [mynotes, setMynotes] = useState([]);
  const [modalOnload, setModalOnload] = useState({});

  const [mytitle, setMytitle] = useState("");
  const [mybody, setMybody] = useState("");

  useEffect(() => {
    getnote();
  }, []);

  const getnote = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("notes");
      return jsonValue != null
        ? setMynotes(JSON.parse(jsonValue))
        : setMynotes([]);
    } catch (e) {
      // error reading value
    }
  };

  const showpromt = (index) => {
    Alert.alert("Warning", "are you sure you want to remove diary entry?", [
      {
        text: "Remove",
        onPress: () => removenotes(index),
      },
      {
        text: "Cancel",

        style: "cancel",
      },
    ]);
  };

  const addnote = () => {
    const temparrey = mynotes;
    const noteobj = {
      title: mytitle,
      body: mybody,
      day: notedate,
    };

    const newdata = [...temparrey, noteobj];
    setMynotes(newdata);
    setMytitle("");
    setMybody("");
    storenote(newdata);
  };

  const storenote = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("notes", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const removenotes = (index) => {
    const temparrey = mynotes;
    temparrey.splice(index, 1);

    setMynotes([...temparrey]);
    storenote(temparrey);
  };

  const handlemodal1 = () => {
    setModalVisible1(!modalVisible1);
  };
  const handlemodal2 = (item) => {
    setModalVisible2(!modalVisible2);
    setModalOnload(item);
  };
  return (
    <View style={styles.main}>
      <MyCal />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 5,
            marginTop: 20,
            color: colors.font,
          }}
        >
          Diary Entries {mynotes.length}
        </Text>
        <TouchableOpacity onPress={handlemodal1}>
          <Icon name="plus" size={30} color="grey" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={mynotes}
        renderItem={({ item, index }) => (
          <View style={styles.noteholder}>
            <TouchableOpacity
              onPress={() => handlemodal2(item)}
              style={{ width: "70%" }}
            >
              <Text style={styles.fontstyle}>
                {moment(item.day).format("llll")}
              </Text>
              <Text style={styles.titles}>{item.title}</Text>
            </TouchableOpacity>
            <Icon
              name="trash"
              size={30}
              color="white"
              onPress={() => showpromt(index)}
            />
          </View>
        )}
        ListEmptyComponent={<Emptynote />}
      />
      <Modal animationType="slide" transparent={false} visible={modalVisible1}>
        <View style={{ marginLeft: 20 }}>
          <Icon
            name="x"
            size={40}
            color="grey"
            style={{ marginTop: 20, marginBottom: 30 }}
            onPress={handlemodal1}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Title</Text>
          <TextInput
            style={{
              width: "80%",

              paddingBottom: 10,
              paddingTop: 10,
              fontSize: 15,
            }}
            placeholder="type here"
            maxLength={30}
            onChangeText={(text) => setMytitle(text)}
            value={mytitle}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Note</Text>
          <TextInput
            style={{
              width: "80%",

              paddingBottom: 10,
              paddingTop: 10,
              fontSize: 15,
            }}
            placeholder="type your story here"
            multiline={true}
            onChangeText={(text) => setMybody(text)}
            value={mybody}
          />
        </View>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: colors.primary,
            width: "80%",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: "10%",
          }}
          onPress={addnote}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </Modal>
      {/* second modal to react notices------------------------------------ */}
      <Modal animationType="slide" transparent={false} visible={modalVisible2}>
        <View
          style={{
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: "#ff9999",
            width: "100%",
            height: "100%",
          }}
        >
          <Icon
            name="x"
            size={40}
            color="grey"
            style={{ marginTop: 20, marginBottom: 30 }}
            onPress={handlemodal2}
          />
          <Text style={{ fontFamily: "Poppins-Light", fontSize: 17 }}>
            {modalOnload && moment(modalOnload.day).format("llll")}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {modalOnload && modalOnload.title}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Light",
              fontSize: 16,
              marginTop: 20,
              color: "white",
            }}
          >
            {modalOnload && modalOnload.body}
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: windowHeight,
    padding: 5,
  },
  noteholder: {
    backgroundColor: "#F4C2C2",
    marginBottom: 10,
    padding: 10,
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontstyle: {
    fontFamily: "Poppins-Light",
    color: colors.secondary,
  },
  titles: {
    color: colors.font,
    fontWeight: "bold",
  },
});
