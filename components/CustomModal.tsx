import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, TouchableOpacity } from "react-native";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode | ((props: { close: () => void }) => ReactNode);
}

export default function CustomModal({
  visible,
  onClose,
  children,
}: CustomModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          {typeof children === "function"
            ? (children as (props: { close: () => void }) => ReactNode)({
                close: onClose,
              })
            : children}
          {/* {children} */}
          {/* <TouchableOpacity onPress={onClose}>
            <Text>Cancel</Text>
          </TouchableOpacity> */}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    borderRadius: 25,
    padding: 20,
    backgroundColor: "#fff",
    position: "relative", // Ensure absolute positioning works for children
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
    padding: 5,
  },
});
