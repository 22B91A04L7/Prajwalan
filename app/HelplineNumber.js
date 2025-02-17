import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';

const HelplineNumbers = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState('');

  const TOMTOM_API_KEY = 'Ef53CTgxRVmqpfickZ0r8CiKzpjuzTqU';

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      fetchLocationDetails(latitude, longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Error getting location');
      setLoading(false);
    }
  };

  const fetchLocationDetails = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${TOMTOM_API_KEY}`);
      const address = response.data.addresses[0]?.address;
      const fetchedCity = address?.municipality || address?.countrySubdivision;
      console.log('User city:', fetchedCity);

      setCity(fetchedCity || '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching location details:', error);
      setErrorMsg('Error fetching location details');
      setLoading(false);
    }
  };

  const helplines = [
    { name: 'Police', number: '100' },
    { name: 'Fire', number: '101' },
    { name: 'Ambulance', number: '102' },
    { name: 'National emergency number', number: '112' },
    { name: 'AIDS helpline', number: '1097' },
    { name: 'Disaster Management (N.D.M.A)', number: '1078' },
    { name: 'Railway', number: '139' },
    { name: 'Kisan Call Center', number: '1551' },
    { name: 'LPG Leak helpline', number: '1906' },
    { name: 'Cyber Crime helpline', number: '15620' },
    { name: 'Tourist helpline', number: '1363 or 1800111363' },
    { name: 'Kiran Mental health helpline', number: '1800599019' },
    { name: 'Children emergency helpline', number: '1098' },
    { name: 'Senior Citizen helpline', number: '14567' },
  ];

  const handleCallHelpline = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* Back Button at Top Left */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Helpline Numbers</Text>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {city ? <Text style={styles.city}>City: {city}</Text> : null}
      
      <ScrollView horizontal={true}>
        <ScrollView vertical={true}>
          {helplines.length > 0 ? (
            helplines.map((helpline, index) => (
              <View key={index} style={styles.helpline}>
                <Text>{helpline.name}: {helpline.number}</Text>
                <Button title="Call" onPress={() => handleCallHelpline(helpline.number)} />
              </View>
            ))
          ) : (
            <Text>No helplines found</Text>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40, 
  },
  city: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  helpline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default HelplineNumbers;