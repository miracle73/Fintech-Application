import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import HidePassword from '../assets/images/hidePassword.png'
import PasswordImage from '../assets/images/pass.png'
import EmailImage from '../assets/images/email.png'
import Logo from '../assets/images/logo.png'
import { useNavigation } from '@react-navigation/native'
import { postRequest } from '../utils/ApiService';
import PasswordBackground from '../assets/images/passwordBackground.png'

const EnterPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isloading, setIsLoading] = useState(false)
    const navigation = useNavigation();
    const [notification, setNotification] = useState({ type: '', message: '', visible: false, });

    const allFieldsFilled = password !== "" && email !== "";
    // const handleSubmit = () => {
    //     console.log(`Email: ${email}, Password: ${password}`);
    //     setPassword('')
    //     setEmail("")
    // }

    const handleSubmit = async (email, password) => {
        const url = 'https://beelsfinance.com/api/api/v1/token/login';
        const data = {
            type: 'password',
            customer: 'Nob6IK1P',
            password: "Fantastic"
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  3321|ty0fWbuthmq92uj6bzNBNiVmAiSopekCby6AGj95'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                // Handle server errors
                const errorData = await response.text(); // Use text() instead of json() for error handling
                // const errorData = await response.json();
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
            setIsLoading(false);
            navigation.navigate('Loading', {
                next: "Home",
                info: "Setting up password"
            })
            // Reset the form fields after the request
            setPassword('');
            setEmail('');
        }
    };



    // const handleLogin = async (email, password) => {
    //     setIsLoading(true);
    // try {            
    //     const response = await postRequest('/token/login', { type: 'password', customer: email, password: password });
    //     if (response.error) {
    //         setIsLoading(false);
    //         setNotification({type: 'error', message: response.errorMessage, visible: true,});
    //         return;
    //     } else {
    //       console.log(response.data);
    //         setIsLoading(false);
    //     }            
    // } catch (error) {
    //     setIsLoading(false);
    //     setNotification({type: 'error', message: error.message, visible: true,});
    //     console.log(error);            
    // }
    //     navigation.navigate('Loading', {
    //         next: "Home",
    //         info: "Setting up password"
    //     })
    //     setPassword('')
    //     setEmail("")
    //   }

    return (
        <ImageBackground style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 130
        }} source={PasswordBackground}>
            <StatusBar style="auto" barStyle="dark-content" hidden={false} />
            <Image source={Logo} style={{ width: 100, height: 150 }} />
            <Text style={styles.firstText}>Welcome Roberts</Text>
            <Text style={styles.secondText}>Log In</Text>
            <View style={[styles.container]} >
                <Image source={EmailImage} />
                <TextInput
                    style={styles.fourthText}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#B2BEBB"


                />


            </View>
            <View style={[styles.container]} >
                <Image source={PasswordImage} />
                <TextInput
                    style={styles.fourthText}
                    placeholder="Confirm password"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#B2BEBB"
                    keyboardType='numeric'
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
                    <Image source={HidePassword} />
                </TouchableOpacity>

            </View>
            <TouchableOpacity style={[styles.button, allFieldsFilled && { backgroundColor: '#082C25' }]} onPress={() => handleSubmit( email, password )}>
                <Text style={[styles.sixthText, allFieldsFilled && { color: '#B6F485' }]}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.thirdText}>Use biometrics</Text>
            <Text style={styles.thirdText}>Forgot password?</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    secondContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    thirdContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    firstText: {
        fontSize: 28,
        fontWeight: "800",
        fontStyle: "normal",
        color: "#030F0D",
        marginBottom: 30
    },

    secondText: {
        fontSize: 24,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#090A0A",
        marginBottom: 30
    },
    thirdText: {
        fontWeight: '400',
        fontSize: 13,
        fontStyle: "normal",
        color: '#FF7650',
        marginTop: 20,
        textAlign: 'center'
    },
    coverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        marginBottom: 20
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
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        gap: 8,
        marginBottom: 20
    },
    button: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DADFDE',
        borderRadius: 14,
        marginTop: 50
    },
    fifthText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#B6F485'
    },

    sixthText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#082C25'
    },
})

export default EnterPassword