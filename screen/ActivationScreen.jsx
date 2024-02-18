import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EToken from '../components/modal/EToken';
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
    const [isloading, setIsLoading] = useState(false)
    const [notification, setNotification] = useState({ type: '', message: '', visible: false, });
    const allFieldsFilled = serialNumber !== "" && activationCode !== "" && customerId !== "" && transactionPin !== "";

    // const handleSubmit = () => {
    //     console.log(`Serial Number: ${serialNumber}, Activation Code: ${activationCode}, Customer ID: ${customerId}, Transaction Pin: ${transactionPin}`);
    //     setActivationCode("")
    //     setCustomerId('')
    //     setSerialNumber('')
    //     setTransactionPin('')

    // }
    const handleSubmit = async (serialNumber, activationCode, customerId, transactionPin) => {
        const url = 'https://beelsfinance.com/api/api/v1/token/activate';
        const data = {
            serial_num: 'P0DQ6JFUVYBTFJEQ',
            activation_code: '725449',
            customer_id: 'Nob6IK1P',
            pin: '1234'
        };

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
            console.log(responseData);
            // You can set state or navigate based on the response here
            // For example, if you have a success message:
            // setNotification({ type: 'success', message: 'Token activated successfully!', visible: true });

        } catch (error) {
            // Handle client and server errors
            setNotification({ type: 'error', message: error.message, visible: true });
            console.error(error);
        } finally {
            navigation.navigate('Loading', {
                next: "Activation",
                info: "Activating your Beels e-Token"
            })
            // Reset the form fields after the request
            setSerialNumber('');
            setActivationCode('');
            setCustomerId('');
            setTransactionPin('');
        }
    };



    // const handleActivation = async (serialNumber, activationCode, customerId, transactionPin) => {
    //     setIsLoading(true);
    //     try {
    //         const response = await postRequest('user/token/activate', { activation_code: '725449', customer_id: 'Nob6IK1P', pin: '1234', serial_num: 'P0DQ6JFUVYBTFJEQ' });
    //         if (response.error) {
    //             setIsLoading(false);
    //             setNotification({ type: 'error', message: response.errorMessage, visible: true, });
    //             return;
    //         } else {
    //             console.log(response.data);
    //             setIsLoading(false);
    //         }
    //     } catch (error) {
    //         setIsLoading(false);
    //         setNotification({ type: 'error', message: error.message, visible: true, });
    //         console.log(error);
    //         return;

    //     }
    //     navigation.navigate('Loading', {
    //         next: "Activation",
    //         info: "Activating your Beels e-Token"
    //     })
    //     setActivationCode("")
    //     setCustomerId('')
    //     setSerialNumber('')
    //     setTransactionPin('')
    //     // setModal(true)
    // }

    const { modall } = route.params || {};

    useEffect(() => {
        if (modall === 'Etoken') {
            // Logic to open the Etoken modal
            // This could be a call to a function that triggers the modal
            // For example, if you have a function `openEtokenModal`:
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
                <TouchableOpacity style={[styles.button, allFieldsFilled && { backgroundColor: '#082C25' }]} onPress={() => handleSubmit(serialNumber, activationCode, customerId, transactionPin)}>
                    <Text style={styles.fifthText}>Continue</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
            {modal && <EToken modal={modal} setModal={setModal} />}
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