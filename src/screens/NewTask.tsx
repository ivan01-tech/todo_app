import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {colors} from '../styles/colors';
import {addTodo} from '../utils/db/TodosServices';
import {alteredTable, connectToDatabase} from '../utils/db/db';
import {Todo} from '../types/table.typing';
import {useDispatch} from 'react-redux';
import {addTodos, addTodo as addTask} from '../redux/TaskSlice';
import {RootStackType} from '../../App';

const NewTask = ({navigation}: RootStackType) => {
  const dispatch = useDispatch();
  const [newCreated, setNew] = useState<Todo>({
    title: '',
    description: '',
    completed: 0,
  });

  const handlerChanged = function (
    params: keyof typeof newCreated,
    value: string,
  ) {
    setNew(prev => ({...prev, [params]: value}));
  };
  const addTodoHandler = async () => {
    if (!newCreated.title) {
      ToastAndroid.show('Please enter the title !', ToastAndroid.LONG);
      return;
    }

    try {
      const db = await connectToDatabase();
      const results = await addTodo(db, newCreated);
      const newObj = {...newCreated, id: results[0].insertId};

      console.log('objects : ', newObj);
      dispatch(addTask(newObj));
      ToastAndroid.show('Todo added with success !', ToastAndroid.LONG);
      navigation.navigate('Home');
      
    } catch (error) {
      console.log('failed to add to database', error);
    }
  };
  return (
    <View>
      <View style={styles.wrapper}>
        <TextInput
          value={newCreated.title}
          style={styles.input}
          placeholder="title"
          onChangeText={data => handlerChanged('title', data)}
        />
        <TextInput
          style={[styles.input]}
          multiline
          placeholder="Description"
          onChangeText={data => handlerChanged('description', data)}
          value={newCreated.description}></TextInput>

        <TouchableOpacity style={styles.btn} onPress={addTodoHandler}>
          <Text
            style={{
              color: colors.white,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {display: 'flex', alignItems: 'center'},
  input: {
    borderColor: colors.third,
    backgroundColor: colors.white,
    margin: 10,
    marginBottom: 10,
    width: '95%',
    borderRadius: 5,
    fontSize: 17,
  },
  btn: {
    backgroundColor: colors.third,
    width: '90%',
    margin: 'auto',
    color: colors.white,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
});
export default NewTask;
