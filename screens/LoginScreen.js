import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../config/firebase";

const { height: SCREEN_SIZE } = Dimensions.get("window");
const LoginScreen = () => {
  const Navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Success"))
        .catch((err) => Alert.alert("Error Message: ", err.message));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, height: SCREEN_SIZE }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <>
              <View style={{ width: "80%", alignSelf: "center" }}>
                <Text style={styles.heading}>Login</Text>
                <TextInput
                  style={styles.input}
                  placeholder="abc@xyz.any"
                  textContentType="emailAddress"
                  onChangeText={(value) => setEmail(value.trim())}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  textContentType="password"
                  secureTextEntry={true}
                  onChangeText={setPassword}
                />
              </View>
            </>
            <>
              <View
                style={{
                  marginVertical: 30,
                }}
              >
                <>
                  {email && password ? (
                    <TouchableOpacity style={styles.button} onPress={onLogin}>
                      <Text style={styles.text}>Continue</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity disabled style={styles.buttonDisable}>
                      <Text style={styles.text}>Continue</Text>
                    </TouchableOpacity>
                  )}
                </>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => Navigation.navigate("Signup")}>
                  <Text style={styles.subtxtLink}>Signup</Text>
                </TouchableOpacity>
              </View>
            </>
          </View>
        </KeyboardAvoidingView>
        <StatusBar style="dark" animated />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    marginHorizontal: 10,
  },
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: { fontSize: 36, fontWeight: "bold", paddingVertical: 10 },
  input: {
    width: "100%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 4,
    paddingTop: 16,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#ff4f71",
    borderRadius: 16,
    padding: 16,
    paddingHorizontal: 40,
  },
  buttonDisable: {
    backgroundColor: "#ff4f71",
    borderRadius: 16,
    padding: 16,
    paddingHorizontal: 40,
    opacity: 0.4,
  },
  OutlineText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  buttonOutlineDisable: {
    borderWidth: 2,
    borderColor: "#ff4f71",
    borderRadius: 16,
    padding: 16,
    paddingHorizontal: 40,
    opacity: 0.4,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: "#ff4f71",
    borderRadius: 16,
    padding: 16,
    paddingHorizontal: 40,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  subtxtLink: {
    fontWeight: "bold",
    color: "#ff4f71",
  },
});
