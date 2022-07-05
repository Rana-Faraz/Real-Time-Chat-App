import { default as React } from "react";
import TalhaScreen from "./screens/TalhaScreen";
import StackNavigator, { AuthUserProvider } from "./StackNavigator";

export default function App() {
  return (
    <AuthUserProvider>
      {/* <StackNavigator /> */}
      <TalhaScreen />
    </AuthUserProvider>
  );
}
