import React, { useState, useRef, Component } from 'react'
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const MyStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: 'MainPage' }}
        />
        <Tab.Screen name="BagList" component={BagList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const MainPage = ({ navigation }) => {
  const [isDetected, setIsDetected] = useState(false);
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState("");
  const [timer, setTimer] = useState(0);
  const cameraRef = useRef();

  return (
    <View style={styles.container}>
      <View>
        <Text></Text>
      </View>
      <RNCamera
        style={{width:"100%", height:100}}
        ref={cameraRef}
        onTextRecognized={({textBlocks})=>{
          if (timer > 0) {
            setTimer(timer - 1);
          }
          else {
            if (textBlocks.length == 0) {
              setIsDetected(false)
            } else {
              textBlocks.forEach(element => {
                var temp = String(element.value)
                temp = temp.replace(',', '')
                if (!isNaN(temp)) {
                  setLocation(element.bounds);
                  setPrice(temp);
                  setTimer(5);
                  setIsDetected(true)
                }
              });
            }
          }
        }}
      >
      {isDetected && <View style={{
        position:'absolute',
        borderWidth:3,
        borderStyle: 'dashed',
        left:location.origin.x,
        top:location.origin.y,
        width:100,
        height:100,
        backgroundColor: 'white',
        }}><Text>{price}</Text></View>}
      </RNCamera>

    </View>
  )
}

const BagList = ({ navigation, route }) => {
  var temp = []
  /*route.params.priceList.forEach(element => {
    //temp.push({key:String(element)})
  });*/
  return (
    <View>
      <FlatList
        data={temp}
        renderItem={({item}) =>        
          <View style={{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text style={styles.item}>{item.key}</Text>
            <Button 
              title={"삭제"}
            ></Button>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

export default MyStack;