import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Todo} from '../types/table.typing';

export const TasksSlice = createSlice(
  {
    initialState: [] as Todo[],
    name: 'TodoSlice',

    reducers: {
      addTodo(state, action: PayloadAction<Todo>) {
        state.push(action.payload);
      },
      addTodos(state, action: PayloadAction<Todo[]>) {
        state.push(...action.payload);
      },
      deleteTodo(state, action: PayloadAction<number>) {
        return (state = state.filter(prev => {
          const id = prev.id;
          console.log('previd : ', id, action.payload);
          return Number(id) !== action.payload;
        }));
      },
      updateTodo(state, action: PayloadAction<Todo>) {
        state.map(prev => {
          const todo = action.payload;

          if (prev.id && prev.id === todo.id) {
            prev.title = todo.title;
            prev.description = todo.description;
            prev.completed = todo.completed;
            prev.color = todo.color;
            prev.time = todo.time;

            console.log('in state  : ', prev,todo);
          }

          return prev;
        });
      },
    },
  },
  // extraReducers(builder) {},
);
export function selectTodos(state: RootState) {
  return state.Todos;
}
export default TasksSlice.reducer;
export const {addTodo, deleteTodo, updateTodo, addTodos} = TasksSlice.actions;
