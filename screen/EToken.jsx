import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const EToken = () => {
    const handleSubmit = () => {
        console.log("Submitted")
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 20
        }}>
            <StatusBar style="auto" barStyle="dark-content" hidden={false} />
            <Text style={styles.firstText}>To activate your Beels e-token, </Text>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={styles.coverContainer}>
                    <View style={styles.innerContainer}></View>
                    <Text style={styles.secondText}>Download the Beels e-token app</Text>
                </View>
                <View style={styles.coverContainer}>
                    <View style={styles.innerContainer}></View>
                    <Text style={styles.secondText}>Enter the required information  for activation</Text>
                </View>
                <View style={styles.coverContainer}>
                    <View style={styles.innerContainer}></View>
                    <Text style={styles.secondText}>Your Customer ID is 123-456</Text>
                </View>
            
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.fifthText}>Download Beels E-Token</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    firstText: {
        fontSize: 16,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#010101",
        marginBottom: 10
    },
    secondText: {
        fontWeight: '400',
        fontSize: 12,
        fontStyle: "normal",
        color: '#000000'
    },
    coverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        marginBottom: 20
    },
    innerContainer: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CD9933'
    },
    button: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3AB54A',
        borderRadius: 14,
        marginTop: 480
    },
    fifthText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#FFFFFF'
    },
})
export default EToken