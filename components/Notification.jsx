import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');


const Notification = ({ visible, type, message, onClose }) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        onClose();
      }, 5000);
    }
  }, [visible, onClose]);

  const getNotificationStyle = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#4caf50' };
      case 'error':
        return { backgroundColor: '#f44336' };
      case 'warning':
        return { backgroundColor: '#ff9800' };
      default:
        return { backgroundColor: '#2196f3' };
    }
  };

  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'check';
      case 'error':
        return 'times';
      case 'warning':
        return 'exclamation';
      default:
        return 'info';
    }
  };

  if (!visible) return null;

  return (
    <View style={[styles.container, getNotificationStyle(), { top: insets.top + 30 }]}>
      <FontAwesome5 name={getIconName()} size={18} color="#fff" />
      <Text style={styles.message}>{message}</Text>
      {/* <TouchableOpacity onPress={onClose}>
        <FontAwesome5 name="times" size={18} color="#fff" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    left: 26,
    right: 26,
  },
  message: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
  },
});

export default Notification;
