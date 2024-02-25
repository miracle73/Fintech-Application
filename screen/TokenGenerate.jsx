import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Copy from '../assets/images/copy.png'
import { MaterialIcons } from '@expo/vector-icons'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useAuth } from '../utils/AuthContext';

const TokenGenerate = () => {
    const [isTimerComplete, setIsTimerComplete] = useState(false);
    const navigation = useNavigation();
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(10);
    const [isloading, setIsLoading] = useState(false)
    const [notification, setNotification] = useState({ type: '', message: '', visible: false, });
    const { user, setUser } = useAuth();


    const getToken = async () => {
        const url = 'https://beelsfinance.com/api/api/v1/user/token/regenerate';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.Authtoken}`
        };

        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {

                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred while regenerating the token.');
            }


            const responseData = await response.json();
            console.log(responseData);
            const details = responseData.data;
            const userDetails = {
                ...user,
                ...details
            };

            setUser({
                ...user,
                ...details
            }
            )
            await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));

            setIsPlaying(true)




        } catch (error) {

            setNotification({ type: 'error', message: error.message, visible: true });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

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
                    <Text style={styles.thirdText}>{user.token}</Text>

                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 70 }}>
                {isPlaying ? <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={duration}
                    colors={['#A4DC78', '#F7B801', '#FF7650', '#A30000']}
                    colorsTime={[duration * 0.75, duration * 0.5, duration * 0.25, 0]}
                    onComplete={() => {
                        setIsPlaying(false);
                        setIsTimerComplete(true);
                    }}

                >

                    {({ remainingTime }) => (
                        <Text style={styles.timerText}>{Math.ceil(remainingTime)}</Text>
                    )}
                </CountdownCircleTimer> :
                    <View style={{
                        height: 180, width: 180, borderRadius: 90, borderStyle: "solid",
                        borderWidth: 15,
                        borderColor: '#E6EAE9', backgroundColor: "white"
                    }}>
                    </View>}

            </View>



            <TouchableOpacity style={[styles.button, isTimerComplete && { backgroundColor: '#082C25' }]} onPress={getToken}>
                <Text style={styles.fifthText}>Regenerate Token</Text>
            </TouchableOpacity>
        

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
        marginTop: 100,
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
    timerContainer: {
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 5,
        flexDirection: 'row',
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    timerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B2BEBB'
    },
})


export default TokenGenerate