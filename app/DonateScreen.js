import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function DonateScreen() {
  const donationLinks = [
    { name: 'Red Cross', url: 'https://www.redcross.org/', icon: 'heartbeat' },
    { name: 'UNICEF', url: 'https://www.unicef.org/', icon: 'child' },
    { name: 'Direct Relief', url: 'https://www.directrelief.org/', icon: 'medkit' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Donate to Help</Text>
      <Text style={styles.subtitle}>Your contributions can make a difference in disaster relief and humanitarian aid.</Text>
      
      {donationLinks.map((donation, index) => (
        <TouchableOpacity
          key={index}
          style={styles.donateButton}
          onPress={() => Linking.openURL(donation.url)}
        >
          <FontAwesome name={donation.icon} size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Donate to {donation.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});