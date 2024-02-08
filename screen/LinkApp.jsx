import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';

const LinkApp = () => {
    const [serialNumber, setSerialNumber] = useState("")
    const handleSubmit = () => {
        console.log("Submitted", serialNumber)
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 30
        }}>
            <StatusBar style="auto" barStyle="dark-content" hidden={false} />
            <Text style={styles.firstText}>LinkApp</Text>
            <TextInput
                style={styles.secondText}
                placeholder="placeholder"
                value={serialNumber}
                onChangeText={setSerialNumber}
                placeholderTextColor="#7B7B7B"
                keyboardType='numeric'
            />
            <Text style={styles.thirdText}>Your serial number is the 10-digits displayed on the home-screen of your Beels e-token app.</Text>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.fifthText}>Link e-token</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    firstText: {
        fontSize: 14,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#030F0D",
        marginBottom: 10
    },
    secondText: {
        fontSize: 12,
        fontWeight: "400",
        fontStyle: "normal",
        backgroundColor: "#FAF5EB",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12
    },
    thirdText: {
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#030F0D",
        marginTop: 10
    },
    button: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3AB54A',
        borderRadius: 14,
        marginTop: 500
    },
    fifthText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#FFFFFF'
    },
})

export default LinkApp