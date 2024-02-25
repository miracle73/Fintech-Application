import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import HidePassword from '../assets/images/hidePassword.png'
import PasswordImage from '../assets/images/pass.png'
import EmailImage from '../assets/images/email.png'
import Logo from '../assets/images/logo.png'
import { useNavigation } from '@react-navigation/native'
import { postRequest } from '../utils/ApiService';
import PasswordBackground from '../assets/images/passwordBackground.png'
import Notification from '../components/Notification';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SuccessModal from '../components/modal/SuccessModal';
import { useAuth } from '../utils/AuthContext';
import FetchApi from '../utils/ApiService'

const EnterPassword = ({ route }) => {
    const [email, setEmail] = useState("");
    const [modal, setModal] = useState(false)
    const { user, setUser } = useAuth();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();
    const [notification, setNotification] = useState({ type: '', message: '', visible: false, });

    const allFieldsFilled = password !== "" && email !== "";

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };


    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    console.log(user.password)
    console.log(user)
    const isPasswordMatch = (password) => {

        return password === user.password;
    };
    const { modall } = route.params || {};
    const { info } = route.params || {};
    useEffect(() => {
        if (modall === 'Success') {
            setModal(true);

        }
    }, [modall]);






    const handleSubmit = async (email, password) => {
        const url = 'https://beelsfinance.com/api/api/v1/token/login';
        const data = {
            type: 'Password',
            customer: user.customer_id,
            password: password
        };
        setIsLoading(true);
        setEmailError("");
        setPasswordError("");


        if (!validateEmail(email)) {
            setEmailError("Invalid email format.");
            setEmail("")
            setPassword("")
            setIsLoading(false);
            return;
        }


        if (!validatePassword(password)) {
            setPasswordError("Password must be at least  8 characters long, include a number, and a special character.");
            setEmail("")
            setPassword("")
            setIsLoading(false);
            return;
        }

        if (!isPasswordMatch(password)) {
            setPasswordError("Password does not match user's password.");
            setEmail("")
            setPassword("")
            setIsLoading(false);
            return;
        }
        // try {
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             // 'Authorization': 'Bearer 3443|IGX3xJjvqT7Bej62irZQwWf2Mq3ZSmx2cuZYsyGS'
        //         },
        //     body: JSON.stringify(data)
        // });

        // if (!response.ok) {

        //     const errorData = await response.text();

        //     throw new Error(errorData.message || 'An error occurred while activating the token.');
        // }


        // const responseData = await response.json();
        // console.log(responseData);
        // navigation.navigate('Loading', {
        //     next: "Home",
        //     info: "Setting up password"
        //     })
        //     setUser({
        //         ...user,
        //         Authtoken: responseData.data.token,
        //         ...responseData.data.user
        //     });
        //     await AsyncStorage.setItem('HAS_SIGNED_UP', 'true');

        // } catch (error) {

        //     setNotification({ type: 'error', message: error.message, visible: true });

        // } finally {
        //     setIsLoading(false);


        //     setPassword('');
        //     setEmail('');
        // }

        try {
            // Use FetchApi for the request
            const response = await FetchApi(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                   
                },
                body: JSON.stringify(data)
            });


            if (response.error) {
                throw new Error(response.errorMessage || 'An error occurred while activating the token.');
            }
            // console.log(response)
          


            if (info === 'Login') {
                navigation.navigate('TokenGenerate')
            } else {
                const userDetails = {
                    ...user,
                    Authtoken: response.data.token,
                    password: password,
                    confirmPassword: password
                 
                };
                await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
                await AsyncStorage.setItem('HAS_SIGNED_UP', 'true');
                navigation.navigate('Loading', {
                    next: "Home",
                    info: "Logging in..."
                })

            }

        } catch (error) {

            setNotification({ type: 'error', message: error.message, visible: true });
            console.error(error);
        } finally {
            setIsLoading(false);
            setPassword('');
            setEmail('');

        }
    };




    return (
        <ImageBackground style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 130
        }} source={PasswordBackground}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <StatusBar style="auto" barStyle="dark-content" hidden={false} />
                <Image source={Logo} style={{ width: 100, height: 150 }} />
                <Text style={styles.firstText}>Welcome</Text>
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
                {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                <View style={[styles.container]} >
                    <Image source={PasswordImage} />
                    <TextInput
                        style={styles.fourthText}
                        placeholder="Confirm password"
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#B2BEBB"
                        secureTextEntry={!showPassword}
                    />

                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
                        <Image source={HidePassword} />
                    </TouchableOpacity>

                </View>
                {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                {isLoading ? (
                    <View style={{ marginTop: 50 }}>
                        <View style={{ marginBottom: 10 }}>
                            <ActivityIndicator size="large" color="#3ab54a" />
                            <Text style={{ textAlign: 'center' }}>Loading...</Text>
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity style={[styles.button, allFieldsFilled && { backgroundColor: '#082C25' }]} onPress={() => handleSubmit(email, password)}>
                        <Text style={[styles.sixthText, allFieldsFilled && { color: '#B6F485' }]}>Login</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.thirdText}>Use biometrics</Text>
                <Text style={styles.thirdText}>Forgot password?</Text>


                <Notification type={notification.type} message={notification.message} visible={notification.visible} onClose={() => setNotification({ ...notification, visible: false })} />

            </KeyboardAwareScrollView>
            {modal && <SuccessModal modal={modal} setModal={setModal} />}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 12,
    },
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
        marginBottom: 10
    },

    secondText: {
        fontSize: 24,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#090A0A",
        marginBottom: 10
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