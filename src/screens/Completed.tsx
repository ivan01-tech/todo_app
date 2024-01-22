import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../styles/colors'

const Completed = () => {
  return (
    <View style={styles.rootSplashScreen}>
      <Text>Completed</Text>
    </View>
  );
}

export default Completed



const styles = StyleSheet.create({
  rootSplashScreen: {
    width: '100%',
    height: '100%',
    padding: 10,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // gap: 60,
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
