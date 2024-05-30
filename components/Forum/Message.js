import { StyleSheet, View, Text } from "react-native";

import { Colors } from "../../constants/styles";
import { UserContext } from "../../store/user-context";
import { useContext } from "react";

function Message({ message }) {
  const userCtx = useContext(UserContext);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.user}>
        {message.user}
        {userCtx.email === message.user && <Text>(me)</Text>}:{" "}
      </Text>
      <View
        style={[
          styles.message,
          userCtx.email === message.user && styles.myMessage,
        ]}
      >
        <Text>{message.message}</Text>
        <Text style={styles.date}>{message.date}</Text>
      </View>
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  message: {
    backgroundColor: Colors.primary100,
    opacity: 0.9,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 1,
    borderRadius: 8,
    padding: 9,
    width: "98%",
    justifyContent: "center",
    color: Colors.primary500,
  },
  myMessage: {
    backgroundColor: Colors.primary300,
  },
  user: {
    color: Colors.primary900,
    alignSelf: "flex-start",
  },
  date: {
    fontSize: 8,
    color: Colors.primary500,
  },
});
