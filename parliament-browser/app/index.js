import { StyleSheet, View, Text, Button } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Parliament Browser</Text>
          <Link href="/personlist" push asChild>
            <Button title="Member List" />
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 20,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
