import React, { useState, useRef, Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import RNTextDetector from "react-native-text-detector";


function App() {
  const [showText, setShowText] = useState("ABCD");
  const cameraRef = useRef();

  const getPicture = async (f) => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        const visionResp = await RNTextDetector.detectFromUri(source);
        
        console.log(visionResp)
      }
    }
  }

  return (
    <View style={styles.container}>
      
      <RNCamera
        style={{flex: 1, alignItems: 'center' }}
        ref={cameraRef}
        captureAudio={false}
      >
      <View style={styles.buttonContainer}>
          <Text>{showText}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              getPicture(setShowText);
            }}>
            <Text style={{width: 300, height: 500}}>click me!</Text>
          </TouchableOpacity>
      </View>

      </RNCamera>
      
      
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  }
})

export default App