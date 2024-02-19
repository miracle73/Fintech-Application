import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Spinner from '../assets/images/spinner.gif'

const Loading = ({ route, navigation }) => {
    const { next, info } = route.params;

   
    useEffect(() => {
        const timer = setTimeout(() => {
            if (next === 'Activation') {
                navigation.navigate(next, { modall: 'Etoken' });
            } else if (next === 'Home') {
                navigation.navigate(next, { modall: 'LoggedInModal' });
            }
            else
                navigation.navigate(next, {modall: "Success"});


        }, 10000);

       
        return () => clearTimeout(timer);
    }, [navigation, next]);

    return (
        <View style={styles.container}>
            <Image source={Spinner} style={{ height: 100, width: 100 }} />
            <Text style={styles.text}>{info}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    text: {
        marginTop: 20,
        fontSize: 18,
    },
});

export default Loading;
