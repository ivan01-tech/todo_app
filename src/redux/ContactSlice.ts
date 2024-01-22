import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import store from './store';
import {Contact} from '../types/table.typing';

export const contactSlicer = createSlice(
  {
    initialState: [] as Contact[],
    name: 'contactSlice',

    reducers: {
      addContact(state, action: PayloadAction<Contact>) {
        state.push(action.payload);
      },
      addContacts(state, action: PayloadAction<Contact[]>) {
        state.push(...action.payload);
      },
      deleteContact(state, action: PayloadAction<number>) {
        console.log('state : ', state);
        state.filter(prev => {
          const id = prev.id;
          console.log('previd : ', id, action.payload);
          return Number(id) !== action.payload;
        });
        console.log('state : ', state);
        state;
      },
      update(state, action: PayloadAction<Contact>) {
        state.push(action.payload);
      },
    },
  },
  // extraReducers(builder) {},
);
export function selectContact() {
  return store.getState().contacts;
}
export default contactSlicer.reducer;
export const {addContact, deleteContact, addContacts} = contactSlicer.actions;
