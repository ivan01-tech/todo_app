import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {RootStackType} from '../../App';
import {Image} from 'react-native';
import {colors} from '../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Splash = ({navigation}: RootStackType) => {
  useEffect(function () {
    let time = setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);

    return () => clearTimeout(time);
  });
  return (
    <View style={styles.rootSplashScreen}>
      <View>
        <Text style={styles.appName}>Dask App</Text>
        <FontAwesome5 name={'check-circle'} />
      </View>
      <View style={styles.logo_container}>
        <Image source={require('../../assets/logo_png.jpeg')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootSplashScreen: {
    width: '100%',
    height: '100%',
    paddingTop: 40,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
    backgroundColor: colors.first,
  },
  logo_container: {
    flex: 1,
  },
  appName: {
    fontSize: 50,
    color: colors.white,
    fontFamily: 'BungeeSpice-Regular',
  },
});

export default Splash;
