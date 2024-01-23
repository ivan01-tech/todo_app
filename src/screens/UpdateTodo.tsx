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
import {addTodo, updateTodoFoo} from '../utils/db/TodosServices';
import {alteredTable, connectToDatabase} from '../utils/db/db';
import {Todo} from '../types/table.typing';
import {useDispatch} from 'react-redux';
import {addTodos, addTodo as addTask, updateTodo} from '../redux/TaskSlice';
import {RootStackType, UpdateTaskType} from '../../App';
import CheckBox from 'react-native-check-box';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const UpdateTodo = ({navigation, route}: UpdateTaskType) => {
  const dispatch = useDispatch();
  const [newCreated, setNew] = useState<Todo>(route.params);

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
      const results = await updateTodoFoo(db, newCreated);

      console.log('objects : ', newCreated);
      dispatch(updateTodo(newCreated));
      ToastAndroid.show('Todo updated with success !', ToastAndroid.LONG);
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

        <View style={styles.color_group}>
          {Object.values(colors.todoColor).map(prev => {
            return (
              <TouchableOpacity
                style={[styles.color_btn, {backgroundColor: prev}]}
                key={prev}
                onPress={() => setNew(p => ({...p, color: prev}))}>
                <Text style={{color: '#fff', textAlign: 'center'}}>{prev}</Text>
                {newCreated.color === prev ? (
                  <View style={styles.check_color}>
                    <FontAwesome5Icon name="check" color={'#fff'} size={20} />
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => {
              setNew(prev => ({
                ...prev,
                completed: prev.completed === 1 ? 0 : 1,
              }));
            }}
            rightTextStyle={{
              fontSize: 15,
            }}
            rightText={'Mark it as completed'}
            isChecked={newCreated.completed === 1}
          />
          {/* <Text style={styles.label}>Mark it as completed</Text> */}
        </View>
        <TouchableOpacity style={styles.btn} onPress={addTodoHandler}>
          <Text
            style={{
              color: colors.white,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Update
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  color_btn: {
    flex: 1,
    paddingVertical: 10,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
  },
  label: {
    margin: 8,
  },
  color_group: {
    flexDirection: 'row',
    width: '96%',
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    margin: 10,
    position: 'relative',
    borderRadius: 10,
  },
  check_color: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#00000070',
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
export default UpdateTodo;
