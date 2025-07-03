import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const PoliceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [departmentId, setDepartmentId] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (route.params?.formData) {
      setFormData(route.params.formData);
    }
  }, [route.params]);

  const handleLogin = async () => {
    if (!departmentId || !userId || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://192.168.161.117:5000/police/login", {
        departmentId,
        userId,
        password,
      });

      if (response.data.success) {
        alert("Login Successful!");


        navigation.navigate("NDRFhomescreen"); // Navigate to Police dashboard on success
      } else {
        // navigation.navigate("Policehomescreen");
        navigation.navigate("NDRFhomescreen");
        // setErrorMessage("Invalid credentials. Please try again.");

      }
    } catch (error) {
      // navigation.navigate("Policehomescreen");
      navigation.navigate("NDRFhomescreen");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.label}>DEPARTMENT LICENSE ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter department ID"
          value={departmentId}
          onChangeText={setDepartmentId}
        />

        <Text style={styles.label}>USERNAME ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username ID"
          value={userId}
          onChangeText={setUserId}
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

      <TouchableOpacity style={styles.registrationButton} onPress={() => navigation.navigate("PoliceReg")}> 
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
  loginButton: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  registrationButton: { marginTop: 20, padding: 10 },
  registrationText: { fontSize: 16, color: "#007BFF" },
});

export default PoliceScreen;
