import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../services/api";

export default function DashboardScreen({ navigation, route }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const projectResponse = await api.get("/projects");
      setProjects(projectResponse.data);

      const userResponse = await api.get("/users");
      setUsers(userResponse.data);
    } catch (error) {
      console.error("Error loading dashboard data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LinearGradient colors={["#ff9966", "#ff5e62"]} style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* Project Actions */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("CreateProject")}
        >
          <Text style={styles.buttonText}>+ Create Project</Text>
        </TouchableOpacity>
      </View>

      {/* Projects List */}
      <Text style={styles.sectionTitle}>📂 Projects</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.description}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate("EditProject", { projectId: item.id })
                }
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => console.log("Delete project", item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Users List */}
      <Text style={styles.sectionTitle}>👤 Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.cardTitle}>{item.username}</Text>
            <Text style={styles.cardSubtitle}>Role: {item.role}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 25,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#ddd",
    marginVertical: 5,
  },
  cardActions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userCard: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
});
