import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { UrlTile } from "react-native-maps";

const PoliceHomeScreen = () => {
  const [selectedReport, setSelectedReport] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Crime & Emergency Alerts Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Crime & Emergency Alerts</Text>
        <Text style={styles.dashboardText}>Curfew imposed in high-risk areas.</Text>
        <Text style={styles.dashboardText}>Robbery reported in Sector 7.</Text>
      </View>

      {/* Live Map Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>High-Risk Area Map</Text>
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
              urlTemplate="https://police-alerts.example.com/{z}/{x}/{y}.png"
              zIndex={3}
            />
          </MapView>
        </View>
      </View>

      {/* Police Operations Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Police Operations</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Patrol</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Emergency Response</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Traffic Control</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Report an Incident */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Report an Incident</Text>
        <Picker
          selectedValue={selectedReport}
          onValueChange={(itemValue) => setSelectedReport(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Theft" value="theft" />
          <Picker.Item label="Assault" value="assault" />
          <Picker.Item label="Missing Person" value="missing_person" />
          <Picker.Item label="Traffic Violation" value="traffic_violation" />
        </Picker>
      </View>

      {/* Important Police Notices Section */}
      <View style={styles.dashboardSection}>
        <Text style={styles.heading}>Important Notices</Text>
        <Text style={styles.dashboardText}>Increased security in public areas.</Text>
        <Text style={styles.dashboardText}>New traffic rules enforcement from next week.</Text>
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
    backgroundColor: "#ffd699",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  dashboardText: {
    fontSize: 16,
    marginTop: 5,
    color: "#d35400",
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
    backgroundColor: "#c0392b",
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

export default PoliceHomeScreen;
