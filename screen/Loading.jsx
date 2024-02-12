import { View, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Loading = () => {
    // Create a reference to the Animated value
    const translateX = useRef(new Animated.Value(0)).current;

    // Function to start the animation
    const startAnimation = () => {
        // Reset the animation value to the starting position
        translateX.setValue(-100);

        // Define the animation sequence
        Animated.sequence([
            Animated.timing(translateX, {
                toValue: 100, // End position
                duration: 2000, // Duration of the animation
                useNativeDriver: true, // Use native driver for better performance
            }),
            Animated.timing(translateX, {
                toValue: -100, // Return to the starting position
                duration: 2000, // Duration of the animation
                useNativeDriver: true, // Use native driver for better performance
            }),
        ]).start(event => {
            if (event.finished) {
                // Repeat the animation if it finished
                startAnimation();
            }
        });
    };

    // Start the animation when the component mounts
    useEffect(() => {
        startAnimation();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.loader,
                    {
                        transform: [{ translateX }], // Apply the animated value to the X axis
                    },
                ]}
            />
            <Text style={styles.text}>Setting up password...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    loader: {
        width: 15, // Width of the loader
        height: 15, // Height of the loader
        borderRadius: 8, // Make it round
        backgroundColor: '#082C25', // Color of the loader
        position: 'absolute', // Position it absolutely to move freely
    },
    text: {
        marginTop: 80,
        fontSize: 18,
    },
});

export default Loading