import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { UrlTile } from "react-native-maps";

const NDRFHome = () => {
  const [selectedRequest, setSelectedRequest] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Alerts Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Alerts</Text>
        <Text style={styles.dashboardText}>High flood alert in Mumbai!</Text>
        <Text style={styles.dashboardText}>Rescue operations ongoing in Delhi.</Text>
      </View>

      {/* Maps Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Maps</Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 19.076, // Mumbai coordinates
              longitude: 72.8777,
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

      {/* Operations Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Operations to do</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Rescue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Medical</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Food</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Missing Report Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Missing Report</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Found</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Report/Request Dropdown */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Report/Request</Text>
        <Picker
          selectedValue={selectedRequest}
          onValueChange={(itemValue) => setSelectedRequest(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="police" value="police" />
          <Picker.Item label="Medical Team" value="medical_team" />
          <Picker.Item label="volunteer" value="volunteer" />
          <Picker.Item label="safe house staff" value="safe_house_staff" />
        </Picker>
      </View>

      {/* Notices Sections (Each like Alerts) */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Public Notice</Text>
        <Text style={styles.dashboardText}>Important information for all citizens.</Text>
      </View>

      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Volunteer Notice</Text>
        <Text style={styles.dashboardText}>Volunteers needed in affected areas.</Text>
      </View>

      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Medical Notice</Text>
        <Text style={styles.dashboardText}>Urgent medical aid required in Zone A.</Text>
      </View>

      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Police Notice</Text>
        <Text style={styles.dashboardText}>Curfew imposed in high-risk areas.</Text>
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
    backgroundColor: "#ffcccc",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  dashboardText: {
    fontSize: 16,
    marginTop: 5,
    color: "#d9534f",
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
    backgroundColor: "#007bff",
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

export default NDRFHome;
