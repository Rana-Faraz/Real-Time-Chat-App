import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "./config/firebase";
import ChatScreen from "./screens/ChatScreen";
import ConfirmEmail from "./screens/ConfirmEmail";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignupScreen from "./screens/SignupScreen";
import UserScreen from "./screens/UserScreen";

const Stack = createNativeStackNavigator();
export const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState(null);
  return (
    <AuthUserContext.Provider value={{ user, setUser, mail, setMail }}>
      {children}
    </AuthUserContext.Provider>
  );
};

const ChatStack = () => {
  const Navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="">
      <>
        <Stack.Screen
          name="Home"
          component={UserScreen}
          options={{
            headerLeft: () => {
              return (
                <TouchableOpacity>
                  <Ionicons name="search-outline" size={24} color="black" />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => Navigation.navigate("Settings")}
                >
                  {/* <Ionicons name="ios-exit-outline" size={24} color="black" /> */}
                  <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </>
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const { user, setUser } = useContext(AuthUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (AuthenticatedUser) => {
      AuthenticatedUser ? setUser(AuthenticatedUser) : setUser(null);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
