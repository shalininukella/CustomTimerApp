export const TIMER_STATUS = {
  RUNNING: "Running",
  PAUSED: "Paused",
  COMPLETED: "Completed",
} as const;

export type TimerStatus = (typeof TIMER_STATUS)[keyof typeof TIMER_STATUS];

export interface Timer {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  category: string;
  status: TimerStatus;
  halfwayAlert?: boolean;
}

export interface TimerHistoryItem {
  id: string;
  name: string;
  completedAt: string;
}

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  AddTimer: undefined;
  TimerDetails: { id: string }; // Optional
};

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};
