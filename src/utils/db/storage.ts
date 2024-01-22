import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: string) => {
  return AsyncStorage.setItem('@userInfo', value);
};
