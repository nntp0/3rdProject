import React, { useState, useRef, Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'

function MenuCamera() {
  const [isDetected, setIsDetected] = useState(false);
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState("");
  const [timer, setTimer] = useState(0);
  const cameraRef = useRef();

  return (
    <View style={styles.container}>
      <RNCamera
        style={{ width:300, height:500, alignItems: 'center' }}
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
                  setTimer(10);
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
        top:location.origin.y-50,
        width:location.size.width,
        height:location.size.height,
        backgroundColor: 'white',
        }}><Text>{price}</Text></View>}
      </RNCamera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

export default MenuCamera