import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

export default function PersonInfo() {
  const params = useLocalSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [personData, setPersonData] = useState([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [roleData, setRoleData] = useState([]);

  const getData = async () => {
    try {
      const personResponse = await fetch(
        "https://api.lagtinget.ax/api/persons/" + params.id + ".json",
      );
      const personJson = await personResponse.json();

      setPersonData(personJson);
      const organizationResponse = await fetch(
        "https://api.lagtinget.ax/api/organizations.json",
      );
      const organizationJson = await organizationResponse.json();

      setOrganizationData(organizationJson);
      const roleResponse = await fetch(
        "https://api.lagtinget.ax/api/roles.json",
      );
      const roleJson = await roleResponse.json();

      setRoleData(roleJson);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text>{params.id}</Text>
              <Text>{personData.last_name}</Text>
              <Text>{organizationData[0].title}</Text>
              <Text>{roleData[0].title}</Text>
            </>
          )}
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
