import { LogBox } from "react-native";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

LogBox.ignoreLogs(["source.uri should not be an empty string"]);
LogBox.ignoreLogs(["The file “Expo Go” couldn’t be opened."]);

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./src/app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
