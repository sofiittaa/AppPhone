import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Ionicons name="camera" size={34} color="black" />
    </View>
  );
};

export default CameraIcon;

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
  },
});
