/* eslint-disable react-native/no-inline-styles */
import {Table, Row, Cell, TableWrapper} from 'react-native-table-component';
import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {Contact} from '../types/table.typing';
import {TouchableOpacity} from 'react-native';
import {deleteContact} from '../utils/db/Contacts';
import {connectToDatabase} from '../utils/db/db';
// import PushNotification from 'react-native-push-notification';

type Props = {
  contacts: Contact[];
  deleteContactHandler: (contactId: number) => void;
};

// const handglingNotifications = () => {
//   // PushNotification.localNotification({
//     title: 'First Notification',
//     channelId: 'FirstChannel',
//     bigText:
//       ' lorem ipsum dolor sit amet con la base dellamcorper  tempor  invidunt ut labore et',
//     message: 'Lorem ipsum dolor sit amet con la',
//   });
// };

function _alertIndex(
  index: number | string,
  id: number,
  deleteContactHandler: (contactId: number) => void,
) {
  Alert.alert(
    'Sure you wnt to delete it ?',
    ` This is row ${index} with ${id} as id`,
    [
      {
        text: 'OK',
        onPress: async () => {
          try {
            const db = await connectToDatabase();
            const resp = await deleteContact(db, id);
            await deleteContactHandler(id);
            console.log('\nresp : \n', resp);

            // handglingNotifications();
          } catch (error) {
            console.log('error: ', error);
          }
        },
      },
      {
        text: 'cancel',
        onPress: () => null,
      },
    ],
  );
}

const element = (
  _data: string | number | null,
  index: number,
  deleteContactHandler: (contactId: number) => void,
) => (
  <TouchableOpacity
    onPress={() => _alertIndex(index, Number(_data), deleteContactHandler)}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>Delete</Text>
    </View>
  </TouchableOpacity>
);

export const Tables = ({contacts = [], deleteContactHandler}: Props) => {
  const tableHead = ['id', 'Name', 'FirstName', 'Phone', 'Actions'];
  const tableData = contacts.map(item => [
    ...Object.values(item).reverse(),
    null,
  ]);
  console.log('tableData : ', tableData);
  return (
    // <View style={styles.container}>
    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
      <Row data={tableHead} style={styles.head} textStyle={styles.text} />
      {tableData.map((rowData, index) => {
        const id_row = rowData[0];
        return (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  cellIndex === 4
                    ? element(id_row, index, deleteContactHandler)
                    : cellData
                }
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        );
      })}
    </Table>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});
