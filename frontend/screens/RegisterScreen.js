import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await api.post("/register", { username, password });
      Alert.alert("Success", "Registration successful! Please log in.");
      navigation.navigate("Login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Error", "Username already taken");
      } else {
        Alert.alert("Error", "Could not connect to server");
      }
    }
  };

  return (
    <LinearGradient colors={["#ff9966", "#ff5e62"]} style={styles.container}>
      <View style={styles.formCard}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/100/ffffff/add-user-male.png",
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

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerText}>
            Already have an account? Login
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
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
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
    marginBottom: 15,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
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
