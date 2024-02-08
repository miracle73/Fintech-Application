import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'
import Password from '../assets/images/password.png'
import Auth from '../assets/images/auth.png'
import Fingerprint from '../assets/images/fingerprint.png'
import Logout from '../assets/images/logout.png'
import FaceID from '../assets/images/FaceId.png'
import { useNavigation } from '@react-navigation/native';


const Settings = () => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [secondIsEnabled, secondSetIsEnabled] = useState(false);



    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };
    const secondToggleSwitch = () => {
        secondSetIsEnabled(previousState => !previousState);
    };
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 50
        }}>
            <StatusBar style="auto" barStyle="dark-content" hidden={false} />
            <Text style={[styles.thirdText, { marginBottom: 30 }]}>Settings</Text>
            <Text style={[styles.firstText, { marginBottom: 30 }]}>Manage Login and Security</Text>
            <View style={styles.secondContainer}>
                <View style={styles.thirdContainer}>
                    <Image source={Password} />
                    <Text style={styles.secondText}>Change Password</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Password')}>
                    <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                </TouchableOpacity>

            </View>
            <View style={[styles.secondContainer, {
                marginBottom: 15
            }]}>
                <View style={styles.thirdContainer}>
                    <Image source={Auth} />
                    <Text style={styles.secondText}>Two-factor authentication</Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
            </View>
            <View style={[styles.secondContainer, {
                marginBottom: 5
            }]}>
                <View style={[styles.thirdContainer, { gap: 4 }]}>
                    <Image source={Fingerprint} />
                    <Text style={styles.secondText}>Enable fingerprint and face ID lock</Text>
                </View>
                <Switch
                    trackColor={{ false: "#B2BEBB", true: "#082C25" }}
                    thumbColor={isEnabled ? "#FFFFFF" : "#082C25"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={[styles.secondContainer, {
                marginBottom: 5
            }]}>
                <View style={styles.thirdContainer}>
                    <Image source={FaceID} />
                    <Text style={styles.secondText}>Enable face ID lock</Text>
                </View>
                <Switch
                    trackColor={{ false: "#B2BEBB", true: "#082C25" }}
                    thumbColor={secondIsEnabled ? "#FFFFFF" : "#082C25"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={secondToggleSwitch}
                    value={secondIsEnabled}
                />
            </View>
            <Text style={[styles.firstText, { marginBottom: 30, marginTop: 30 }]}>Token Management</Text>
            <View style={styles.secondContainer}>
                <View style={styles.thirdContainer}>
                    <Image source={Password} />
                    <Text style={styles.secondText}>Link account</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Link-App')}>
                <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                </TouchableOpacity>
                
            </View>
            <View style={[styles.thirdContainer, {
                marginTop: 50,
                gap: 16
            }]}>
                <Image source={Logout} />
                <Text style={styles.fourthText}>Logout</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    secondContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    thirdContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    firstText: {
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#010101"
    },
    secondText: {
        fontSize: 14,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#010101",
    },
    thirdText: {
        fontSize: 20,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#010101",

    },
    fourthText: {
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#010101",

    },
})

export default Settings