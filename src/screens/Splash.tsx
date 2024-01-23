import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {RootStackType} from '../../App';
import {Image} from 'react-native';
import {colors} from '../styles/colors';
import {loadData} from '../utils/loadDatabase';
import {getTodos} from '../utils/db/TodosServices';
import {connectToDatabase} from '../utils/db/db';
import { addTodos } from '../redux/TaskSlice';
import { useDispatch } from 'react-redux';

const Splash = ({navigation}: RootStackType) => {
  const dispatch = useDispatch()
  useEffect(function () {
    let time: NodeJS.Timeout;
    try {
      loadData();
      (async function () {
        const db = await connectToDatabase();
        const todos = await getTodos(db);
       dispatch(addTodos(todos)); 
      })();
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
    } catch (err) {
      console.log(err);
    }

    return () => clearTimeout(time);
  });

  return (
    <View style={styles.rootSplashScreen}>
      <View style={styles.logo_container}>
        <Image source={require('../../assets/logo_png.jpeg')} />
      </View>

      <View>
        <Text style={styles.appName}>Dask App</Text>
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
    gap: 40,
    backgroundColor: colors.first,
  },
  logo_container: {
    // flex: 1,
  },
  appName: {
    fontSize: 50,
    color: colors.white,
    fontFamily: 'BungeeSpice-Regular',
  },
});

export default Splash;
