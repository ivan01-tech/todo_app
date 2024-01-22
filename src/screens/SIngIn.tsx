import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import {storeData} from '../utils/storage';
import {RootStackType} from '../../App';
import {Contact} from '../types/table.typing';
import {addContact} from '../utils/db/Contacts';
import {connectToDatabase} from '../utils/db/db';

const SIngIn = ({navigation}: RootStackType) => {
  //   const navigation = useNavigation<RootStackType>();
  const [userInfo, setState] = useState<Contact>({
    firstName: '',
    name: '',
    phoneNumber: 0,
  });

  const onPressSIngIn = async () => {
    if (!userInfo.name || !userInfo.firstName || !userInfo.phoneNumber) {
      return;
    }
    try {
      const db = await connectToDatabase();
      addContact(db, userInfo);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Sqlite DB</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="name"
          placeholderTextColor="#7464bc"
          onChangeText={text => setState(prev => ({...prev, name: text}))}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="firstName"
          placeholderTextColor="#7464bc"
          onChangeText={text => setState(prev => ({...prev, firstName: text}))}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          keyboardType="numeric"
          placeholder="firstName"
          placeholderTextColor="#7464bc"
          onChangeText={text =>
            setState(prev => ({...prev, phoneNumber: Number(text)}))
          }
        />
      </View>

      <TouchableOpacity onPress={onPressSIngIn}>
        <Text>SIngIn</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7b1d52',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#ded9ee',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ded9ee',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgotAndSignUpText: {
    color: 'white',
    fontSize: 11,
  },
  SIngInBtn: {
    width: '80%',
    backgroundColor: '#228cdc',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
export default SIngIn;
