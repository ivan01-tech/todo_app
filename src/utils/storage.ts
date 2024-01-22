import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: string) => {
  return AsyncStorage.setItem('@userInfo', value);
};

export const getData = async (key: string) => {
  return JSON.parse((await AsyncStorage.getItem(key)) || '') as any;
};

export const deleteData = async (key: string) => {
  AsyncStorage.removeItem(key);
};
