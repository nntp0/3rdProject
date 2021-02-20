import { PROPERTY_TYPES } from '@babel/types';
import React from 'react';
import { SafeAreaView, StyleSheet, CheckIcon, FlatList, ScrollView , View ,Text, Button, TouchableOpacity, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';

import Icon from 'react-native-vector-icons/FontAwesome';
// import _ from 'lodash';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// 사용자 국가 설정 페이지
function UserSetting( { navigation } ) {
  
  return (
    
    <View style={styles.allContainers}>

      <View style={styles.changeContainers}>

        <Text style={styles.changeText}>
          바꾸기 전
        </Text>
        <Icon style={styles.changeText}>⇆</Icon>
        <Text style={styles.changeText}>
          바꾼 후
        </Text>

      </View>

      <View style={styles.searchContainer}>
       <TextInput 
       style={styles.searchInput}
       placeholder='검색어를 입력하세요'
       >  
       </TextInput>
       <CustomButton name='검색'></CustomButton>
      </View>

      <ScrollView style={styles.worldListContainers}>
        
        <TouchableOpacity style={styles.worldListContents}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.worldListText}>KRW</Text>
            <Text style={styles.worldListText}>한국</Text>
          </View>
        </TouchableOpacity>

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
    flexDirection: 'row',
    backgroundColor: '#027965',
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
    borderBottomColor: '#bfede5',
    borderBottomWidth: 1,
  }, 

  changeText: {
    color: 'white',
    fontSize: 30,
    padding: 10,
  },

  worldListText: {
    flex: 4,
    padding: 5,
    color: 'gray',
    fontSize: 20,
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