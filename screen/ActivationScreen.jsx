import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EToken from '../components/modal/EToken';
import Notification from '../components/Notification';
import HidePassword from '../assets/images/hidePassword.png'
import { useNavigation } from '@react-navigation/native';
import SuccessModal from '../components/modal/SuccessModal';
import LoggedInModal from '../components/modal/LoggedInModal';
import { postRequest } from '../utils/ApiService';




const ActivationScreen = ({ route }) => {
    const [modal, setModal] = useState(false)
    const [serialNumber, setSerialNumber] = useState("");
    const [activationCode, setActivationCode] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [transactionPin, setTransactionPin] = useState("");
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false)
    const [secondShowPassword, setSecondShowPassword] = useState(false)
    const [thirdShowPassword, setThirdShowPassword] = useState(false)
    const [fourthShowPassword, setFourthShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [notification, setNotification] = useState({ type: '', message: '', visible: false, });
    const allFieldsFilled = serialNumber !== "" && activationCode !== "" && customerId !== "" && transactionPin !== "";


    const handleSubmit = async (serialNumber, activationCode, customerId, transactionPin) => {
        const url = 'https://beelsfinance.com/api/api/v1/token/activate';
        const data = {
            serial_num: 'P0DQ6JFUVYBTFJEQ',
            activation_code: '725449',
            customer_id: 'Nob6IK1P',
            pin: '1234'
        };
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                // Handle server errors
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred while activating the token.');
            }

            // Handle successful response
            const responseData = await response.json();

            // const { data } = responseData
            console.log(responseData);
            const userDetails = responseData.data;
  
            await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));

            navigation.navigate('Loading', {
                next: "Activation",
                info: "Activating your Beels e-Token"
            })
        

        } catch (error) {
       
            setNotification({ type: 'error', message: error.message, visible: true });
            console.error(error);
        } finally {
            setIsLoading(false);

            setSerialNumber('');
            setActivationCode('');
            setCustomerId('');
            setTransactionPin('');
        }
    };


    const { modall } = route.params || {};

    useEffect(() => {
        if (modall === 'Etoken') {
      
            setModal(true)
        }
    }, [modall]);


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 50
        }}>
            <StatusBar style="auto" barStyle="dark-content" hidden={false} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" color="#000" size={20} />
                    </TouchableOpacity>

                    <Text style={styles.secondText}>Welcome</Text>
                </View>
                <Text style={styles.firstText}>Activation Method</Text>
                <Text style={styles.thirdText}>Kindly fill in the required information in order to activate your token
                </Text>
                <View style={[styles.container]} >
                    <TextInput
                        style={styles.fourthText}
                        placeholder="Serial number"
                        value={serialNumber}
                        onChangeText={setSerialNumber}
                        placeholderTextColor="#7B7B7B"
                        keyboardType='numeric'
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
                        <Image source={HidePassword} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.container, { marginTop: 15 }]}>
                    <TextInput
                        style={styles.fourthText}
                        placeholder="Activation code"
                        value={activationCode}
                        onChangeText={setActivationCode}
                        placeholderTextColor="#7B7B7B"
                        keyboardType='numeric'
                        secureTextEntry={!secondShowPassword}

                    />
                    <TouchableOpacity onPress={() => setSecondShowPassword(!secondShowPassword)} style={{ padding: 10 }}>
                        <Image source={HidePassword} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.container, { marginTop: 15 }]}>
                    <TextInput
                        style={styles.fourthText}
                        placeholder="Customer ID"
                        value={customerId}
                        onChangeText={setCustomerId}
                        placeholderTextColor="#7B7B7B"
                        secureTextEntry={!thirdShowPassword}

                    />
                    <TouchableOpacity onPress={() => setThirdShowPassword(!thirdShowPassword)} style={{ padding: 10 }}>
                        <Image source={HidePassword} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.container, { marginTop: 15 }]}>
                    <TextInput
                        style={styles.fourthText}
                        placeholder="Transaction pin"
                        value={transactionPin}
                        onChangeText={setTransactionPin}
                        placeholderTextColor="#7B7B7B"
                        keyboardType='numeric'
                        secureTextEntry={!fourthShowPassword}
                    />
                    <TouchableOpacity onPress={() => setFourthShowPassword(!fourthShowPassword)} style={{ padding: 10 }}>
                        <Image source={HidePassword} />
                    </TouchableOpacity>
                </View>
                {isLoading ? (
                    <View style={{ marginTop: 250 }}>
                        <View style={{ marginBottom: 10 }}>
                            <ActivityIndicator size="large" color="#3ab54a" />
                            <Text style={{ textAlign: 'center' }}>Loading...</Text>
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity style={[styles.button, allFieldsFilled && { backgroundColor: '#082C25' }]} onPress={() => handleSubmit(serialNumber, activationCode, customerId, transactionPin)}>
                        <Text style={styles.fifthText}>Continue</Text>
                    </TouchableOpacity>
                )}

            </KeyboardAwareScrollView>
            {modal && <EToken modal={modal} setModal={setModal} />}

            <Notification type={notification.type} message={notification.message} visible={notification.visible} onClose={() => setNotification({ ...notification, visible: false })} />
        </View>
    )
}
const styles = StyleSheet.create({
    firstText: {
        fontSize: 20,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#010101",

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
        fontSize: 12,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#000",
        marginTop: 15,
        marginBottom: 30
    },
    fourthText: {
        fontSize: 12,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#030F0D",
        flex: 1
    },
    container: {
        paddingVertical: 20,
        borderRadius: 12,
        backgroundColor: "#F8FEF3",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    button: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B2BEBB',
        borderRadius: 14,
        marginTop: 250
    },
    fifthText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#B6F485'
    },
})

export default ActivationScreen