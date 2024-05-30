import { View, Text, StyleSheet, Modal } from "react-native";
import { useState } from "react";

import { Colors } from "../../constants/styles";
import OutlinedButton from "./OutlinedButton";

function CustomModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient colors={[Colors.primary1100, Colors.primary1200]}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this item?
              </Text>
              <View style={styles.modalButtons}>
                <OutlinedButton>
                  <Text style={styles.textStyle}>Delete</Text>
                </OutlinedButton>
                <OutlinedButton onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>No</Text>
                </OutlinedButton>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}

export default CustomModal;

const styles = StyleSheet.create({
  viewPort: {
    height: "50%",
    marginTop: "30%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: Colors.primary1000,
    width: "80%",
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 16,
    elevation: 5,
    shadowColor: Colors.primary500,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    padding: 24,
    opacity: 0.7,
  },
  text: {
    textShadowColor: Colors.primary500,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    flex: 2,
    fontSize: 20,
  },
});
