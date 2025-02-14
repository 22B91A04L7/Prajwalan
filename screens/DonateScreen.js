import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';

export default function DonateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate to Help</Text>

      {/* Donation Links */}
      <TouchableOpacity onPress={() => Linking.openURL('https://www.redcross.org/')}>
        <Text style={styles.link}>Donate to Red Cross</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('https://www.unicef.org/')}>
        <Text style={styles.link}>Donate to UNICEF</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('https://www.directrelief.org/')}>
        <Text style={styles.link}>Donate to Direct Relief</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: 'blue',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
});
