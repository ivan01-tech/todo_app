import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../styles/colors';
import AddButton from '../components/AddButton';
import {BottomType, RootStackType} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTodo, selectTodos} from '../redux/TaskSlice';
import {Todo} from '../types/table.typing';
import {connectToDatabase} from '../utils/db/db';
import {deleteTodoFoo} from '../utils/db/TodosServices';

function _alertIndex(
  id: number,
  deleteTodoHandler: (contactId: number) => void,
) {
  Alert.alert('Delete Task', `Are you sure you want to delete this Task?`, [
    {
      text: 'DELETE',
      onPress: async () => {
        try {
          const db = await connectToDatabase();
          const resp = await deleteTodoFoo(db, id);
          deleteTodoHandler(id);
          console.log('\nresp : \n', resp);
        } catch (error) {
          console.log('error: ', error);
        }
      },
    },
    {
      text: 'cancel',
      onPress: () => null,
    },
  ]);
}

const Completed = ({navigation}: RootStackType) => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const [selectedId, setselectedId] = useState<number>();
  const onPress = () => {
    navigation.navigate('NewTask');
  };
  function deleteTodoFront(id: number) {
    dispatch(deleteTodo(id));
  }
  return (
    <View style={styles.rootSplashScreen}>
      <FlatList
        data={todos}
        renderItem={({item: task}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setselectedId(task.id);
                navigation.navigate('UpdateTodo', task);
              }}
              style={styles.todo_items}
              key={task.id?.toString() + task.title}>
              <View style={styles.text_todo_item}>
                <Text style={styles.todo_title}>{task.title}</Text>
                <Text>{task.description}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  _alertIndex(task.id!, deleteTodoFront);
                }}>
                <Text style={{color: colors.second}}>
                  <MaterialIcons size={20} name="delete" />
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        extraData={selectedId}
        style={styles.rootSplashScreen}></FlatList>

      <AddButton onPress={onPress} />
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({
  rootSplashScreen: {
    width: '100%',
    height: '100%',
    padding: 10,
    position: 'relative',
  },
  text_todo_item: {
    flex: 1,
  },
  todo_title: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    textTransform: 'capitalize',
  },
  todo_items: {
    display: 'flex',
    marginVertical: 4,
    padding: 5,
    height:80,
    borderRadius: 5,
    alignItems: 'center',

    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
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
