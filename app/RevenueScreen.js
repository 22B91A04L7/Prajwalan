import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NDRFScreen = () => {
  const navigation = useNavigation();
  const [organizationId, setOrganizationId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Simulated database of registered users
  const registeredUsers = ["user1", "user2", "user3"];

  const handleLogin = () => {
    if (!registeredUsers.includes(username)) {
      setErrorMessage("This username is not registered.");
    } else {
      setErrorMessage("");
      alert("Login Successful!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Login Form */}
      <View style={styles.loginForm}>
        <Text style={styles.label}>ORGANIZATION LICENSE ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter organization ID"
          value={organizationId}
          onChangeText={setOrganizationId}
        />

        <Text style={styles.label}>USERNAME:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>PASSWORD:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Registration Button with Updated Style */}
      <TouchableOpacity 
        style={styles.registrationButton} 
        onPress={() => navigation.navigate("Revenuereg")}
      >
        <Text style={styles.registrationText}>New user? Register here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" },
  loginForm: { width: "80%" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { width: "100%", height: 40, borderColor: "gray", borderWidth: 1, borderRadius: 5, marginTop: 5, paddingLeft: 10, backgroundColor: "#fff" },
  errorText: { color: "red", marginTop: 5 },
  loginButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  registrationButton: { marginTop: 20, padding: 10 },
  registrationText: { fontSize: 16, color: "#007BFF" },
});

export default NDRFScreen;