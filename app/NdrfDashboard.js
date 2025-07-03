
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';  // Importing MapView and Marker


const NdrfDashboard = () => {
  const [users, setUsers] = useState([]);
  const [region, setRegion] = useState({
    latitude: 16.5, // Default latitude for Bhimavaram
    longitude: 81.52, // Default longitude for Bhimavaram
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  // Fetch user locations from Firebase (simulated here)
  useEffect(() => {
    fetchUsersFromFirebase();
  }, []);

  const fetchUsersFromFirebase = () => {
    // Firebase fetching logic here (replace with your Firebase data fetching code)
    setUsers([
      { id: 1, name: 'User 1', latitude: 16.501, longitude: 81.5205 }, // User 1 coordinates
      { id: 2, name: 'User 2', latitude: 16.505, longitude: 81.522 },  // User 2 coordinates
      { id: 3, name: 'User 3', latitude: 16.507, longitude: 81.523 },  // User 3 coordinates
      // Add more users as needed
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>NDARF Dashboard</Text>
      {/* MapView to show the locations */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}  // Set initial region to the starting point (Bhimavaram)
        showsUserLocation={true}  // Show user's location (if allowed)
        followUserLocation={true}  // Automatically center on user's location
      >
        {/* Loop through users to display markers */}
        {users.map(user => (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            title={user.name}
            description={`Location of ${user.name}`}
            pinColor={user.id === 1 ? 'blue' : 'red'}  // Blue for NDRF, Red for others
          />
        ))}
      </MapView>
    </View>
  );
};

export default NdrfDashboard;

