import { View, Text, Modal, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ModalImage from '../../assets/images/modal.png'

const { width, height } = Dimensions.get('window')
const SuccessModal = ({ setModal, modal }) => {
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
        <Text style={styles.firstText}>Successful!!</Text>
        <Text style={styles.secondText}>Your Beels Token has been secured successfully..</Text>
        <TouchableOpacity style={[styles.button]} onPress={() => { navigation.navigate('EnterPassword'); setModal(false) }}>
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
    height: height * 0.40,
    bottom: height * 0.3,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginHorizontal: '20%',
    width: width * 0.6,
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

export default SuccessModal