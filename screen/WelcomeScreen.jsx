import React, { useState, useEffect } from 'react'
import BackgroundImage from '../assets/images/welcome-screen.png'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MethodModal from '../components/modal/MethodModal';
import FAQModal from '../components/modal/FAQModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const WelcomeScreen = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [modal, setModal] = useState(false)
    const [secondModal, setSecondModal] = useState(false)
    const [signedUp, setSignedUp] = useState(false)

    const handleCheckBoxToggle = () => {
        setIsChecked(!isChecked);
    };

    const navigation = useNavigation();

    useEffect(() => {
        const checkIfUserHasSignedUp = async () => {
            const hasSignedUp = await AsyncStorage.getItem('HAS_SIGNED_UP');
            if (hasSignedUp === 'true') {
                setSignedUp(true)
            }
        };

        checkIfUserHasSignedUp();
    }, []);

    // ... rest of the component


    return (
        <ImageBackground source={BackgroundImage} style={styles.container}>
            <View >
                <View style={{ height: StatusBar.currentHeight, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <StatusBar style="light" barStyle="dark-content" hidden={false} />
                </View>

                <Text style={[styles.firstText, { marginBottom: 30 }]}>Welcome</Text>
                <Text style={[styles.secondText, { marginBottom: 15 }]}>To activate your Beels token, enter the following information sent to your registered email address.</Text>
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={styles.coverContainer}>
                        <View style={styles.innerContainer}></View>
                        <Text style={styles.thirdText}>10-digits serial number</Text>
                    </View>
                    <View style={styles.coverContainer}>
                        <View style={styles.innerContainer}></View>
                        <Text style={styles.thirdText}>Activation code</Text>
                    </View>
                    <View style={styles.coverContainer}>
                        <View style={styles.innerContainer}></View>
                        <Text style={styles.thirdText}>Customer ID</Text>
                    </View>
                    <View style={styles.coverContainer}>
                        <View style={styles.innerContainer}></View>
                        <Text style={styles.thirdText}>Transaction pin</Text>
                    </View>
                </View>
                <Text style={[styles.secondText, { marginTop: 20, marginBottom: 10 }]}>To reactivate your Beels token</Text>
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={styles.coverContainer}>
                        <View style={styles.innerContainer}></View>
                        <Text style={styles.thirdText}>You will receive a call from our team</Text>
                    </View>
                </View>
                <View style={[styles.coverContainer, {
                    gap: 4,
                    marginBottom: 30,
                    marginTop: 70
                }]}>


                    <TouchableOpacity onPress={handleCheckBoxToggle} >
                        <View style={[styles.checkbox, isChecked ? { backgroundColor: '#3ab54a' } : null]}>
                            {isChecked && <Text style={{ color: '#fff' }}>✔</Text>}
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.fourthText}>By clicking this box, you confirm and agree to our </Text>
                        <Text style={styles.fifthText}>Terms and Conditions and Privacy Policy</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {signedUp ? navigation.navigate('EnterPassword', { info: 'Login' }) : setModal(true)}}>
                    <Text style={styles.sixthText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSecondModal(true)}>
                    <Text style={styles.seventhText}>Contact customer support.</Text>
                </TouchableOpacity>

                <Text style={[styles.seventhText, { marginTop: 10 }]}>Help</Text>
            </View>
            {modal && <MethodModal modal={modal} setModal={setModal} setIsChecked={setIsChecked} />}
            {secondModal && <FAQModal modal={secondModal} setModal={setSecondModal} />}
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingTop: 80
    },
    firstText: {
        fontWeight: "600",
        fontSize: 25,
        fontStyle: "normal",
        color: '#F8FEF3'
    },
    secondText: {
        fontWeight: '500',
        fontSize: 16,
        fontStyle: "normal",
        color: '#E6EAE9'
    },
    fourthText: {
        fontWeight: '700',
        fontSize: 13,
        fontStyle: "normal",
        color: '#E6EAE9'
    },
    fifthText: {
        fontWeight: '300',
        fontSize: 13,
        fontStyle: "normal",
        color: '#92C36A'
    },
    sixthText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#B6F485'
    },
    seventhText: {
        fontWeight: '600',
        fontSize: 12,
        fontStyle: "normal",
        color: '#92C36A',
        marginTop: 20,
        textAlign: 'center'
    },
    thirdText: {
        fontWeight: '400',
        fontSize: 15,
        fontStyle: "normal",
        color: '#E6EAE9'
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
        backgroundColor: '#B6F485'
    },
    secondContainer: {
        width: 35,
        height: 35,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#E6EAE9'
    },
    button: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#082C25',
        borderRadius: 14
    },
    checkbox: {
        width: 35,
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: '#fff',
    },
});

export default WelcomeScreen