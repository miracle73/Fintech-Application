import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Copy from '../assets/images/copy.png'
import { MaterialIcons } from '@expo/vector-icons'

const TokenGenerate = () => {
    const navigation = useNavigation();
    const handleSubmit = () => {
        console.log("dream")
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 50
        }}>
            <StatusBar style="auto" barStyle="dark-content" hidden={false} />
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" color="#000" size={20} />
                </TouchableOpacity>

                <Text style={styles.secondText}>Home</Text>
            </View>
            <Text style={styles.firstText}>Token Generated</Text>
            <View style={styles.coverContainer}>
                <View style={styles.container}>
                    <Text style={styles.thirdText}>113</Text>
                    <Text style={styles.thirdText}>599</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.fifthText}>Regenerate Token</Text>
            </TouchableOpacity>
            <View style={[styles.coverContainer, {marginTop: 30}]}>
                <View style={styles.secondContainer}>
                    <Image source={Copy} />
                    <Text style={styles.fourthText}>Copy to clipboard</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    firstText: {
        fontSize: 20,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#000000",
        marginTop: 10
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    secondText: {
        fontSize: 12,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#7B7B7B"
    },
    thirdText: {
        fontSize: 14,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#000000",
    },
    fourthText: {
        fontSize: 12,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#030F0D",
        flex: 1
    },
    secondContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6EAE9',
        paddingVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    container: {
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: "#E8FCD9",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        gap: 4,
        marginTop: 30
    },
    coverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B2BEBB',
        borderRadius: 14,
        marginTop: 300,
        marginHorizontal: 30
    },
    fourthText: {
        fontSize: 8,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#000000",
        marginLeft: 5
    },
    fifthText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#B6F485'
    },
})


export default TokenGenerate