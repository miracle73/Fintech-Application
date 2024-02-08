import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'
import FAQ from '../assets/images/FAQ.png'
import Call from '../assets/images/call.png'
import { useNavigation } from '@react-navigation/native';

const HelpAndSupport = () => {
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 50
        }}>
            <StatusBar style="auto" barStyle="dark-content" hidden={false} />
            <Text style={[styles.thirdText, { marginBottom: 30 }]}>Help & Support</Text>
            <View style={styles.secondContainer}>
                <View style={styles.thirdContainer}>
                    <Image source={FAQ} />
                    <Text style={styles.secondText}>Frequently asked questions</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
                    <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                </TouchableOpacity>

            </View>
            <View style={styles.secondContainer}>
                <View style={styles.thirdContainer}>
                    <Image source={Call} />
                    <Text style={styles.secondText}>Call support</Text>
                </View>

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
    firstText: {
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#010101"
    },

    thirdText: {
        fontSize: 20,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#010101",
        marginBottom: 10

    },
    fourthText: {
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#010101",

    },
})

export default HelpAndSupport