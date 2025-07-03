import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Function to calculate distance between two coordinates (Haversine Formula)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371000; // Radius of Earth in meters

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
};

const SafeHouseMap = () => {
  const [location, setLocation] = useState(null);
  const [safeHouses, setSafeHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Predefined Safe House Locations
  const predefinedSafeHouses = [
    { id: 1, name: 'Safe House 1', latitude: 16.5818, longitude: 81.3767 },
    { id: 2, name: 'Safe House 2', latitude: 16.5311, longitude: 81.4982 },
    { id: 3, name: 'Safe House 3', latitude: 16.5448, longitude: 81.5214 },
    { id: 4, name: 'Safe House 4', latitude: 16.5456271, longitude: 81.503405 },
  ];

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access to view safe houses nearby.');
        setLoading(false);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      // Filter Safe Houses within 5000m
      const nearbySafeHouses = predefinedSafeHouses.filter((house) => {
        const distance = getDistance(
          userLocation.coords.latitude,
          userLocation.coords.longitude,
          house.latitude,
          house.longitude
        );
        return distance <= 50000; // 5000 meters (5km)
      });

      setSafeHouses(nearbySafeHouses);
      setLoading(false);
    };

    getUserLocation();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* User's Current Location */}
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Your Location"
          pinColor="blue"
        />

        {/* Nearby Safe House Markers */}
        {safeHouses.map((house) => (
          <Marker
            key={house.id}
            coordinate={{ latitude: house.latitude, longitude: house.longitude }}
            title={house.name}
            description="Safe House Nearby"
            pinColor="green"
          />
        ))}
      </MapView>
    </View>
  );   
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SafeHouseMap;