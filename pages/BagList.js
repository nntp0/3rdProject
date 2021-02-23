import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView , View ,Text } from 'react-native';

// 직접 만든 버튼 컴포넌트를 외부에서 가져오기
import CustomButton from '../components/CustomButton';
import { getStyles } from '../cssFiles/styleSheet';

function sum(priceList) {
  var total = 0;
  priceList.forEach(element => {
    total += parseInt(element.price);
  });
  return total
}

function BagList( {navigation} ) {
    const [itemList, setItemList] = useState(global.priceList);
    const [currency, setCurrency] = useState(global.currency);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', e => {
        console.log('BagList')
        setItemList(global.priceList)
        setCurrency(global.currency)
        toggle ? setToggle(false) : setToggle(true)
      }, [navigation]);
  
      return unsubscribe;
    })

    return (
        <View style={styles.allContainers}>

            <View style={styles.priceTotalContainers}>

              <Text style={styles.priceTitleText}>합계금액</Text>
  
              <View>
                <View style={styles.priceTextContainers}>
                  <Text style={styles.priceCurrency}>{global.fromCountry}     </Text>
                  <Text style={styles.priceText}>{sum(itemList)}</Text>
                </View>
                
                <View style={styles.priceTextContainers}> 
                  <Text style={styles.priceCurrency}>{global.toCountry}    </Text>
                  <Text style={styles.priceText}>{(sum(itemList)*currency).toFixed(2)}</Text>
                </View>             
              </View>
           
            </View>            

            <ScrollView style={styles.priceListContainers}>
              { itemList.length==0 ? null : itemList.map((row, index) => {
                return (
                  <View style={styles.priceListContents} key={index}>
                    <Text style={styles.priceListText}>
                        {row.price}
                    </Text>
                    <Text style={styles.priceListText}>
                        {(row.price*currency).toFixed(2)}
                    </Text>
                    <CustomButton name='삭제' onPress={() => {                      
                      global.priceList = global.priceList.slice(0, index).concat(global.priceList.slice(index+1, global.priceList.length))
                      setItemList(global.priceList)
                    }}></CustomButton>
                  </View>
                  )}) 
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

  priceTotalContainers: {
    flex: 0.5,
    backgroundColor: '#625296',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  priceTextContainers: {
    flexDirection: 'row',
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
    borderBottomColor: '#625296',
    borderBottomWidth: 0.5,
  }, 

  priceTitleText: {
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },

  priceCurrency: {
    color: '#EFA8B0',
    fontSize: 20,
  },

  priceText: {
    color: 'white',
    fontSize: 20,
  },

  priceListText: {
    flex: 4,
    padding: 5,
    color: 'gray',
    fontSize: 20,
  },

} );

export default BagList;