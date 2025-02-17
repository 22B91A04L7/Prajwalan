import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width, height } = Dimensions.get('window');
const itemWidth = width * 0.45; // Adjusted for 2 columns
const itemHeight = height * 0.18; // Adjusted for 5 rows

const MainPage = () => {
  const navigation = useNavigation(); // Get navigation object

  return (
    <LinearGradient colors={['#6a80b7', '#5a73a8', '#3a508a']} style={styles.container}>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CycloneTracker')}>
          <FontAwesome5 name="wind" size={40} color="#fff" />
          <Text style={styles.text}>Cyclone Tracker</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EmergencyContacts')}>
          <FontAwesome5 name="phone" size={40} color="#fff" />
          <Text style={styles.text}>Emergency Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ShareLocation')}>
          <FontAwesome5 name="exclamation-triangle" size={40} color="#fff" />
          <Text style={styles.text}>SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PoliceStations')}>
          <FontAwesome5 name="shield-alt" size={40} color="#fff" />
          <Text style={styles.text}>Police Stations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Alerts')}>
          <FontAwesome5 name="bell" size={40} color="#fff" />
          <Text style={styles.text}>Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Rescue')}>
          <FontAwesome5 name="ambulance" size={40} color="#fff" />
          <Text style={styles.text}>Rescue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Missing')}>
          <FontAwesome5 name="user-times" size={40} color="#fff" />
          <Text style={styles.text}>Missing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Medical')}>
          <FontAwesome5 name="clinic-medical" size={40} color="#fff" />
          <Text style={styles.text}>Medical</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Food')}>
          <FontAwesome5 name="utensils" size={40} color="#fff" />
          <Text style={styles.text}>Food</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Notice')}>
          <FontAwesome5 name="bullhorn" size={40} color="#fff" />
          <Text style={styles.text}>Notice</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  item: {
    width: itemWidth,
    height: itemHeight,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default MainPage;