import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { ListItem, Avatar } from "@rneui/base";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPersons = async () => {
    try {
      const response = await fetch(
        "https://api.lagtinget.ax/api/persons.json?state=1",
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPersons();
  }, []);

  const printData = ({ item }) => {
    return <Text>item.name</Text>;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>{data[0].name}</Text>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <ListItem bottomDivider>
                  <Avatar
                    source={{
                      uri: "https://api.lagtinget.ax/sites/api.lagtinget.ax/files/LT23%20Anders%20Holmberg%2010.jpg",
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              )}
            />
          )}
        </View>
        <Text>{data[0].name}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
