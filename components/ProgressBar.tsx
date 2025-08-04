import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.bg}>
      <View style={[styles.fg, { width: `${progress * 100}%` }]} />
    </View>
  );
}
const styles = StyleSheet.create({
  bg: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 4,
  },
  fg: { height: "100%", backgroundColor: "#4caf50" },
});
