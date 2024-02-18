import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = 'https://beelsfinance.com/api/api/v1/';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const getRequestHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`
    };
  }
  return defaultHeaders;
};

export const getRequest = async (url) => {
  try {
    const headers = await getRequestHeaders();
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers
    });
    const data = await response.json();
    if (data.status === 'Success') {
      return { data, error: false, errorMessage: null, successMessage: data.message };
    }
    return { data, error: true, errorMessage: data.message };
  } catch (error) {
    return { data: null, error: true, errorMessage: error.message };
  }
};


export const postRequest = async (url, body) => {
    try {
        const headers = await getRequestHeaders();
        const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
        });
        const data = await response.json();
        if (data.status === 'Success') {
          // console.log('Post request data:', data);
            return { data: data.data, error: false, errorMessage: null, successMessage: data.message, token: data.token };
        }
        return { data: data.data, error: true, errorMessage: data.message };
    } catch (error) {
        return { data: null, error: true, errorMessage: error.message };
    }
};
























