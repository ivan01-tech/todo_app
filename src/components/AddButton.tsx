import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {RootStackType} from '../../App';
type AddButtonType = {
  onPress: () => void;
};
const AddButton = ({onPress}:AddButtonType) => {
  const navigation = useNavigation<RootStackType>();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}>
      <FontAwesome5Icon
        style={styles.icons}
        size={30}
        name="plus"></FontAwesome5Icon>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.first,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  icons: {
    color: colors.white,
  },
});

export default AddButton;
