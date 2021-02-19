import { PROPERTY_TYPES } from '@babel/types';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, ScrollView , View ,Text, Button, TouchableOpacity } from 'react-native';

// 직접 만든 버튼 컴포넌트를 외부에서 가져오기
import CustomButton from '../components/CustomButton';

function BagList( {navigation, route} ) {
    const [listLength, setListLength] = useState(global.listLength);
    const [itemList, setItemList] = useState(global.priceList);

    useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', e => {

        console.log('BagList')
        setItemList(global.priceList)
        setListLength(global.listLength)

      }, [navigation]);
  
      return unsubscribe;
    })

    const delList = (index) => {
      console.log('123')
    }


    return (
        <View style={styles.allContainers}>

            <View style={styles.priceTotalContainers}>
                <Text style={styles.priceTotalText}>
                총 금액 표시
                </Text>
            </View>            

            <ScrollView style={styles.priceListContainers}>
              { listLength==0 ? null : itemList.map(list => {
                return (
                  <View style={styles.priceListContents} key={list.id}>
                  <Text style={styles.priceListText}>
                      {list.price}
                  </Text>
                  <CustomButton name='삭제' onPress={()=>{console.log('clicked')}}></CustomButton>
                  </View>
                  )}) 
              }
            </ScrollView>
        </View>
    )
}



/*useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', e => {
        navigation.navigate('MainPage')
        console.log('MainPage')
      });
    }, [navigation])*/
/*{ isNone ? null : itemList.map(list => {
  return (
      <View style={styles.priceListContents} key={list.id}>
      <Text style={styles.priceListText}>
          {list.price}
      </Text>
      <CustomButton name='삭제'></CustomButton>
      </View>
      )}) 
  }*/
  /*<View style={styles.priceListContents}>
  <Text style={styles.priceListText}>
      안녕하세요
  </Text>
  <CustomButton name='삭제'></CustomButton>
</View>*/




const styles = StyleSheet.create ( {

  allContainers: {
    flex: 1,
    backgroundColor: 'white',
  },

  priceTotalContainers: {
    flex: 0.5,
    backgroundColor: '#027965',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  priceListContainers: {
    flex: 3,
    backgroundColor: 'white',
  },
  
  priceListContents:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
    borderBottomColor: '#bfede5',
    borderBottomWidth: 1,
  }, 

  priceTotalText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  priceListText: {
    flex: 4,
    padding: 5,
    color: 'gray',
    fontSize: 20,
  },

} );

export default BagList;