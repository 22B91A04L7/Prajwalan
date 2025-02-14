import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';

const QRScannerScreen = () => {
    const navigation = useNavigation();

    const handleScanSuccess = (e) => {
        console.log('Scanned Data:', e.data);
        alert(`Scanned: ${e.data}`);
    };

    return (
        <View style={styles.container}>
            <QRCodeScanner
                onRead={handleScanSuccess}
                showMarker
                reactivate={true}
                reactivateTimeout={2000}
            />

            <View style={styles.buttonsContainer}>
                <View style={styles.section}>
                    <Text style={styles.header}>Government</Text>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('GovernmentLogin')}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('GovernmentRegister')}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.header}>User</Text>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('UserLogin')}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('UserRegister')}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.header}>Donation</Text>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('Donation')}
                    >
                        <Text style={styles.buttonText}>Go to Donation</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
    buttonsContainer: { marginTop: 20, alignItems: 'center' },
    section: { marginBottom: 20, alignItems: 'center' },
    header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginBottom: 5 },
    buttonText: { color: 'white', fontSize: 16 }
});

export default QRScannerScreen;
