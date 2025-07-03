import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { UrlTile } from "react-native-maps";

const MedicalHomeScreen = () => {
  const [selectedRequest, setSelectedRequest] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Emergency Alerts Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Emergency Alerts</Text>
        <Text style={styles.dashboardText}>Urgent medical aid needed in Zone A.</Text>
        <Text style={styles.dashboardText}>Ambulance required in Sector 3.</Text>
      </View>

      {/* Live Map Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Live Medical Assistance Map</Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 28.6139, // Default location (Delhi)
              longitude: 77.209,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
          >
            <UrlTile
              urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              zIndex={1}
            />
            <UrlTile
              urlTemplate="https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png"
              zIndex={2}
            />
            <UrlTile
              urlTemplate="https://disastermapserver.example.com/{z}/{x}/{y}.png"
              zIndex={3}
            />
          </MapView>
        </View>
      </View>

      {/* Medical Operations Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Medical Operations</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>First Aid</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ambulance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Supplies</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Request Handling */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Medical Requests</Text>
        <Picker
          selectedValue={selectedRequest}
          onValueChange={(itemValue) => setSelectedRequest(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Blood Donation" value="blood_donation" />
          <Picker.Item label="Medical Volunteers" value="medical_volunteers" />
          <Picker.Item label="Emergency Drugs" value="emergency_drugs" />
          <Picker.Item label="Medical Evacuation" value="medical_evacuation" />
        </Picker>
      </View>

      {/* Important Notices Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Important Notices</Text>
        <Text style={styles.dashboardText}>Hospitals at max capacity in Zone B.</Text>
        <Text style={styles.dashboardText}>Additional first aid teams required.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  dashboardSection: {
    backgroundColor: "#cce5ff",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  dashboardText: {
    fontSize: 16,
    marginTop: 5,
    color: "#0056b3",
  },
  mapContainer: {
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  picker: {
    marginTop: 10,
    height: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default MedicalHomeScreen;
