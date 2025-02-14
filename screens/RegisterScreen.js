import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function RegisterScreen() {
  const [citizenDetails, setCitizenDetails] = useState({ name: '', phone: '', location: null });

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required for registration.');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setCitizenDetails(prev => ({ ...prev, location }));
  };

  const handleRegister = () => {
    if (!citizenDetails.name || !citizenDetails.phone) {
      Alert.alert('Error', 'Please enter all details.');
      return;
    }
    requestLocation();
    Alert.alert('Success', 'Citizen Registered Successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register as Citizen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        onChangeText={text => setCitizenDetails(prev => ({ ...prev, name: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Phone"
        keyboardType="numeric"
        onChangeText={text => setCitizenDetails(prev => ({ ...prev, phone: text }))}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '80%', padding: 10, marginVertical: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  button: { backgroundColor: '#007BFF', padding: 10, marginTop: 10, borderRadius: 5, width: '60%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});
