import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import NetInfo from "@react-native-community/netinfo";
import { getGeoLocation } from './getGeoLocation'
import { code } from './currencySign';

import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';



// page별 코드 정보를 외부에서 가져오기
import BagList from './pages/BagList';
import UserSetting from './pages/UserSetting';
import Calculator from './pages/Calculator';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
global.priceList = []
global.fromCountry = ''
global.toCountry = ''
global.currency = 0
global.currencyList = ''
global.currencyFromToList = ''

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="How Much?" 
        component={Home} 
        />
        <Stack.Screen name="CurrencySettings" component={UserSetting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home(){
  return (
      <Tab.Navigator
        activeColor="#EFA8B0"
        inactiveColor="#ffffff"
        barStyle={{ backgroundColor: '#625296' }}
      >
        <Tab.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: 'Shopping',
              tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="camera-outline" color={color} size={23} />)}}/>
        <Tab.Screen name="BagList" component={BagList} 
          options={{ 
              tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cart-outline" color={color} size={23} />)}}/>
        <Tab.Screen name="Calculator" component={Calculator}
          options={{ 
              tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="apps-outline" color={color} size={23} />)}}/>
      </Tab.Navigator>
  );
};
export default MyStack;

const MainPage = ({ navigation, route }) => {
  const [isDetected, setIsDetected] = useState(false);  //카메라에서 숫자가 인식됨?
  const [location, setLocation] = useState(null);       //인식된 숫자의 좌표
  const [price, setPrice] = useState("");               //인식된 숫자
  const [timer, setTimer] = useState(0);                //인식되고 딜레이 설정
  const cameraRef = useRef();

  const [fromCountry, setFromCountry] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [currency, setCurrency] = useState(global.currency);

  // 초기 설정을 진행합니다.
  // 인터넷 가능 확인
  //  1. 가능
  //    1) 최신 환율 정보 수신 (내부서버)
  //      [1] 환율 정보 내부저장소에 저장
  //    2) 위도/경도 수신 (외부서버)
  //      [1] 위도/경도를 바탕으로 현재 위치 수신 (외부서버)
  //      [2] 위치 정보 내부저장소에 저장
  //  2. 불가능
  //    1) 내부저장소에서 환율 정보 가져옴
  //    2) 내부저장소에서 위치 정보 가져옴
  useEffect(() => {
    // 인터넷 연결확인
    networkCheck().then((resNetwork) => {
      if (resNetwork) {
        console.log('1')
        getRecentCurrencyList().then((res) => {
          getGeoLocation().then((resGeo) => { // 위도/경도 받아오기
            console.log('1.2 Success')
            getCurrentCountry({
              currencyList:res.currencyList,
              fromToList:res.fromToList, 
              resGeo:resGeo}) // 현재 위도/경도 의 나라 가져오기
          })
        })
      } else {
        // 인터넷 연결 안됐을때 async storage에서 가져오기
        console.log('2')
        getAsyncStorage()
      }
    })

    const unsubscribe = navigation.addListener('focus', () => {
      console.log('MainPage')
      
      if (global.currencyList && global.fromCountry && global.toCountry) {
        if (global.fromCountry == global.toCountry){
          global.currency = 1
        }
        else {
          global.currency = (global.currencyList[global.fromCountry + '/' + global.toCountry])
        }
        setFromCountry(global.fromCountry)
        setToCountry(global.toCountry)
        setCurrency(global.currency)
      }
    });

    return unsubscribe;

  }, [navigation])

  const networkCheck = () => {
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then(state => {
        //console.log("Connection type fetch", state.type);
        //console.log("Is connected? fetch", state.isConnected);
        if (state.isConnected) {
          //console.log('연결')
          resolve(true)
        } else {
          //console.log('실패')
          resolve(false)
        }
      }).catch((err) => {
        reject(err)
      });
    })
  } // 현재 인터넷이 가능한지 확인합니다.
  
  // 인터넷이 가능한 경우
  const getRecentCurrencyList = () => {
    return new Promise((resolve, reject) => {
      const url = 'http://59.28.30.218:3000/recent'

      axios.get(url).then((res) => {
        storeCurrencyList(res.data)
        console.log('1.1 Success')
        global.currencyList = res.data

        var fromToList = {}
        var fromList = new Set()
        Object.keys(res.data).forEach(element => {
          element = element.split('/')
          if (fromList.has(element[0]))
          {
            fromToList[element[0]].push(element[1])
          }
          else {
            fromList.add(element[0])
            fromToList[element[0]] = [element[1]]
          }
        });
        global.currencyFromToList = fromToList

        resolve({currencyList:res.data, fromToList:fromToList})
      })
    })
  } // 현재 CurrencyList를 얻어옵니다.

  const getCurrentCountry = (res) => {
    var resCurrencyList = res.currencyList
    var fromToList = res.fromToList
    var resGeo = res.resGeo

    const geUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + resGeo.lat + '&lon=' + resGeo.lon + '&zoom=18&addressdetail=1';
    axios.get(geUrl).then((resCountry) => {
      console.log('1.2.1 Success')
      resCountry = code[resCountry.data.address.country_code] //반환된 모든 정보에서 나라 정보만 추출
      storeCountry(resCountry)
      if (resCountry == 'USD') global.currency = 1
      else global.currency=resCurrencyList[resCountry + '/USD']
      
      global.fromCountry = resCountry
      global.toCountry = 'USD'
      setFromCountry(resCountry)
      setToCountry('USD')
      console.log(resCountry)

      if (resCountry == 'USD') setCurrency(1)
      else setCurrency(resCurrencyList[resCountry + '/USD'])
    })
  } // 현재 Country 정보를 얻어옵니다.
  const storeCurrencyList = async (value) => {
    //console.log('Store CurrencyList into Async Storage')
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('CurrencyListKey', jsonValue)
      console.log('1.1.1 Success')
    } catch (e) {
      console.log('1.1.2 Fail: ', err)
    }
  } // Async 스토리지에 CurrencyList를 저장합니다
  const storeCountry = async (value) => {
    //console.log('Store Country into Async Storage')
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('CountryKey', jsonValue)
      console.log('1.2.2 Success')
    } catch (e) {
      console.log('1.2.2 Fail: ', err)
    }
  } // Async 스토리지에 Country를 저장합니다
  
  // 인터넷이 불가능한 경우
  const getAsyncStorage = () => {
    //AsyncStorage에서 정보를 불러옵니다.
    //CurrencyList, Country
    getCurrenyList().then((resCurrency) => {
      global.currencyList = resCurrency

      var fromToList = {}
      var fromList = new Set()
      Object.keys(resCurrency).forEach(element => {
        element = element.split('/')

        if (fromList.has(element[0]))
        {
          fromToList[element[0]].push(element[1])
        }
        else {
          fromList.add(element[0])
          fromToList[element[0]] = [element[1]]
        }
      });
      global.currencyFromToList = fromToList

      getCountry().then((resCountry) => {
        if (resCountry == 'USD') global.currency = 1
        else global.currency=resCurrencyList[resCountry + '/USD']

        global.fromCountry = resCountry
        global.toCountry = 'USD'
        setFromCountry(resCountry)
        setToCountry('USD')

        if (resCountry == 'USD') setCurrency(1)
        else setCurrency(resCurrencyList[resCountry + '/USD'])
      })
    })
  } // Async 스토리지에 CurrencyList, Country를 불러와 State(recentCurrencyList, country)에 저장합니다.
  const getCurrenyList = async () => {
    //console.log('Get CurrencyList from Async Storage')
    try {
      const asyncValue = await AsyncStorage.getItem('CurrencyListKey')
      const RKeyJson = JSON.parse(asyncValue)
      console.log('2.1 Success')
      return RKeyJson
    } catch (e) {
      console.log('2.1 Fail: ', e)
    }
  } // Async 스토리지에 저장된 CurrencyList를 불러옵니다.
  const getCountry = async () => {
    //console.log('Get Country from Async Storage')
    try {
      const asyncValue = await AsyncStorage.getItem('CountryKey')
      const RKeyJson = JSON.parse(asyncValue)
      console.log('2.2 Success')
      return RKeyJson
    } catch (e) {
      console.log('2.2 Fail: ', e)
    }
  } // Async 스토리지에 저장된 Country를 불러옵니다.


  return (
    <View style={styles.container}>
      <View style={styles.titlePanel}>
        <TouchableOpacity
          activeOpacity={0.2}
          style={styles.titleButton} 
          onPress={() => {
              navigation.navigate('CurrencySettings', {
                "fromCountry":fromCountry,
                "toCountry":toCountry,
                "currencyFromToList":global.currencyFromToList
              })
          }
        }>
          <Text style={styles.titleButtonText}>{fromCountry+'  ➔  '+toCountry}</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.cameraText}>
        <Text >카메라 화면에 가격표를 맞춰주세요</Text>
        <Text >Point camera at a price tag</Text>
      </View>
      <View style={styles.cameraPanel}>
        <RNCamera
          style={styles.camera}
          ref={cameraRef}
          onTextRecognized={({ textBlocks }) => {
            if (timer > 0) {
              setTimer(timer - 1);
            }
            else {
              if (textBlocks.length == 0) {
                setPrice('')
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

      <View style={styles.buttonPanel}>

        <View style={styles.infoPanel}>
          <TouchableOpacity activeOpacity={0.2} onPress={
            () => {
              if (price!='') {
              global.priceList.push({price:price})
              console.log(global.priceList)
              setTimer(2);
              setPrice('');
              setIsDetected(false);
              }
            }
          }>
            <Text style={{color:'white', fontSize: 15}}>{fromCountry}</Text>
            <Text style={styles.priceText}>{isDetected ? price : null }</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoPanel}>
          <TouchableOpacity activeOpacity={0.2} onPress={
              () => {
                if (price!='') {
                global.priceList.push({price:price})
                console.log(global.priceList)
                setTimer(2);
                setPrice('');
                setIsDetected(false);
                }
              }
            }>
            <Text style={{color:'white', fontSize: 15}}>{toCountry}</Text>
            <Text style={styles.priceText}>{isDetected ? (price*currency).toFixed(2) : null }</Text>
          </TouchableOpacity>          
        </View>
      </View>

    </View>
  )
}

import { getStyles } from './cssFiles/styleSheet'
import { ViewWindows } from 'react-native-windows';
const styles = getStyles()