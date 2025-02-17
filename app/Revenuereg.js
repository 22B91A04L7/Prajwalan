import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const RegistrationScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [organizationLicenseId, setOrganizationLicenseId] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hodName, setHodName] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [numTeams, setNumTeams] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleNumTeamsChange = (value) => {
    setNumTeams(value.replace(/[^0-9]/g, ""));
  };

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    if (confirmPassword && confirmPassword !== pwd) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (pwd) => {
    setConfirmPassword(pwd);
    setPasswordError(password !== pwd ? "Passwords do not match" : "");
  };

  const validateUserId = (uid) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
    return regex.test(uid);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Revenue Registration</Text>

      <TextInput label="Organization License ID" value={organizationLicenseId} onChangeText={setOrganizationLicenseId} mode="outlined" style={styles.input} />
      <TextInput label="Organization Name" value={organizationName} onChangeText={setOrganizationName} mode="outlined" style={styles.input} />
      <TextInput label="HOD Name" value={hodName} onChangeText={setHodName} mode="outlined" style={styles.input} />
      <TextInput label="Age" value={age} onChangeText={setAge} keyboardType="numeric" mode="outlined" style={styles.input} />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Gender</Text>
        <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>

      <TextInput label="Work Location" value={workLocation} onChangeText={setWorkLocation} mode="outlined" style={styles.input} />
      <TextInput label="No. of Teams" value={numTeams} onChangeText={handleNumTeamsChange} keyboardType="numeric" maxLength={4} mode="outlined" style={styles.input} />

      <TextInput label="User ID (min 8 chars, 1 special char, 1 numerical)" value={userId} onChangeText={setUserId} mode="outlined" style={styles.input} />
      <TextInput label="Password (8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)" value={password} onChangeText={handlePasswordChange} secureTextEntry mode="outlined" style={styles.input} />
      <TextInput label="Confirm Password" value={confirmPassword} onChangeText={handleConfirmPasswordChange} secureTextEntry mode="outlined" style={styles.input} />

      {passwordError ? <HelperText type="error">{passwordError}</HelperText> : null}

      <Button mode="contained" onPress={() => {
          if (!validateUserId(userId)) {
            alert("User ID does not meet the requirements.");
            return;
          }
          if (!validatePassword(password)) {
            alert("Password does not meet the requirements.");
            return;
          }
          if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
          }
          alert("Registration Submitted");
          navigation.navigate("PoliceScreen"); // Navigate to PoliceScreen
        }}
        style={styles.button}
      >
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 32, backgroundColor: "#f5f5f5" },
    header: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#007bff" },
    input: { marginBottom: 15, backgroundColor: "white" },
    pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 15, backgroundColor: "white", paddingHorizontal: 10 },
    picker: { height: 50 },
    label: { fontSize: 16, color: "#333", marginBottom: 3 },
    button: { marginTop: 0, marginBottom: 53, padding: 6 },
  });

export default RegistrationScreen;
