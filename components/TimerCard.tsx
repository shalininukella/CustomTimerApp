import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from "./ProgressBar";
import { Timer, TIMER_STATUS } from "../types";
import { appendHistory } from "../utils/storage";

export default function TimerCard({
  timer,
  timers,
  onUpdate,
}: {
  timer: Timer;
  timers: Timer[];
  onUpdate: (t: Timer[]) => void;
}) {
  const [remaining, setRemaining] = useState(timer.remaining);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const halfwayNotified = useRef(false);

  useEffect(() => {
    if (timer.status === TIMER_STATUS.RUNNING) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (
            timer.halfwayAlert &&
            !halfwayNotified.current &&
            prev === Math.floor(timer.duration / 2)
          ) {
            Alert.alert("Halfway there!", timer.name);
            halfwayNotified.current = true;
          }
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            complete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [timer.status]);

  useEffect(() => setRemaining(timer.remaining), [timer.remaining]);

  function updateStatus(status: Timer["status"]) {
    const updated = timers.map((t) =>
      t.id === timer.id ? { ...t, status, remaining } : t
    );
    onUpdate(updated);
  }
  function reset() {
    setRemaining(timer.duration);
    const updated = timers.map((t) =>
      t.id === timer.id
        ? { ...t, remaining: t.duration, status: TIMER_STATUS.PAUSED }
        : t
    );
    onUpdate(updated);
    halfwayNotified.current = false;
  }
  async function complete() {
    const updated = timers.map((t) =>
      t.id === timer.id
        ? { ...t, status: TIMER_STATUS.COMPLETED, remaining: 0 }
        : t
    );
    onUpdate(updated);
    await appendHistory({
      id: timer.id,
      name: timer.name,
      completedAt: new Date().toLocaleString(),
    });
    Alert.alert("🎉 Timer Complete", timer.name);
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {timer.name} ({timer.category})
      </Text>
      <ProgressBar progress={remaining / timer.duration} />
      <Text>
        {remaining}s / {timer.duration}s
      </Text>
      <Text>Status: {timer.status}</Text>
      <View style={styles.buttons}>
        <Button
          title="Start"
          onPress={() => updateStatus(TIMER_STATUS.RUNNING)}
          disabled={timer.status === TIMER_STATUS.COMPLETED}
        />
        <Button
          title="Pause"
          onPress={() => updateStatus(TIMER_STATUS.PAUSED)}
          disabled={timer.status !== TIMER_STATUS.RUNNING}
        />
        <Button title="Reset" onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, marginVertical: 8, borderWidth: 1, borderRadius: 6 },
  title: { fontSize: 16, fontWeight: "bold" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
