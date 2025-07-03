import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import all screens
import HomeScreen from './app/HomeScreen';
import GovernmentAgency from './app/GovernmentAgencyScreen';
import NDRFScreen from './app/NDRFScreen';
import PoliceScreen from './app/PoliceScreen';
import MedicalScreen from './app/MedicalScreen';
import DonateScreen from './app/DonateScreen';
import EmergencyContacts from './app/EmergencyContacts';
import HelplineNumber from './app/HelplineNumber';
import NDRFreg from './app/NDRFreg';
import Policereg from './app/Policereg';
import CycloneTracker from './app/CycloneTracker';
import ShareLocation from './app/ShareLocation';
import PoliceStations from './app/PoliceStations';

import chatBot from './app/chatBot';
import safeHouse from './app/safeHouse';
import NdrfDashboard from './app/NdrfDashboard';
// import NDRFhomescreen from './app/NDRFhomescreen';
import firebaseConfig from './app/firebaseConfig';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }} // Hides headers for all screens
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GovernmentAgency" component={GovernmentAgency} />
        <Stack.Screen name="NDRFScreen" component={NDRFScreen} />
        <Stack.Screen name="Police" component={PoliceScreen} />
        <Stack.Screen name="Medical" component={MedicalScreen} />
        <Stack.Screen name="Donate" component={DonateScreen} />
        <Stack.Screen name="NDRFReg" component={NDRFreg} />
        <Stack.Screen name="PoliceReg" component={Policereg} />
        <Stack.Screen name="Emergency" component={EmergencyContacts} />
        <Stack.Screen name="HelplineNumber" component={HelplineNumber} />
        <Stack.Screen name="CycloneTracker" component={CycloneTracker} />
        <Stack.Screen name="ShareLocation" component={ShareLocation} />
        <Stack.Screen name="PoliceStations" component={PoliceStations} />
        <Stack.Screen name="NdrfDashboard" component={NdrfDashboard} />
        <Stack.Screen name="NDRFhomescreen" component={NDRFhomescreen} />
        <Stack.Screen name="firebaseConfig" component={firebaseConfig} />
        

        <Stack.Screen name="chatBot" component={chatBot} />
        <Stack.Screen name="safeHouse" component={safeHouse} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
