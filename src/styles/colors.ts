import {StyleSheet} from 'react-native';

export const colors = {
  first: '#2196F3',
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
  todo_item_wrapper: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 4,

    height: 80,

    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  color_bar: {
    height: '100%',
    width: 10,
    marginRight: 4,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  todo_items: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
});
