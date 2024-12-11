import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useRouter } from "expo-router";
import * as Network from 'expo-network';

export default function RegisterAttendance() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanningEnabled, setScanningEnabled] = useState(true);
    const [scanResult, setScanResult] = useState(null);
    const [statusResult, setStatusResult] = useState();
    const [scanTime, setTime] = useState(null);
    const router = useRouter();
    const [ipAddress, setIpAddress] = useState('');

    useEffect(() => {
        const fetchIpAddress = async () => {
          try {
            const ip = await Network.getIpAddressAsync();
            setIpAddress(ip);
          } catch (error) {
            console.error('Error fetching IP address:', error);
          }
        };
    
        fetchIpAddress();
      }, []);

    if (!permission) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Please grant camera permission</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>Allow Camera Access</Text>
                </TouchableOpacity>
            </View>
        );
    }

    async function onBarcodeScanned(data) {
        if (!scanningEnabled) return;

        try {
            Vibration.vibrate();
            setScanningEnabled(false);
            
            const extractedData = data.data; // Assuming 'data' is the object passed to this function
            const currentTime = new Date().toLocaleTimeString();
            console.log(`IP Address: ${ipAddress}`);
            if (extractedData === "rob2024") {
                setScanResult(`Your attendance has been recorded.`);
                setTime(currentTime);
                setStatusResult(true);
            } else {
                setScanResult("Failed to validate the QR code. Please try again.");
                setStatusResult(false);
            }

        } catch (error) {
            Vibration.vibrate();
            setScanningEnabled(false);
            setScanResult("Failed to validate the QR code. Please try again.");
            setStatusResult(false);
        }
    }

    if (!scanningEnabled && scanResult && statusResult) {
        return (
            <View style={[styles.container, { backgroundColor: "white" }]}>
                <Text style={styles.resultText}>{scanResult}</Text>
                <Text style={styles.thankYouText}>Thank you!</Text>
                <View style={styles.checkMarkContainer}>
                    <Feather name="check" size={100} color="white" />    
                </View>
                <Text style={styles.resultTime}>{scanTime}</Text>
                <TouchableOpacity 
                    onPress={() => router.push("/(home)")} 
                    style={styles.homeButton}
                >
                    <View style={styles.homeIconContainer}>
                        <Icon name="home" size={70} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        );
    } else if (statusResult === false) {
        return (
            <View style={[styles.container, { backgroundColor: "white" }]}>
                <Text style={styles.resultText}>{scanResult}</Text>
                <Text style={styles.thankYouText}>Sorry!</Text>
                <View style={styles.checkMarkContainer}>
                    <Entypo name="cross" size={100} color="white" />    
                </View>
                <Text style={styles.resultTime}>{scanTime}</Text>
                <TouchableOpacity 
                    onPress={() => {
                        setScanningEnabled(true);
                        setScanResult(null);
                        setStatusResult(null);
                    }} 
                    style={styles.scanAgainButton}
                >
                    <Text style={styles.scanAgainButtonText}>Scan Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Register Attendance</Text>
            </View>
            <CameraView 
                style={{ flex: 1 }}
                facing="back"
                onBarcodeScanned={onBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            />
        </View>
    );
}

// Define your styles here
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#3399fe',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    resultText: {
        color: 'black',
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
    },
    thankYouText: {
        color: 'black',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    checkMarkContainer: {
        backgroundColor: '#3399fe', // Circle background color
        width: 110, // Width of the circle
        height: 110, // Height of the circle
        borderRadius: 55, // Half of width/height for a circle
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        marginBottom: 20, // Space below the circle
    },
    checkMark: {
        color: 'white',
        fontSize: 70, // Size of the check mark
    },
    resultTime: {
        color: 'black',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    homeIconContainer: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#3399fe',
        width: 90,
        height: 90,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanAgainIconContainer: {
        backgroundColor: '#3399fe', // Circle background color
        width: 110, // Width of the circle
        height: 110, // Height of the circle
        borderRadius: 55, // Half of width/height for a circle
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        marginBottom: 20, // Space below the circle
    },
    scanAgainButton: {
        backgroundColor: '#3399fe',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    scanAgainButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
});

