import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import WebView from 'react-native-webview';

const OPENWEATHER_API_KEY = 'cfbdf87aeef642f48b3a2c6a125156f0'; // Your OpenWeatherMap API Key

const CycloneTracker = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dangerLevel, setDangerLevel] = useState('');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to track cyclones.');
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 5,
      longitudeDelta: 5
    });

    fetchWeatherData(userLocation.coords.latitude, userLocation.coords.longitude);
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      checkCycloneDangerLevel(data.wind.speed);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const checkCycloneDangerLevel = (windSpeed) => {
    let level = 'Low';
    let message = 'The cyclone danger level is LOW. No immediate risk.';

    if (windSpeed > 20) {
      level = 'High';
      message = '⚠️ HIGH CYCLONE WARNING! Stay indoors and follow safety measures!';
    } else if (windSpeed > 10) {
      level = 'Moderate';
      message = '⚠️ MODERATE CYCLONE ALERT! Be prepared for strong winds.';
    }

    setDangerLevel(level);
    Alert.alert('Cyclone Alert', message);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
          >
            {location && <Marker coordinate={location} title="Your Location" />}

            {weatherData && (
              <Circle
                center={{ latitude: location.latitude, longitude: location.longitude }}
                radius={weatherData.wind.speed * 10000}
                strokeColor="rgba(255,0,0,0.8)"
                fillColor="rgba(255,0,0,0.3)"
              />
            )}
          </MapView>

          {/* Windy.com Wind Animation Layer */}
          <View style={styles.overlayContainer}>
            <WebView
              source={{
                uri: `https://embed.windy.com/embed2.html?lat=${location?.latitude}&lon=${location?.longitude}&zoom=5&level=surface&overlay=wind&menu=true&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=true&detailLat=${location?.latitude}&detailLon=${location?.longitude}&metricWind=m/s&metricTemp=°C&radarRange=-1`
              }}
              style={styles.webView}
            />
          </View>

          <View style={styles.weatherContainer}>
            <Text style={styles.header}>Live Cyclone Tracker</Text>
            {weatherData ? (
              <>
                <Text style={styles.text}>📍 Location: {weatherData.name}</Text>
                <Text style={styles.text}>🌡 Temperature: {weatherData.main.temp}°C</Text>
                <Text style={styles.text}>💨 Wind Speed: {weatherData.wind.speed} m/s</Text>
                <Text style={styles.text}>🌊 Pressure: {weatherData.main.pressure} hPa</Text>
                <Text style={styles.text}>💧 Humidity: {weatherData.main.humidity}%</Text>
                <Text style={[styles.text, styles.dangerLevel]}>
                  🚨 Cyclone Danger Level: {dangerLevel}
                </Text>
              </>
            ) : (
              <Text>No weather data available</Text>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '60%'
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    height: '60%',
    opacity: 0.7
  },
  webView: {
    flex: 1
  },
  weatherContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    elevation: 5
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    marginBottom: 5
  }, 
  dangerLevel: {
    fontWeight: 'bold',
    color: 'red'
  }
});

export default CycloneTracker;