import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')
const MethodModal = ({ setModal, modal, setIsChecked }) => {
    const navigation = useNavigation();
    const [activeComponent, setActiveComponent] = useState(null);
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
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={() => setModal(false)}>
                    <MaterialIcons name="arrow-back-ios" color="#000" size={20} />
                    </TouchableOpacity>
                    
                    <Text style={styles.firstText}>Welcome</Text>
                </View>
                <Text style={styles.thirdText}>Method</Text>
                <TouchableOpacity style={[styles.container, activeComponent === 'activation' && { backgroundColor: '#082C25' }]} onPress={() => {setActiveComponent('activation'); navigation.navigate('Activation'); setModal(false); setIsChecked(false)}}>
                    <Text style={[styles.secondText, activeComponent === 'activation' && { color: '#B6F485' }]}>Activation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.container, activeComponent === 'reactivation' && { backgroundColor: '#082C25' }, { marginTop: 15 }]} onPress={() => {setActiveComponent('Reactivation'); navigation.navigate('Reactivation'); setModal(false); setIsChecked(false)}}>
                    <Text style={[styles.secondText, activeComponent === 'reactivation' && { color: '#B6F485' }]}>Reactivation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, activeComponent && { backgroundColor: '#082C25' }]}>
                    <Text style={styles.fourthText}>Continue</Text>
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
        width: '100%',
        height: height * 0.8,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,


    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    firstText: {
        fontSize: 12,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#7B7B7B"
    },
    secondText: {
        fontSize: 12,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#030F0D"
    },
    thirdText: {
        fontSize: 20,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#000000",
        marginTop: 20,
        marginBottom: 30
    },
    fourthText: {
        fontWeight: '600',
        fontSize: 19,
        fontStyle: "normal",
        color: '#B6F485'
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
        marginTop: 200
    },
})
export default MethodModal