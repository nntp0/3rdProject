import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { baseProps } from 'react-native-gesture-handler/dist/src/handlers/gestureHandlers';


function CustomButton(props) {
  // name 넘어오는지 확인
  // console.log('props > ',props.name)
  
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
          <Text style={styles.title}>{props.name}</Text>
        </TouchableOpacity>
      </View>
    );  
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5
    },
    title: {
        color: '#027965',
        fontSize: 15,
    },                      
});

export default CustomButton;