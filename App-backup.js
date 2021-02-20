import React, { useState, useRef, Component, useEffect } from 'react'
import { StyleSheet, FlatList, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { RNCamera } from 'react-native-camera'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Button } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { getGeoLocation } from './getGeoLocation'
import { code } from './countryCode';

// page별 코드 정보를 외부에서 가져오기
import BagList from './pages/BagList';
import { Alert } from 'react-native';

const Tab = createMaterialBottomTabNavigator();
global.priceList = []
global.listLength = 0
global.id = 0

const MyStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#ffec94"
        inactiveColor="#ffffff"
        barStyle={{ backgroundColor: '#027965' }}
      >
        <Tab.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: 'MainPage' }}
          test="Iam"
        />
        <Tab.Screen name="BagList" component={BagList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

const MainPage = ({ navigation, route }) => {
  const [isDetected, setIsDetected] = useState(false);
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState("");
  const [timer, setTimer] = useState(0);
  const cameraRef = useRef();

  const [recent, setRecent] = useState(null);
  const [country, setCountry] = useState(null);

  const [geoLocation, setGeoLocation] = useState(null)
  //console.log('country_code > ',code.kr)

  const networkCheck = () => {
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then(state => {
        console.log("Connection type fetch", state.type);
        console.log("Is connected? fetch", state.isConnected);
        if (state.isConnected) {
          console.log('연결')
          resolve(true)
        } else {
          console.log('실패')
          resolve(false)
        }
      }).catch((err) => {
        reject(err)
      });
    })
  }

  const recentApi = () => {
    const url = 'http://59.28.30.218:3000/recent'
    axios.get(url).then((resRecent) => {
      //console.log('resRecent > ', resRecent)
      storeData(resRecent.data)
    })
  }

  const returnCountry = (resGeo) => {
    const geUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + resGeo.lat + '&lon=' + resGeo.lon + '&zoom=18&addressdetail=1';
    axios.get(geUrl).then((resCountry) => {
      storeCountry(resCountry).then(() => {
        console.log('setCountry > ', resCountry)
        console.log('setCountry.data > ', resCountry.data)
        console.log('들어오니?')
        setCountry(resCountry.data.address)
      }).catch((err) => {
        // 에러처리
      })
    })

  }

  const getAsync = () => {
    //alert('AsyncStorage 가져오기!')
    getData().then((resGetData) => {
      console.log('resGetData > ', resGetData)
      setRecent(resGetData)
    })
    getCountry().then((resGetData) => {
      console.log('resGetData > ', resGetData.data.address)
      setCountry(resGetData.data.address)
    })
  }

  //인터넷연결 확인해서 환율정보 갱신하는 거
  useEffect(() => {
    // 인터넷 연결확인
    networkCheck().then((resNetwork) => {
      console.log('resNetwork > ', resNetwork)
      if (resNetwork) {
        // 위도/경도 받아오기
        getGeoLocation().then((resGeo) => {
          console.log('resGeo >>> ', resGeo)
          setGeoLocation(resGeo) // 페이지 하단 출력하기위해 state에 담기
          recentApi() // express api 값 가져오기
          returnCountry(resGeo) // 현재 위도/경도 의 나라 가져오기
        }).catch((err) => {
          Alert.alert('geo err', err)
        })
      } else {
        // 인터넷 연결 안됐을때 async storage에서 가졍오기
        getAsync()
      }
    })

  }, [navigation])

  const storeData = async (value) => {
    console.log('storeData 입장')
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('RKey', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  const getData = async () => {
    console.log('getData 입장')
    try {
      const asyncValue = await AsyncStorage.getItem('RKey')
      const RKeyJson = JSON.parse(asyncValue)
      return RKeyJson
    } catch (e) {
      // error reading value
    }
  }

  const storeCountry = async (value) => {
    console.log('storeCountry')
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('CountryKey', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  const getCountry = async () => {
    console.log('getCountry')
    try {
      const asyncValue = await AsyncStorage.getItem('CountryKey')
      const RKeyJson = JSON.parse(asyncValue)
      return RKeyJson
    } catch (e) {
      // error reading value
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.4 }}>
        <Text>title</Text>
      </View>
      <View style={{ flex: 0.6, width: "90%" }}>
        <RNCamera
          style={{ width: "100%", height: 100 }}
          ref={cameraRef}
          onTextRecognized={({ textBlocks }) => {
            if (timer > 0) {
              setTimer(timer - 1);
            }
            else {
              setPrice('')
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
        </RNCamera>
      </View>
      <View style={styles.price}>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={
          () => {
            global.listLength += 1
            global.id += 1
            global.priceList.push({ id: global.id, price: price })
            console.log(global.priceList)
            console.log(global.listLength)
            setTimer(2);
            setPrice('');
            setIsDetected(false);
          }
        }>
          <Text>{isDetected ? price : null}</Text>
        </TouchableOpacity>
      </View>
      {geoLocation !== null && <Text>위도: {geoLocation.lat} / 경도: {geoLocation.lon}</Text>}
      {country !== null && <Text>나라 : {country.country_code}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around'
  },
  price: {
    marginBottom: 100,
    justifyContent: 'center',
    borderWidth: 3,
    borderStyle: 'dashed',
    alignItems: 'center',
    width: 100,
    height: 50,
    backgroundColor: 'red'
  }
})
