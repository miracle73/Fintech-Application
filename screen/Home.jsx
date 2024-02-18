import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import Copy from '../assets/images/copy.png'
import SetUpPassword from '../components/modal/SetUpPassword'
import LoggedInModal from '../components/modal/LoggedInModal'
import { useNavigation } from '@react-navigation/native'

const Home = ({route}) => {
    const [modal, setModal] = useState(false)
    const [secondModal, setSecondModal] = useState(false)
    const navigation = useNavigation();
    useEffect(() => {
        const timer = setTimeout(() => {
            setModal(true);
        },  1000); //  10000 milliseconds =  10 seconds

        return () => clearTimeout(timer); // Clear the timeout if the component is unmounted
    }, []);

    const { modall } = route.params || {};

    useEffect(() => {
      if (modall === 'LoggedInModal') {
        // Logic to open the Etoken modal
        // This could be a call to a function that triggers the modal
        // For example, if you have a function `openEtokenModal`:
        setSecondModal(true)
      }
    }, [modall]);

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 50
        }}>
            <StatusBar style="auto" barStyle="dark-content" hidden={false} />
            <Text style={styles.thirdText}>Home</Text>
            <Text style={styles.secondText}>Serial number</Text>
            <View style={[styles.container]} >
                <Text style={[styles.firstText]}>1234-5678-90</Text>
                <View style={styles.secondContainer}>
                    <Image source={Copy} />
                    <Text style={styles.fifthText}>Copy to clipboard</Text>
                </View>
            </View>
            <Text style={styles.secondText}>Kindly copy your serial number to your Beels app to link your e-token.</Text>
            <Text style={[styles.secondText, {
                color: '#010101',
                marginTop: 50
            }]}>Recent Transactions</Text>
            <View style={styles.line}></View>

            {modal && <SetUpPassword modal={modal} setModal={setModal}/>}
            {secondModal && <LoggedInModal modal={secondModal} setModal={setSecondModal}/>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#F8FEF3",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10
    },
    line: {
        borderColor: "#E8FCD9",
        borderWidth: 0.5,
        marginTop: 5
    },
    secondContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6EAE9',
        paddingVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    firstText: {
        fontSize: 12,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#030F0D"
    },
    secondText: {
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#030F0D",
        marginLeft: 10,
        marginTop: 10
    },
    thirdText: {
        fontSize: 20,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#010101",
        marginBottom: 30
    },
    fourthText: {
        fontSize: 15,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#030F0D",
        marginTop: 10
    },
    fifthText: {
        fontSize: 8,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#000000",
        marginLeft: 5
    },
})

export default Home