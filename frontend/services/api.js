import axios from "axios";
import { Platform } from "react-native";

// 🔹 Detect backend URL automatically with fallback
const getBaseURL = () => {
  // ✅ Default for web (Expo Web: localhost)
  let baseURL = "http://127.0.0.1:8000";

  // ✅ Manual fallback for physical devices (Expo Go)
  // Replace with your PC's LAN IP (find with ipconfig/ifconfig)
  const manualFallback = "http://192.168.1.10:8000";

  if (Platform.OS !== "web") {
    // 📱 On Expo Go (Android/iOS), localhost won't work, so use LAN IP
    baseURL = manualFallback;
  } else {
    // 🌐 On web, if running through Expo dev server (19006), map to backend (8000)
    if (window.location.origin.includes("19006")) {
      baseURL = window.location.origin.replace(":19006", ":8000");
    }
  }

  return baseURL;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
