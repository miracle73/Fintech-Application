import { View, Switch, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PasswordImage from '../assets/images/pass.png'
import Fingerprint from '../assets/images/fingerprint.png'
import FaceID from '../assets/images/FaceId.png'
import HidePassword from '../assets/images/hidePassword.png'
import { postRequest } from '../utils/ApiService';
import { useNavigation } from '@react-navigation/native';
import Notification from '../components/Notification';
import { useAuth } from '../utils/AuthContext';

const Password = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const [secondIsEnabled, secondSetIsEnabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [secondShowPassword, setSecondShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [notification, setNotification] = useState({ type: '', message: '', visible: false, });
    const { user, setUser } = useAuth();


  
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const navigation = useNavigation();

    const allFieldsFilled = password !== "" && confirmPassword !== "";

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };
    const secondToggleSwitch = () => {
        secondSetIsEnabled(previousState => !previousState);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

  
    const isPasswordMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    };
    const handleSubmit = async (password, confirmPassword) => {
        const url = 'https://beelsfinance.com/api/api/v1/user/token/password/change';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 3443|IGX3xJjvqT7Bej62irZQwWf2Mq3ZSmx2cuZYsyGS'
        };
        const data = {
            password: "Fantastic",
            cpassword: "Fantastic",
            trx_id: user.trx_id,
            pin: user.pin
        };
        setIsLoading(true);
        setPasswordError("");
        setConfirmPasswordError("");

      
        if (!validatePassword(password)) {
            setPasswordError("Password must be at least  8 characters long, include a number, and a special character.");
            setConfirmPassword("")
            setPassword("")
            setIsLoading(false); 
            return;
        }

     
        if (!isPasswordMatch(password, confirmPassword)) {
            setConfirmPasswordError("Passwords do not match.");
            setConfirmPassword("")
            setPassword("")
            setIsLoading(false); 
            return;
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
               
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred while changing the password.');
            }

         
            const responseData = await response.json();
            console.log(responseData);
            navigation.navigate('Loading', {
                next: "EnterPassword",
                info: "Logging in..."
            })
            setUser({
                ...user,
                password: password, 
                confirmPassword: confirmPassword 
            });

        } catch (error) {
          
            setNotification({ type: 'error', message: error.message, visible: true });
            console.error(error);
        } finally {

            setIsLoading(false);
            setPassword('');
            setConfirmPassword('');
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
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" color="#000" size={20} />
                    </TouchableOpacity>

                    <Text style={styles.secondText}>Settings</Text>
                </View>
                <Text style={styles.firstText}>Set-up Password</Text>
                <View style={[styles.container]} >
                    <Image source={PasswordImage} />
                    <TextInput
                        style={styles.fourthText}
                        placeholder="Password"
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
                <View style={[styles.container]} >
                    <Image source={PasswordImage} />
                    <TextInput
                        style={styles.fourthText}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholderTextColor="#B2BEBB"
                        secureTextEntry={!secondShowPassword}
                    />
                    <TouchableOpacity onPress={() => setSecondShowPassword(!secondShowPassword)} style={{ padding: 10 }}>
                        <Image source={HidePassword} />
                    </TouchableOpacity>

                </View>
                {confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={styles.coverContainer}>
                        <View style={styles.secondInnerContainer}></View>
                        <Text style={styles.thirdText}>10-digits serial number</Text>
                    </View>
                    <View style={styles.coverContainer}>
                        <View style={styles.secondInnerContainer}></View>
                        <Text style={styles.thirdText}>Activation code</Text>
                    </View>
                    <View style={styles.coverContainer}>
                        <View style={styles.secondInnerContainer}></View>
                        <Text style={styles.thirdText}>Customer ID</Text>
                    </View>
                    <View style={styles.coverContainer}>
                        <View style={styles.secondInnerContainer}></View>
                        <Text style={styles.thirdText}>Transaction pin</Text>
                    </View>
                </View>
                <View style={[styles.secondContainer, {
                    marginTop: 100
                }]}>
                    <View style={styles.thirdContainer}>
                        <Image source={Fingerprint} />
                        <Text style={[styles.seventhText, {
                            marginLeft: 1
                        }]}>Enable fingerprint and face ID lock</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#B2BEBB", true: "#082C25" }}
                        thumbColor={secondIsEnabled ? "#FFFFFF" : "#082C25"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={secondToggleSwitch}
                        value={secondIsEnabled}
                    />
                </View>
                <View style={[styles.secondContainer, {
                    marginBottom: 40
                }]}>
                    <View style={styles.thirdContainer}>
                        <Image source={FaceID} />
                        <Text style={[styles.seventhText, {
                            marginLeft: 5
                        }]}>Enable face ID lock</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#B2BEBB", true: "#082C25" }}
                        thumbColor={isEnabled ? "#FFFFFF" : "#082C25"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                {isLoading ? (
                    <View style={{ marginTop: 250 }}>
                        <View style={{ marginBottom: 10 }}>
                            <ActivityIndicator size="large" color="#3ab54a" />
                            <Text style={{ textAlign: 'center' }}>Loading...</Text>
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity style={[styles.button, allFieldsFilled && { backgroundColor: '#082C25' }]} onPress={() => handleSubmit(password, confirmPassword)}>
                        <Text style={styles.sixthText}>Set-up password</Text>
                    </TouchableOpacity>
                )}


            </KeyboardAwareScrollView>
         
                <Notification type={notification.type} message={notification.message} visible={notification.visible} onClose={() => setNotification({ ...notification, visible: false })} />
           
        </View>
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
        fontSize: 20,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#010101",
        marginBottom: 30
    },
    seventhText: {
        fontSize: 14,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#010101",
    },
    secondInnerContainer: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#B6F485'
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
        fontWeight: '400',
        fontSize: 15,
        fontStyle: "normal",
        color: '#010101'
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
    button: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B2BEBB',
        borderRadius: 14,

    },
    sixthText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#B6F485'
    },
})

export default Password