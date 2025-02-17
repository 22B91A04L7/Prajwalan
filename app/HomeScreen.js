import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#E3FDFD', '#FFE6FA']} style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <MaterialIcons name="security" size={60} color="#333" />
        <Text style={styles.title}>Welcome to Disaster Management App</Text>
      </View>

      {/* Buttons with Icons */}
      <Animatable.View animation="fadeInUp" delay={500} style={styles.buttonContainer}>
        {[
          { title: 'Government Agency', icon: 'account-balance', screen: 'GovernmentAgencyScreen' },
          { title: 'Public', icon: 'people', screen: 'UserDashboard' },
          { title: 'Donators', icon: 'volunteer-activism', screen: 'DonateScreen' },
          { title: 'Emergency Numbers', icon: 'phone', screen: 'HelplineNumber' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialIcons name={item.icon} size={28} color="#004D40" style={styles.icon} />
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#A6E3E9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#71C9CE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    color: '#004D40',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
