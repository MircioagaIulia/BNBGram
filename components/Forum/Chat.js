import { StyleSheet, View, TextInput } from "react-native";
import { useContext, useState } from "react";

import { Colors } from "../../constants/styles";
import ChatButton from "../ui/ChatButton";
import { Message } from "../../models/message";
import { UserContext } from "../../store/user-context";

function Chat({ onCreateMessage }) {
  const [enteredText, setEnteredText] = useState("");

  const userCtx = useContext(UserContext);
  const currentDate = new Date();

  function enteredTextHandler(enteredText) {
    setEnteredText(enteredText);
  }

  function showTextHandler() {
    if (enteredText !== "") {
      onCreateMessage(
        new Message(enteredText, userCtx.email, currentDate.toDateString())
      );
      setEnteredText("");
    }
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.chat, enteredText.length > 0 && styles.highlight]}
        onChangeText={enteredTextHandler}
        value={enteredText}
      />
      <ChatButton onPress={showTextHandler}>Send</ChatButton>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  chat: {
    backgroundColor: Colors.primary900,
    opacity: 0.9,
    width: "80%",
    borderRadius: 8,
    padding: 4,
  },
  text: {
    color: Colors.primary900,
  },
  highlight: {
    borderBottomWidth: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary900,
    elevation: 10,
    fontWeight: "bold",
  },
});
