import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";

const { height: SCREEN_SIZE } = Dimensions.get("screen");
const UserScreen = () => {
  const Navigation = useNavigation();

  // const checkVerification = () => {
  //   if (auth.currentUser) {
  //     setVerified(true);
  //   }
  // };
  // const [mail, setMail] = useState(null);
  // const [readMail, setReadMail] = useState(null);
  // const [verified, setVerified] = useState(false);

  // const docRef = () => {
  //   setMail(true);
  //   setDoc(doc(db, "users", auth.currentUser.uid), {
  //     mailVerify: mail,
  //     timestamp: serverTimestamp(),
  //   }).then(() => console.log("Document written with ID: ", docRef.id));
  // };
  // useEffect(() => {
  //   const unsub = onSnapshot(
  //     doc(db, "users", auth.currentUser.uid),
  //     (snapshot) => {
  //       if (!snapshot.exists()) {
  //         Navigation.navigate("Confirm");
  //       } else {
  //         Navigation.navigate("Chat");
  //       }
  //     }
  //   );
  //   return unsub();
  // }, []);
  // // useEffect(() => {
  // //   // setReadMail(
  // //   console.log(getDoc(collection(db, `users`, `${auth.currentUser.uid}`)));
  // //   console.log(readMail);
  // // }, []);
  // // const timer = () => {
  // //   setTimeout(() => {
  // //     checkVerification();
  // //     console.log(auth.currentUser.emailVerified);
  // //     clearTimeout();
  // //     timer();
  // //   }, 10000);
  // // };

  // // useEffect(() => {
  // //   timer();
  // // }, []);

  // // const verifyEmail = () => {
  // //   sendEmailVerification(auth.currentUser)
  // //     .then(() => console.log("Sent"))
  // //     .catch((err) => console.log(err.message));
  // // };
  // const changeEmail = () => {
  //   auth
  //     .signOut()
  //     .then(() => console.log("Deleted"))
  //     .catch((err) => console.log(err.message));
  // };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.bubble}
          onPress={() => Navigation.navigate("Chat")}
        >
          <Ionicons name="ios-chatbubbles-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  // heading: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   paddingVertical: 10,
  // },
  container: {
    height: SCREEN_SIZE,
  },
  bubble: {
    padding: 15,
    borderRadius: 50,

    position: "absolute",
    top: SCREEN_SIZE * 0.75,
    right: 30,
    backgroundColor: "#ff4f71",
  },
  // topContainer: {
  //   alignSelf: "flex-start",
  //   position: "absolute",
  //   top: 20,
  // },
  // button: {
  //   backgroundColor: "#ff4f71",
  //   borderRadius: 16,
  //   padding: 16,
  //   paddingHorizontal: 40,
  //   marginTop: 15,
  // },
  // buttonOutline: {
  //   borderWidth: 2,
  //   borderColor: "#ff4f71",
  //   borderRadius: 16,
  //   padding: 14,
  //   paddingHorizontal: 40,
  //   marginTop: 15,
  // },
  // OutlineText: {
  //   textAlign: "center",
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "black",
  // },
  // text: {
  //   textAlign: "center",
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "white",
  // },
  // subtxt: {
  //   fontSize: 20,
  // },
});
