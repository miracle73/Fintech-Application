import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window')

const FAQModal = ({ modal, setModal }) => {
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
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={() => setModal(false)}>
                        <MaterialIcons name="arrow-back-ios" color="#000" size={20} />
                    </TouchableOpacity>

                    <Text style={styles.secondText}>Help & Support</Text>
                </View>
                <Text style={styles.firstText}>Frequently Asked Questions</Text>
                <Text style={[styles.thirdText, { marginVertical: 10 }]}>Getting Started:</Text>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>What is an e-token and how does it work?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>What are the security features of the app?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.thirdText, { marginVertical: 10 }]}>Operations within the app:</Text>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>How do I generate a token for a transaction?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>What if I forget my PIN or password?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>Where can I find my transaction history?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.thirdText, { marginVertical: 10 }]}>Troubleshooting:</Text>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>I'm having trouble generating a token. What should I do?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>My app is not working properly. How can I fix it?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>What if I lose my phone or have it stolen?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.thirdText, { marginVertical: 10 }]}>Additional Information:</Text>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>Where can I find more information about the e-token service?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>What are the fees associated with using the e-token app?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondText}>How do I close my e-token account?</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: "100%",
        backgroundColor: '#fff',
        elevation: 10,
        position: 'absolute',
        height: height * 0.82,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 20
      
    },
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
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#010101"
    },
    secondContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
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

})

export default FAQModal