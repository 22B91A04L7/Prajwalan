import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, onValue } from 'firebase/database';
import { db } from './firebaseConfig';
import NdrfDashboard from './NdrfDashboard';  // Import the NdrfDashboard component

const NDRFHome = () => {
  const [selectedRequest, setSelectedRequest] = useState(''); 
  const [userLocations, setUserLocations] = useState([]);

  // Fetch user locations from Firebase
  useEffect(() => {
    const usersRef = ref(db, 'userLocations');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const locations = [];
      snapshot.forEach((child) => {
        const location = child.val();
        if (location.latitude && location.longitude) {
          locations.push({ id: child.key, ...location });
        }
      });
      setUserLocations(locations);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Alerts Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Alerts</Text>
        <Text style={styles.dashboardText}>High flood alert in Mumbai!</Text>
        <Text style={styles.dashboardText}>Rescue operations ongoing in Delhi.</Text>
      </View>

      {/* Maps Section with Live User Locations */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Maps (Live User Locations)</Text>
        <View style={styles.mapContainer}>
          {/* Integrate NdrfDashboard here */}
          <NdrfDashboard />
        </View>
      </View>

      {/* Operations Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Operations to do</Text>
        <View style={styles.buttonRow}>
          {['Rescue', 'Medical', 'Food'].map((op) => (
            <TouchableOpacity key={op} style={styles.button}>
              <Text style={styles.buttonText}>{op}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Missing Report Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Missing Report</Text>
        <View style={styles.buttonRow}>
          {['Search', 'Found'].map((op) => (
            <TouchableOpacity key={op} style={styles.button}>
              <Text style={styles.buttonText}>{op}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Report/Request Dropdown */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Report/Request</Text>
        <Picker
          selectedValue={selectedRequest}
          onValueChange={setSelectedRequest}
          style={styles.picker}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Police" value="police" />
          <Picker.Item label="Medical Team" value="medical_team" />
          <Picker.Item label="Volunteer" value="volunteer" />
          <Picker.Item label="Safe House Staff" value="safe_house_staff" />
        </Picker>
      </View>

      {/* Notices Sections */}
      {['Public', 'Volunteer', 'Medical', 'Police'].map((type) => (
        <View key={type} style={styles.dashboardSection}>
          <Text style={styles.heading}>{type} Notice</Text>
          <Text style={styles.dashboardText}>{`Important information for ${type.toLowerCase()} personnel.`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  dashboardSection: { backgroundColor: '#ffcccc', padding: 20, marginBottom: 10, borderRadius: 10 },
  dashboardText: { fontSize: 16, marginTop: 5, color: '#d9534f' },
  mapContainer: { height: 300, borderRadius: 10, overflow: 'hidden', marginTop: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: { flex: 1, backgroundColor: '#007bff', padding: 15, marginHorizontal: 5, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  picker: { marginTop: 10, height: 50 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});

export default NDRFHome;
