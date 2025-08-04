import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { NavigationProps, TimerHistoryItem } from "../types";
import { loadHistory } from "../utils/storage";
import { StyleSheet } from "react-native";
import { Button } from "react-native";

export default function HistoryScreen({
  navigation,
}: NavigationProps<"History">) {
  const [history, setHistory] = useState<TimerHistoryItem[]>([]);
  useEffect(() => {
    loadHistory().then(setHistory);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer History</Text>
      <FlatList
        data={history}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <Text style={styles.entry}>
            {item.name} — {item.completedAt}
          </Text>
        )}
      />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  entry: { fontSize: 16, paddingVertical: 6 },
});
