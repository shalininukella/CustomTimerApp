import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timer, TimerHistoryItem } from "../types";

export async function loadTimers(): Promise<Timer[]> {
  const s = await AsyncStorage.getItem("timers");
  return s ? JSON.parse(s) : [];
}
export async function saveTimers(timers: Timer[]) {
  await AsyncStorage.setItem("timers", JSON.stringify(timers));
}

export async function loadHistory(): Promise<TimerHistoryItem[]> {
  const s = await AsyncStorage.getItem("history");
  return s ? JSON.parse(s) : [];
}
export async function appendHistory(item: TimerHistoryItem) {
  const hist = await loadHistory();
  hist.unshift(item);
  await AsyncStorage.setItem("history", JSON.stringify(hist));
}
