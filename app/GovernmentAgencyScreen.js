import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity 
} from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const GovernmentAgencyScreen = () => {
  const navigation = useNavigation();

  const options = [
    { name: "NDRF", screen: "NDRFScreen" },
    { name: "Police", screen: "PoliceScreen" },
    { name: "Medical", screen: "MedicalScreen" },
    { name: "Metrological", screen: "MetrologicalScreen" },
    { name: "Revenue", screen: "RevenueScreen" },

  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {options.map((option, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => navigation.navigate(option.screen)} 
            style={styles.cardWrapper}
          >
            <Card style={styles.optionCard}>
              <Card.Content>
                <Text style={styles.optionText}>{option.name}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  cardWrapper: {
    width: "90%",
  },
  optionCard: {
    backgroundColor: "#ffffff",
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  optionText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
});

export default GovernmentAgencyScreen;