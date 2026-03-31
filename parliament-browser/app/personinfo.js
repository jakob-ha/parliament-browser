import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

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

  const today = new Date();

  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text style={styles.title}>{personData.name}</Text>
              <Text style={styles.email}>{personData.email}</Text>
              <ScrollView>
                {personData.bindings.map((binding) => {
                  if (binding.period_end.localeCompare(date) === 1) {
                    return (
                      <View
                        key={
                          binding.organization +
                          binding.role +
                          binding.period_start
                        }
                      >
                        <Text style={styles.role}>
                          {roleData.find(({ id }) => id === binding.role).title}
                          {" i "}
                          {
                            organizationData.find(
                              ({ id }) => id === binding.organization,
                            ).title
                          }
                          {" från " +
                            binding.period_start +
                            " till " +
                            binding.period_end}
                        </Text>
                      </View>
                    );
                  }
                })}
              </ScrollView>
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
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
  },
  email: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
  },
  role: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#737373",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
