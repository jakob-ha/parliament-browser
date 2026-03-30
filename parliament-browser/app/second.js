import { StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SecondScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text>Second</Text>
          <Link href="/index" push asChild>
            <Text>WOOSH</Text>
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    justifyContent: "center",
  },
});
