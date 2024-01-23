import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {Todo} from '../../types/table.typing';

export const addTodo = async (db: SQLiteDatabase, Todo: Todo) => {
  const insertQuery = `
   INSERT INTO Todos (title, description, color, time, completed)
   VALUES (?, ?, ?, ?, ?)
 `;

  const currentDate = new Date();
  const newDate = Todo.time
    ? new Date(currentDate.getTime() + Number(Todo.time) * 60000).getTime()
    : null;

  const values = [Todo.title, Todo.description, Todo.color, newDate, 0];
  try {
    const result = await db.executeSql(insertQuery, values);
    // console.log("passed values",result[0].insertId,);
    return result;
  } catch (error) {
    console.error(error);
    throw Error('Failed to add Todo');
  }
};

export const getTodos = async (db: SQLiteDatabase): Promise<Todo[]> => {
  try {
    const Todos: Todo[] = [];
    const results = await db.executeSql('SELECT * FROM Todos');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        Todos.push(result.rows.item(index));
      }
    });
    return Todos;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Todos from database');
  }
};

export const updateTodoFoo = async (db: SQLiteDatabase, updatedTodo: Todo) => {
  const updateQuery = `
    UPDATE Todos
    SET title = ?, description = ?, color = ?, time = ?, completed = ?
    WHERE id = ?
  `;

  const currentDate = new Date();
  const newDate = updatedTodo.time
    ? new Date(
        currentDate.getTime() + Number(updatedTodo.time) * 60000,
      ).getTime()
    : null;

  const values = [
    updatedTodo.title,
    updatedTodo.description,
    updatedTodo.color,
    newDate,
    updatedTodo.completed,
    updatedTodo.id,
  ];

  try {
    return db.executeSql(updateQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update Todo');
  }
  
};

export const deleteTodoFoo = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `
    DELETE FROM Todos
    WHERE id = ?
  `;
  const values = [id];
  try {
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove Todo');
  }
};
