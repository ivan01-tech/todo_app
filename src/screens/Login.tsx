import React, {useEffect, useState} from 'react';
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
// import PushNotification from 'react-native-push-notification';

const Login = ({navigation}: RootStackType) => {
  //   const navigation = useNavigation<RootStackType>();
  const [userInfo, setState] = useState({
    email: '',
    password: '',
  });

  const onPressLogin = async () => {
    if (!userInfo.email || !userInfo.password) {
      return;
    }
    try {
      const resp = await storeData(JSON.stringify(userInfo));
      console.log('response GO: ', resp);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const onPressForgotPassword = () => {
    // Do something about forgot password operation
  };
  const onPressSignUp = () => {
    // Do something about signup operation
  };

  useEffect(() => {
    // const createChannel = function () {
    //   PushNotification.createChannel(
    //     {
    //       channelId: 'FirstChannel',
    //       channelName: 'FirstChannel',
    //     },
    //     create => {
    //       console.log('first channel  created: ', create);
    //     },
    //   );
    // };
    // createChannel();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Async Storage</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#7464bc"
          onChangeText={text => setState(prev => ({...prev, email: text}))}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#7464bc"
          onChangeText={text => setState(prev => ({...prev, password: text}))}
        />
      </View>
      <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <Text>LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSignUp}>
        <Text style={styles.forgotAndSignUpText}>Signup</Text>
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
  loginBtn: {
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
export default Login;
