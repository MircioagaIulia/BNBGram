import { StyleSheet, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import BackgroundImage from "../components/ui/BackgroundImage";
import { Colors } from "../constants/styles";
import Chat from "../components/Forum/Chat";
import { storeMessage } from "../util/http";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { fetchMessage } from "../util/http";
import Message from "../components/Forum/Message";

function Forum({ route }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [count, setCount] = useState(0);

  const isFocused = useIsFocused();
  async function createMessageHandler(message) {
    try {
      await storeMessage(message);
      setCount((count) => count + 1);
    } catch (error) {
      Alert.alert("Not enough arguments", "You have to fill al the fields");
    }
  }

  useEffect(() => {
    async function loadMessages() {
      setIsFetching(true);
      try {
        const message = await fetchMessage();
        setLoadedMessages(message);
      } catch (error) {
        setError("Could not fetch messages!");
      }
      setIsFetching(false);
    }
    loadMessages();
  }, [isFocused, route, count]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View all messages..." />;
  }

  return (
    <BackgroundImage>
      <View style={styles.forum}>
        <FlatList
          data={loadedMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Message message={item} />}
        />
        <Chat onCreateMessage={createMessageHandler} />
      </View>
    </BackgroundImage>
  );
}

export default Forum;

const styles = StyleSheet.create({
  forum: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.primary500,
    opacity: 0.8,
  },
});
