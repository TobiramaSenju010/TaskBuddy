import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../services/api";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // <-- store error message

  const handleLogin = async () => {
    setErrorMessage(""); // reset previous error

    if (!username || !password) {
      setErrorMessage("⚠️ Please fill in all fields");
      return;
    }

    try {
      const response = await api.post("/login", { username, password });
      navigation.replace("Dashboard", { user: response.data.user });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("❌ Wrong password. Try again.");
        } else if (error.response.status === 404) {
          setErrorMessage("❌ Username not found.");
        } else {
          setErrorMessage("⚠️ Login failed. Please try again.");
        }
      } else {
        setErrorMessage("⚠️ Could not connect to server.");
      }
    }
  };

  return (
    <LinearGradient colors={["#ff9966", "#ff5e62"]} style={styles.container}>
      <View style={styles.formCard}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/100/ffffff/user-male-circle.png",
          }}
          style={styles.icon}
        />

        <TextInput
          placeholder="Username"
          placeholderTextColor="#fff"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* 🔹 Show error message here */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>
            Don’t have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formCard: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    tintColor: "#fff",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    color: "#ff4d4d",
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff7f50",
    padding: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    color: "#fff",
    marginTop: 10,
  },
});
