# ⏱️ Custom Timer App

A multi-timer management app built using **React Native + Expo** that helps users create, control, and group multiple timers by category — with persistent storage, progress tracking, and history logging.

---

## 👩🏻‍💻 Built by [Shalini Nukella](https://github.com/shalininukella)

---

## 🚀 Features

### ✅ Core Functionality

- **Create Timer**

  - Input: Name, Duration, Category
  - Optional halfway alert
  - Stored persistently with AsyncStorage

- **Grouped Timer View**

  - Timers organized by category
  - Expand/collapse sections
  - Visual progress bars

- **Timer Controls**

  - Start / Pause / Reset
  - Auto completion handling
  - Halfway alert modal (if enabled)

- **Bulk Actions**

  - Start All / Pause All / Reset All (per category)

- **Timer History**
  - View list of completed timers with timestamps

---

## 🖼️ Screens

| Home                            | Add Timer         | History                        |
| ------------------------------- | ----------------- | ------------------------------ |
| 🕒 Grouped timers with controls | ➕ Add timer form | 📜 History of completed timers |

---

## 🧩 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

---

## 📦 Installation & Setup (Development)

### 1. Clone the repo

```bash
git clone https://github.com/shalininukella/custom-timer-app.git
cd custom-timer-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install web dependencies (for browser preview)

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

### 4. Start the app

```bash
npm start
```

Then press:

- `i` → Open in iOS Simulator
- `a` → Open in Android Emulator
- `w` → Open in Web Browser

---

## 📲 Download APK

Want to try it without setting up the code?

👉 **[Download the latest APK here](https://drive.google.com/file/d/1VFJUFbZzRUw5xS0UtX_UwQrXZDIqBOj0/view?usp=sharing)** (hosted via Google Drive)

> 📱 Once downloaded, install it on your Android device and start using the multi-timer functionality instantly!

---

## 🗂️ Project Structure

```
src/
├── components/         // Reusable UI components
├── screens/            // HomeScreen, AddTimerScreen, HistoryScreen
├── types/              // TS types (Timer, TimerStatus, etc.)
├── utils/              // Helper functions (storage, time utils)
├── App.tsx             // Navigation + app entry
```
