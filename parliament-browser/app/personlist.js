import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/base";
import { Link } from "expo-router";

export default function PersonList() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("DESC");

  const toggleOrder = () => {
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setOrder(newOrder);
  };

  const personListFiltered = data.filter((person) =>
    person.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  const postListSorted = personListFiltered.sort((a, b) => {
    if (order === "ASC") {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

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

  const renderPersonListHeader = () => {
    return (
      <>
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          style={styles.input}
        />

        <TouchableOpacity style={styles.sortButton} onPress={toggleOrder}>
          <Text>
            Order: {order} - Total: {postListSorted.length}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const PersonCard = ({ person }) => (
    <Link
      href={{ pathname: "/personinfo", params: { id: person.id } }}
      push
      asChild
    >
      <ListItem bottomDivider style={styles.personcard}>
        <Avatar
          rounded
          source={person.image ? { uri: person.image.url } : null}
          title={person.name}
        />
        <ListItem.Content>
          <ListItem.Title>{person.name}</ListItem.Title>
          <ListItem.Subtitle>{person.birthday}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </Link>
  );

  const renderItem = ({ item }) => <PersonCard person={item} />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={postListSorted}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={renderPersonListHeader()}
              renderItem={renderItem}
            />
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
  },
  personcard: {
    height: 60,
    borderColor: "#74b1be",
    backgroundColor: "#2f3241",
    borderWidth: 2,
    margin: 8,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
