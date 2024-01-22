import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const AddButton = () => {
  return (
    <TouchableOpacity>
      <Text>
        <FontAwesome5Icon size={30} name="plus-circle"></FontAwesome5Icon>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    
})
export default AddButton;
