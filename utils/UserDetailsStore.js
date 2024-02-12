// UserDetailsStore.js
import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetails } from './ApiService';

class UserDetailsStore {
  userDetails = null;
  expoToken = null;
  clearLoginFields = false;
  

  constructor() {
    makeAutoObservable(this);
  }

  async loadUserDetails() {
    try {
      const userDetails = await AsyncStorage.getItem('loggedInUser');
      if (userDetails) {
        runInAction(() => {
          this.userDetails = JSON.parse(userDetails);
        });
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  }

  async saveUserDetails(userDetails) {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(userDetails));
      runInAction(() => {
        this.userDetails = userDetails;
      });
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  }

  async saveExpotoken(expoToken) {
    try {
      await AsyncStorage.setItem('expoToken', expoToken);
      runInAction(() => {
        this.expoToken = expoToken;
      });
    } catch (error) {
      console.error('Error saving expo token:', error);
    }
  }

  async clearLoginFields() {
    runInAction(() => {
      this.clearLoginFields = true;
    });
  }


  clearUserDetails() {
    AsyncStorage.removeItem('userDetails');
    runInAction(() => {
      this.userDetails = null;
    });
  }
}

export default new UserDetailsStore();
