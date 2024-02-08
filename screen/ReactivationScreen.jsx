import { View, Text, StyleSheet,  TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EToken from '../components/modal/EToken';
import { useNavigation } from '@react-navigation/native';


const ReactivationScreen = () => {
    const [modal, setModal] = useState(false)
    const [serialNumber, setSerialNumber] = useState("");
    const [activationCode, setActivationCode] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [transactionPin, setTransactionPin] = useState("");
    const navigation = useNavigation();
    const allFieldsFilled = serialNumber !== "" && activationCode !== "" && customerId !== "" && transactionPin !== "";

    const handleSubmit = () => {
        console.log(`Serial Number: ${serialNumber}, Activation Code: ${activationCode}, Customer ID: ${customerId}, Transaction Pin: ${transactionPin}`);
        setActivationCode("")
        setCustomerId('')
        setSerialNumber('')
        setTransactionPin('')
        setModal(true)
    }
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
            <Text style={styles.firstText}>Re-activation Method</Text>
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
                />
            </View>
            <View style={[styles.container, { marginTop: 15 }]}>
                <TextInput
                    style={styles.fourthText}
                    placeholder="Activation code"
                    value={activationCode}
                    onChangeText={setActivationCode}
                    placeholderTextColor="#7B7B7B"
                    keyboardType='numeric'

                />
            </View>
            <View style={[styles.container, { marginTop: 15 }]}>
                <TextInput
                    style={styles.fourthText}
                    placeholder="Customer ID"
                    value={customerId}
                    onChangeText={setCustomerId}
                    placeholderTextColor="#7B7B7B"

                />
            </View>
            <View style={[styles.container, { marginTop: 15 }]}>
                <TextInput
                    style={styles.fourthText}
                    placeholder="Transaction pin"
                    value={transactionPin}
                    onChangeText={setTransactionPin}
                    placeholderTextColor="#7B7B7B"
                    keyboardType='numeric'

                />
            </View>
            <TouchableOpacity style={[styles.button, allFieldsFilled && { backgroundColor: '#082C25' }]} onPress={handleSubmit}>
                <Text style={styles.fifthText}>Continue</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
        {modal && <EToken modal={modal} setModal={setModal}/>}
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
        justifyContent: 'flex-start',
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

export default ReactivationScreen