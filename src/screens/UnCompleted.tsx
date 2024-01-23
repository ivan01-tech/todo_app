import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles, colors} from '../styles/colors';
import AddButton from '../components/AddButton';
import {BottomType, RootStackType} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTodo, selectTodos, updateTodo} from '../redux/TaskSlice';
import {Todo} from '../types/table.typing';
import {connectToDatabase} from '../utils/db/db';
import {deleteTodoFoo, updateTodoFoo} from '../utils/db/TodosServices';
import CheckBox from 'react-native-check-box';

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

const UnCompleted = ({navigation}: RootStackType) => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const UncompletedTodo = todos.filter(prev => prev.completed === 0);
  const [selectedId, setselectedId] = useState<number>();
  const onPress = () => {
    navigation.navigate('NewTask');
  };
  function deleteTodoFront(id: number) {
    dispatch(deleteTodo(id));
  }
  const handlerCheckedTodo = async (task: Todo) => {
    try {
      const newObj: Todo = {
        ...task,
        completed: task.completed === 1 ? 0 : 1,
      };
      const db = await connectToDatabase();
      const results = await updateTodoFoo(db, newObj);

      dispatch(updateTodo(newObj));
      ToastAndroid.show('Todo updated with success !', ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show('Failed to update the task', ToastAndroid.LONG);
    }
  };
  return (
    <View style={styles.rootSplashScreen}>
      <FlatList
        data={UncompletedTodo}
        renderItem={({item: task}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setselectedId(task.id);
                navigation.navigate('UpdateTodo', task);
              }}
              style={GlobalStyles.todo_item_wrapper}
              key={task.id?.toString() + task.title}>
              <View
                style={[
                  GlobalStyles.color_bar,
                  {backgroundColor: task.color},
                ]}></View>
              <View style={GlobalStyles.todo_items}>
                <CheckBox
                  style={{paddingHorizontal: 10, paddingLeft: -5}}
                  onClick={() => handlerCheckedTodo(task)}
                  isChecked={task.completed === 1}
                />
                <View style={GlobalStyles.text_todo_item}>
                  <Text style={GlobalStyles.todo_title}>{task.title}</Text>
                  <Text>
                    {task.description.length > 30
                      ? task.description.slice(0, 30) + '...'
                      : task.description}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    _alertIndex(task.id!, deleteTodoFront);
                  }}>
                  <Text style={{color: '#ff3636'}}>
                    <MaterialIcons size={20} name="delete" />
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        extraData={selectedId}
        style={styles.rootSplashScreen}></FlatList>

      <AddButton onPress={onPress} />
    </View>
  );
};

export default UnCompleted;

const styles = StyleSheet.create({
  rootSplashScreen: {
    width: '100%',
    height: '100%',
    padding: 10,
    position: 'relative',
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
