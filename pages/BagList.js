import { PROPERTY_TYPES } from '@babel/types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView , View ,Text } from 'react-native';

// 직접 만든 버튼 컴포넌트를 외부에서 가져오기
import CustomButton from '../components/CustomButton';
import { getStyles } from '../styleSheet';

function sum(priceList) {
  var total = 0;
  priceList.forEach(element => {
    total += parseInt(element.price);
  });
  return total
}

function BagList( {navigation, route} ) {
    const [listLength, setListLength] = useState(global.listLength);
    const [itemList, setItemList] = useState(global.priceList.length);

    useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', e => {

        console.log('BagList')
        setItemList(global.priceList)
        setListLength(global.priceList.length)

      }, [navigation]);
  
      return unsubscribe;
    })



    return (
        <View style={styles.allContainers}>

            <View style={styles.priceTotalContainers}>
                <Text style={styles.priceTotalText}>
                  {sum(itemList)}
                </Text>
            </View>            

            <ScrollView style={styles.priceListContainers}>
              { listLength==0 ? null : itemList.map((row, index) => {
                return (
                  <View style={styles.priceListContents} key={index}>
                    <Text style={styles.priceListText}>
                        {row.price}
                    </Text>
                    <CustomButton name='삭제' onPress={() => {                      
                      global.priceList = global.priceList.slice(0, index).concat(global.priceList.slice(index+1, global.priceList.length))
                      setItemList(global.priceList)
                      setListLength(global.priceList.length)
                    }}></CustomButton>
                  </View>
                  )}) 
              }
            </ScrollView>
        </View>
    )
}
function delList(text) {
  console.log(text)
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