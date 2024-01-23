/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useLayoutEffect, useState} from 'react';
import {Text, StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {getContacts} from '../utils/db/Contacts';
import {connectToDatabase} from '../utils/db/db';
import {Contact} from '../types/table.typing';
import {Tables} from '../components/Tables';
import {useDispatch, useSelector} from 'react-redux';
import {
  addContact,
  addContacts,
  deleteContact,
  selectContact,
} from '../redux/ContactSlice';
import {RootStackType} from '../../App';

const Home = ({navigation}: RootStackType) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const db = await connectToDatabase();
        const contacts = await getContacts(db);

        dispatch(addContacts(contacts));

        console.log('data: ', contacts);
      } catch (err) {
        console.log('error: ' + err);
      }
    };
    fetchData();
    return () => {};
  }, [dispatch]);

  const deleteContactHandler = async function (contactId: number) {
    dispatch(deleteContact(contactId));
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Hello Ivan ! </Text>

      {/* <Tables
        contacts={contacts!}
        deleteContactHandler={deleteContactHandler}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'BungeeSpice-Regular',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  container: {
    flex: 1,
    backgroundColor: '#7b1d52',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#ded9ee',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ded9ee',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgotAndSignUpText: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#228cdc',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});

export default Home;
