import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Linking, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Card, Button, TextInput, ActivityIndicator } from 'react-native-paper';

const TOMTOM_API_KEY = 'Ef53CTgxRVmqpfickZ0r8CiKzpjuzTqU';

const PoliceStations = () => {
  const [location, setLocation] = useState(null);
  const [policeStations, setPoliceStations] = useState([]);
  const [radius, setRadius] = useState('5000'); // Default radius in meters
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndPoliceStations = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {   
        Alert.alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      const userCoords = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      setLocation(userCoords);
      fetchPoliceStations(userLocation.coords.latitude, userLocation.coords.longitude);
    };

    fetchLocationAndPoliceStations();
  }, []);

  const fetchPoliceStations = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.tomtom.com/search/2/nearbySearch/.json?key=${TOMTOM_API_KEY}&lat=${latitude}&lon=${longitude}&radius=${radius}&categorySet=7322`
      );
      const data = await response.json();

      if (response.ok && data.results) {
        setPoliceStations(data.results);
      } else {
        Alert.alert('Error fetching police stations');
      }
    } catch (error) {
      Alert.alert('Failed to fetch police stations:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const openPoliceStationPage = (station) => {
    const query = encodeURIComponent(station.poi.name + ' ' + station.address.freeformAddress);
    Linking.openURL(`https://www.google.com/search?q=${query}`);
  };

  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('No phone number available.');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 10 }}>
      <View style={{ flex: 1 }}>
        {location ? (
          <MapView
            style={{ width: Dimensions.get('window').width, height: 300, borderRadius: 10 }}
            initialRegion={location}
            showsUserLocation={true}  // Live user location enabled
          >
            {/* Police station markers (Red color) */}
            {policeStations.map((station) => (
              <Marker
                key={station.id}
                coordinate={{
                  latitude: station.position.lat,
                  longitude: station.position.lon,
                }}
                title={station.poi.name}
                description={station.address.freeformAddress}
                pinColor="red" // Police stations in red color
              />
            ))}
          </MapView>
        ) : (
          <ActivityIndicator animating={true} color="#6200EE" size="large" />
        )}

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Nearby Police Stations</Text>

          {/* Radius Input */}
          <TextInput
            label="Enter radius in meters"
            mode="outlined"
            keyboardType="numeric"
            value={radius}
            onChangeText={(text) => setRadius(text)}
            style={{ marginBottom: 10 }}
          />
          <Button mode="contained" onPress={() => location && fetchPoliceStations(location.latitude, location.longitude)}>
            Search Police Stations
          </Button>

          {loading ? (
            <ActivityIndicator animating={true} color="#6200EE" size="large" style={{ marginTop: 20 }} />
          ) : policeStations.length > 0 ? (
            <FlatList
              data={policeStations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card style={{ marginVertical: 10, padding: 15, borderRadius: 10 }}>
                  <Card.Title title={item.poi.name} />
                  <Card.Content>
                    <Text>{item.address.freeformAddress}</Text>
                    {item.poi.phone ? (
                      <Text style={{ fontSize: 14, marginVertical: 5 }}>Phone: {item.poi.phone}</Text>
                    ) : (
                      <Text style={{ fontSize: 14, color: 'red' }}>No phone number available</Text>
                    )}
                  </Card.Content>
                  <Card.Actions>
                    <Button onPress={() => handleCall(item.poi.phone)}>Call</Button>
                    <Button onPress={() => openPoliceStationPage(item)}>More Info</Button>
                  </Card.Actions>
                </Card>
              )}
              scrollEnabled={false}
            />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No police stations found.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PoliceStations;