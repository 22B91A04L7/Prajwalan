import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [activeScreen, setActiveScreen] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disaster Management App</Text>

      {/* Interface Selection */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setActiveScreen('government')}>
          <Text style={styles.buttonText}>Government</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setActiveScreen('citizen')}>
          <Text style={styles.buttonText}>Citizen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setActiveScreen('donate')}>
          <Text style={styles.buttonText}>Donate</Text>
        </TouchableOpacity>
      </View>

      {/* Government Interface */}
      {activeScreen === 'government' && (
        <View style={styles.interface}>
          <Text style={styles.screenTitle}>Government Interface</Text>
          <TouchableOpacity style={styles.authButton}>
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton}>
            <Text style={styles.authButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Citizen Interface */}
      {activeScreen === 'citizen' && (
        <View style={styles.interface}>
          <Text style={styles.screenTitle}>Citizen Interface</Text>
          <TouchableOpacity style={styles.authButton}>
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.authButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Donate Interface */}
      {activeScreen === 'donate' && (
        <View style={styles.interface}>
          <Text style={styles.screenTitle}>Donate to Support</Text>
          <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL('https://pmnrf.gov.in//')}>
            <Text style={styles.linkText}>PM Relief Fund</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL('https://apcmrf.ap.gov.in/')}>
            <Text style={styles.linkText}>CM Relief Fund (AP)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL('https://www.directrelief.org/')}>
            <Text style={styles.linkText}>9908206627@ybl</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', marginBottom: 20 },
  button: { backgroundColor: '#007BFF', padding: 10, margin: 5, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16 },
  interface: { width: '100%', padding: 20, alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, elevation: 5 },
  screenTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  authButton: { backgroundColor: '#28a745', padding: 10, marginVertical: 5, borderRadius: 5, width: '60%', alignItems: 'center' },
  authButtonText: { color: '#fff', fontSize: 16 },
  linkButton: { backgroundColor: '#ffc107', padding: 10, marginVertical: 5, borderRadius: 5, width: '80%', alignItems: 'center' },
  linkText: { color: '#000', fontSize: 16 },
});
