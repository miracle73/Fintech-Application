import { View, Text, Modal, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ModalImage from '../../assets/images/setuppassword.png'

const { width, height } = Dimensions.get('window')
const SetUpPassword = ({modal, setModal}) => {
    const navigation = useNavigation();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);
            }}
        >
            <View style={styles.modalContainer}>
                <Image source={ModalImage} />
                <Text style={styles.firstText}>Set-up your password</Text>
                <Text style={styles.secondText}>Secure your e-token by setting-up a password.</Text>
                <TouchableOpacity style={[styles.button]} onPress={() => {navigation.navigate('Password'); setModal(false)}}>
                    <Text style={styles.thirdText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 0.5,
        backgroundColor: '#fff',
        elevation: 10,
        position: 'absolute',
        height: height * 0.35,
        bottom: height * 0.3,
        borderRadius: 30,
        paddingHorizontal: 20,
        marginHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstText: {
        fontSize: 24,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#082C25",
        textAlign: 'center',
        marginTop: 20
    },
    secondText: {
        fontSize: 12,
        fontWeight: "300",
        fontStyle: "normal",
        color: "#082C25",
        textAlign: 'center',
        marginTop: 10
    },
    button: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#082C25',
        borderRadius: 14,
        marginTop: 30,
        width: '100%'
    },
    thirdText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#B6F485'
    },

})

export default SetUpPassword