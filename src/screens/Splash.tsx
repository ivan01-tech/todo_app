import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {RootStackType} from '../../App';
import {Image} from 'react-native';
import {colors} from '../styles/colors';
import {loadData} from '../utils/loadDatabase';
import {getTodos} from '../utils/db/TodosServices';
import {connectToDatabase} from '../utils/db/db';
import {addTodos, selectTodos} from '../redux/TaskSlice';
import {useDispatch, useSelector} from 'react-redux';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {Todo} from '../types/table.typing';
const RN_TODO_CHANNEL_ID = 'RN_TODO_CHANNEL_ID';
const Splash = ({navigation}: RootStackType) => {
  const dispatch = useDispatch();
  const todoTables = useSelector(selectTodos);
  async function onCreateTriggerNotification(todo: Todo) {
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Number(todo.time), // fire at 11:10am (10 minutes before meeting)
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: todo.title,
        body: todo.description,
        android: {
          channelId: RN_TODO_CHANNEL_ID,
        },
      },
      trigger,
    );
  }

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    return await notifee.createChannel({
      id: RN_TODO_CHANNEL_ID,
      name: 'Default Channel',
    });
  }

  useEffect(function () {
    let time: NodeJS.Timeout;
    console.log('override1122');

    try {
      loadData();
      (async function () {
        const db = await connectToDatabase();
        const todos = await getTodos(db);
        dispatch(addTodos(todos));

        // create channel for notification
        const id = await onDisplayNotification();
        console.log('channel created : ', id);
      })();

      // swithc to the home page
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
    } catch (err) {
      console.log(err);
    }

    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    try {
      console.log('override11');
      if (!todoTables.length) return;
      todoTables.forEach(todoTable => {
        onCreateTriggerNotification(todoTable);
      });
    } catch (error) {
      console.log("error : ", error);
    }
  }, [todoTables]);

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
