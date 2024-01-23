import {StyleSheet} from 'react-native';

export const colors = {
  first: '#0B60B0',
  second: '#6E2932',
  third: '#561C24',
  forth: '#4F6F52',
  white: '#FFFFFF',
  todoColor: {
    orange: '#d6542c',
    green: '#71a511',
    white: '#ffffff',
    blue: '#124c81',
  },
};

export const GlobalStyles = StyleSheet.create({
  text_todo_item: {
    flex: 1,
    display: 'flex',
    gap: 10,
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
    height: 80,
    borderRadius: 5,
    alignItems: 'center',

    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
