import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView, Button } from "react-native";
import { TextInput } from "react-native";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { AntDesign } from "@expo/vector-icons";

const TalhaScreen = () => {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState();
  const [email, setEmail] = React.useState("");
  const [userDoc, setUserDoc] = React.useState(null);
  const [id, setId] = React.useState("");
  const [update, setUpdate] = React.useState(false);

  const Create = () => {
    function randomId() {
      return Math.random().toString(36).substr(2, 9);
    }
    const random = randomId();

    const myDoc = doc(db, "MyCollection", random);

    const docData = {
      name: name,
      age: age,
      email: email,
      createdAt: serverTimestamp(),
      createdBy: "Talha",
      id: random,
    };

    setDoc(myDoc, docData).catch((error) => {
      alert(error.message);
    });
    setAge(null);
    setName("");
    setEmail("");
  };

  useEffect(() => {
    const myDoc = collection(db, "MyCollection");
    const q = query(myDoc, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setUserDoc(
        snapshot.docs.map((snapshot) => ({
          createdAt: snapshot.data().createdAt,
          name: snapshot.data().name,
          age: snapshot.data().age,
          email: snapshot.data().email,
          id: snapshot.data().id,
        }))
      );
    });
    console.log(userDoc);
    return unsub;
  }, []);

  const Update = (id, value, merge) => {
    const myDoc = doc(db, "MyCollection", id);

    setDoc(myDoc, value, { merge: merge })
      .then(() => {
        alert("Updated Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
    setId("");
    setUpdate(false);
    setName("");
    setAge("");
    setEmail("");
  };

  function Delete(id) {
    const myDoc = doc(db, "MyCollection", id);

    deleteDoc(myDoc).catch((error) => {
      alert(error.message);
    });
    setId("");
    setUpdate(false);
    setName("");
    setAge("");
    setEmail("");
  }
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 30 }}>
      <Text>Email</Text>
      <TextInput
        style={{ width: "100%", height: 30, backgroundColor: "lightgray" }}
        onChangeText={(text) => setEmail(text)}
        textContentType="emailAddress"
        value={email}
      />
      <Text>Name</Text>
      <TextInput
        style={{ width: "100%", height: 30, backgroundColor: "lightgray" }}
        onChangeText={(text) => setName(text)}
        textContentType="name"
        value={name}
      />
      <Text>Age</Text>
      <TextInput
        style={{ width: "100%", height: 30, backgroundColor: "lightgray" }}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
        value={age}
      />
      {update ? (
        <Button
          title="Update"
          onPress={() =>
            Update(
              id,
              {
                name: name,
                age: age,
                email: email,
                lastUpdated: serverTimestamp(),
                lastUpdatedBy: "Talha",
              },
              true
            )
          }
        />
      ) : (
        <Button title="Submit" onPress={Create} />
      )}

      {userDoc
        ? userDoc.map((item, index) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.age}</Text>
              <View style={{ flexDirection: "row" }}>
                <AntDesign
                  name="delete"
                  size={24}
                  color="black"
                  onPress={() => Delete(item.id)}
                />
                <AntDesign
                  name="edit"
                  size={24}
                  color="black"
                  onPress={() => {
                    setName(item.name);
                    setAge(item.age);
                    setEmail(item.email);
                    setId(item.id);
                    setUpdate(true);
                  }}
                />
              </View>
            </View>
          ))
        : null}
    </SafeAreaView>
  );
};

export default TalhaScreen;

const styles = StyleSheet.create({});
