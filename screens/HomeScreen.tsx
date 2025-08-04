import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationProps, Timer } from "../types";
import { loadTimers, saveTimers } from "../utils/storage";
import { TIMER_STATUS } from "../types";
import { Pressable } from "react-native";
import TimerCard from "../components/TimerCard";
import { TextInput } from "react-native";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";

export default function HomeScreen({ navigation }: NavigationProps<"Home">) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  useEffect(() => {
    loadTimers().then(setTimers);
  }, []);

  function onUpdate(updated: Timer[]) {
    setTimers(updated);
    saveTimers(updated);
  }

  function addTimer() {
    const newTimer: Timer = {
      id: Date.now().toString(),
      name,
      duration: Number(duration),
      remaining: Number(duration),
      category,
      status: TIMER_STATUS.PAUSED,
      halfwayAlert,
    };
    const updated = [...timers, newTimer];
    onUpdate(updated);
    setModalVisible(false);
    setName("");
    setDuration("");
    setCategory("");
    setHalfwayAlert(false);
  }

  const grouped = timers.reduce<Record<string, Timer[]>>((acc, t) => {
    (acc[t.category] ||= []).push(t);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Button title="+ Add Timer" onPress={() => setModalVisible(true)} />
      <Button title="History" onPress={() => navigation.navigate("History")} />
      <FlatList
        data={Object.keys(grouped)}
        keyExtractor={(c) => c}
        renderItem={({ item: cat }) => (
          <View>
            <Pressable
              onPress={() =>
                setOpenCategories((o) => ({ ...o, [cat]: !o[cat] }))
              }
            >
              <Text style={styles.catTitle}>
                {cat} ({grouped[cat].length})
              </Text>
            </Pressable>
            {openCategories[cat] &&
              grouped[cat].map((t) => (
                <TimerCard
                  key={t.id}
                  timer={t}
                  timers={timers}
                  onUpdate={onUpdate}
                />
              ))}
            <View style={styles.bulk}>
              <Button
                title="Start All"
                onPress={() =>
                  onUpdate(
                    timers.map((t) =>
                      t.category === cat
                        ? { ...t, status: TIMER_STATUS.RUNNING }
                        : t
                    )
                  )
                }
              />
              <Button
                title="Pause All"
                onPress={() =>
                  onUpdate(
                    timers.map((t) =>
                      t.category === cat
                        ? { ...t, status: TIMER_STATUS.PAUSED }
                        : t
                    )
                  )
                }
              />
              <Button
                title="Reset All"
                onPress={() =>
                  onUpdate(
                    timers.map((t) =>
                      t.category === cat
                        ? {
                            ...t,
                            status: TIMER_STATUS.PAUSED,
                            remaining: t.duration,
                          }
                        : t
                    )
                  )
                }
              />
            </View>
          </View>
        )}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Duration (sec)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text>Halfway Alert:</Text>
            <Button
              title={halfwayAlert ? "Yes" : "No"}
              onPress={() => setHalfwayAlert(!halfwayAlert)}
            />
          </View>
          <Button title="Add" onPress={addTimer} />
          <Pressable onPress={() => setModalVisible(false)}>
            <Text style={{ marginTop: 12 }}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  catTitle: {
    fontSize: 18,
    marginTop: 12,
    backgroundColor: "#ddd",
    padding: 6,
  },
  bulk: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  modal: { flex: 1, padding: 20, justifyContent: "center" },
  input: { borderWidth: 1, padding: 8, marginBottom: 12, borderRadius: 4 },
});
