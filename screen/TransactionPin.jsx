import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, } from 'react-native'
import React, { useState, useEffect } from 'react'
import cancel from '../assets/images/cancel.png'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')

const TransactionPin = () => {
    const navigation = useNavigation();
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const [chunkedNumbers, setChunkedNumbers] = useState([])
    const [firstInput, setFirstInput] = useState('');
    const [secondInput, setSecondInput] = useState('');
    const [thirdInput, setThirdInput] = useState('');
    const [fourthInput, setFourthInput] = useState('');
    const [activeInput, setActiveInput] = useState('first');
    const [isLoading, setIsLoading] = useState(false);
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    useEffect(() => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const shuffled = shuffleArray(numbers);
      setShuffledNumbers(shuffled);
  
      const chunked = shuffled.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 3)
  
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] 
        }
  
        resultArray[chunkIndex].push(item)
  
        return resultArray
      }, [])
  
      setChunkedNumbers(chunked)
  
    
    }, []);
  
  
    const removeDivs = () => {
      if (activeInput === null) {
        setFourthInput('')
        setActiveInput('fourth')
      }
      else if (activeInput === 'fourth') {
        setThirdInput('')
        setActiveInput('third')
      }
      else if (activeInput === 'third') {
        setSecondInput('')
        setActiveInput('second')
      }
      else if (activeInput === 'second') {
        setFirstInput('')
        setActiveInput('first')
      }
    }
    const handleDivs = (value) => {
      if (activeInput !== null) {
        if (activeInput === 'first') {
  
          setFirstInput(value);
          setActiveInput('second')
          // }
        } else if (activeInput === 'second') {
          setSecondInput(value);
          setActiveInput('third')
        } else if (activeInput === 'third') {
          setThirdInput(value);
          setActiveInput('fourth')
        } else if (activeInput === 'fourth') {
          setFourthInput(value);
          setActiveInput(null)
        }
  
        if (firstInput && secondInput && thirdInput && fourthInput) {
          setActiveInput(null);
        }
      }
    }
  
    
  
    const resetPin = () => {
      console.log(firstInput, secondInput, thirdInput, fourthInput)
      firstInput && setFirstInput('');
      secondInput && setSecondInput('');
      thirdInput && setThirdInput('');
      fourthInput && setFourthInput('');
      setActiveInput('first');
    }
  
    
  
  return (
    <View style={{
        paddingHorizontal: 20,
        
        backgroundColor: "#fff",
        flex: 1
      }}>
        
  
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 60
        }}>
  
  
          <View style={styles.innerContainer}>
            <View style={styles.viewStyle} >
              {firstInput && <View style={{
                width: 5,
                height: 5,
                borderRadius: 3,
                backgroundColor: "#010101"
              }}></View>}
            </View>
            <View style={styles.viewStyle}>
              {secondInput && <View style={{
                width: 5,
                height: 5,
                borderRadius: 3,
                backgroundColor: "#010101"
              }}></View>}
            </View>
            <View style={styles.viewStyle}>
              {thirdInput && <View style={{
                width: 5,
                height: 5,
                borderRadius: 3,
                backgroundColor: "#010101"
              }}></View>}
            </View>
            <View style={styles.viewStyle}>
              {fourthInput && <View style={{
                width: 5,
                height: 5,
                borderRadius: 3,
                backgroundColor: "#010101"
              }}></View>}
            </View>
  
          </View>
  
        </View>
        <TouchableOpacity onPress={resetPin} style={{
          borderRadius: 24,
          backgroundColor: activeInput === null ? "#3AB54A" : "#9CDAA4",
          marginTop: 50,
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
        }}
          disabled={activeInput !== null || isLoading}      
        >
          <Text style={{
            fontSize: 15,
            fontWeight: "500",
            fontStyle: "normal",
            textAlign: "center",
            color: "#FFFFFF",
           
          }}>Send Funds</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 50 }}>
          {chunkedNumbers.map((chunk, i) => (
            <View key={i} style={styles.keyboardViewStyle}>
              {chunk.map((number) => (
                <TouchableOpacity
                  style={styles.PressableViewStyle}
                  onPress={() => handleDivs(number.toString())}
                  key={number}
                >
                  <Text style={styles.innerTextStyle}>{number}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <View style={{
            paddingVertical: 5,
            width: width * 0.85,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginVertical: 10
          }}>
  
            <TouchableOpacity style={[styles.PressableViewStyle, { marginHorizontal: 10 }]} onPress={() => handleDivs('0')}>
              <Text style={styles.innerTextStyle}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.PressableViewStyle, { marginHorizontal: 10 }]} onPress={removeDivs}>
              <Image source={cancel} />
            </TouchableOpacity>
  
          </View>
        </View>
  
  
       
  
      </View>
  )
}

const styles = StyleSheet.create({
    headerStyle: {
      fontSize: 16,
      fontWeight: "600",
      fontStyle: "normal",
      lineHeight: 16,
      color: "#000000",
      textAlign: 'center',
  
    },
    textInputStyle: {
      borderBottomWidth: 2,
      borderBottomColor: '#9CDAA4',
      marginHorizontal: 5
    },
    PressableViewStyle: {
      width: 93,
      height: 40,
      borderRadius: 16,
      backgroundColor: "#FFFFFF",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: "rgba(177, 177, 177, 1.0)"
    },
    keyboardViewStyle: {
      paddingVertical: 5,
      width: width * 0.85,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginVertical: 20
  
  
    },
    secondKeyboardViewStyle: {
      paddingVertical: 5,
      width: width * 0.85,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10
  
  
    },
    innerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      gap: 16
    },
    viewStyle: {
      width: 40,
      height: 40,
      borderRadius: 5,
      backgroundColor: "#FDFDFD",
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: "#667085",
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  })

export default TransactionPin