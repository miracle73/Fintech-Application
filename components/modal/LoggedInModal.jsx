import { View, Text, Modal, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ModalImage from '../../assets/images/modal.png'

const { width, height } = Dimensions.get('window')
const LoggedInModal = ({ setModal, modal }) => {
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
                <Text style={styles.firstText}>Logged In</Text>
                <Text style={styles.secondText}>Welcome back Roberts, Remember the Beels e-Token provides  a level of security to your transactions</Text>

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


})

export default LoggedInModal