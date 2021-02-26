import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, CheckIcon, FlatList, ScrollView , View ,Text, Button, TouchableOpacity, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import { code } from '../currencySign';

import Icon from 'react-native-vector-icons/FontAwesome';
// import _ from 'lodash';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// 사용자 국가 설정 페이지
function UserSetting( { navigation, route } ) {
  var {
    fromCountry,
    toCountry,
    currencyFromToList,
  } = route.params
  const [isLeft, setIsLeft] = useState(true);
  const [tmpFromCountry, setTmpFromCountry] = useState(fromCountry);
  const [tmpToCountry, setTmpToCountry] = useState(toCountry);
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      console.log('Setting')
      console.log(global.fromCountry + '/' + global.toCountry)
    });

    return unsubscribe;
  }, [navigation]);

  var fromCountryList = Object.keys(currencyFromToList)

  return (
    <View style={styles.allContainers}>
      <View style={styles.changeContainers}>
        
        <View style={{flexDirection: 'row',}}>
          <TouchableOpacity style={styles.worldListContents} onPress={() => {
            setIsLeft(true)
            console.log('Left')
          }}>
            <Text style={styles.changeText}>
              {tmpFromCountry}
            </Text>
          </TouchableOpacity>
          <Text style={styles.changeText}>➔</Text>
          <TouchableOpacity style={styles.worldListContents} onPress={() => {
            setIsLeft(false)
            console.log('Right')
          }}>
            <Text style={styles.changeText}>
              {tmpToCountry}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      

      <ScrollView style={styles.worldListContainers}>
        { isLeft ? (fromCountryList.length==0 ? null : fromCountryList.map((row, index) => {
          return (
            <View style={styles.priceListContents} key={index}>
              <TouchableOpacity style={styles.worldListContents} onPress={() => {
                //setFromCountry(row)
                setTmpFromCountry(row)
                global.fromCountry=row
                console.log(row)
              }}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.worldListText}>{row}</Text>
                  <Text style={styles.worldListText}>{code[row]}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        })) : (currencyFromToList[tmpFromCountry].length==0 ? null : currencyFromToList[tmpFromCountry].map((row, index) => {
          return (
            <View style={styles.priceListContents} key={index}>
              <TouchableOpacity style={styles.worldListContents} onPress={() => {
                //setToCountry(row)
                setTmpToCountry(row)
                global.toCountry=row
                console.log(row)
              }}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.worldListText}>{row}</Text>
                  <Text style={styles.worldListText}>{code[row]}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }))
      }
      </ScrollView>
    </View>  
  )
}
const styles = StyleSheet.create ( {

  allContainers: {
    flex: 1,
    backgroundColor: 'white',
  },

  changeContainers: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: '#625296',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  worldListContainers: {
    flex: 3,
    backgroundColor: 'white',
  },
  
  worldListContents:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
    borderBottomColor: '#625296',
    borderBottomWidth: 0.5,
  }, 

  changeText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },

  worldListText: {
    flex: 2,
    padding: 3,
    color: 'gray',
    fontSize: 17,
  },

  searchContainer: {
    padding: 10,
    flexDirection: 'row',
  }, 

  searchInput: {
    flex: 4,
    borderWidth: 1,
  },

} );

export default UserSetting;