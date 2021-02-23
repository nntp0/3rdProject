import { PROPERTY_TYPES } from '@babel/types';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { SafeAreaView, StyleSheet, FlatList, ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';

import ReactCalculator from '../components/ReactCalculator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';

// 사용자가 계산기를 사용할 페이지
function Calculator({ navigation }) {
    const [currency, setCurrency] = useState(global.currency);
    const [toCountry, setToCountry] = useState(global.toCountry);
    const [fromCountry, setFromCountry] = useState(global.fromCountry);
    // 여행지 돈 칸..?
    useEffect(()=>{
        const init = navigation.addListener('tabPress', e=> {
            console.log('Calculator section')
            setCurrency(global.currency)
            setInputPay('')
            setFromCountry(global.fromCountry)
            setToCountry(global.toCountry)
            setdotCnt(0)
        }, [navigation])

        return init
    })
    // issue : 페이지 나갔다 들어올때마다 리스트가 갱신되어야함
    const [inputPay, setInputPay] = useState('') 
    
    
    // 환율정보가 들어올 예정임!
    const [dotCnt, setdotCnt] = useState(0)
    // 하단 숫자판 컴포넌트에 보낼 함수 (Calculator.js의 state값을 변경해주는 함수)
    
    const payChange = (value) => {
    // inputPay : 그동안 눌렀던 버튼들(value미포함)
    // value : 가장 최근에 누른 버튼
    // setInputPay : 들어가는 값 하나        
        if ( value === '.'){
            if(dotCnt >= 1){
                Alert.alert("dot 경고!",".을 두번누르지마!!")
            }else{
                setdotCnt(dotCnt + 1);
                setInputPay(inputPay + value);
            }
        }else{
            if (value === '<') {
                console.log('< 눌렀음!!!!!!!')
                setInputPay(inputPay.slice(0,-1))
            } else {
                setInputPay(inputPay + value) 
            }
        }    
    // 눌렀을 경우 삭제되어야함....
    //inputPayList = inputPay.split('')
    //console.log('payList split 됐니?? >>', inputPayList)    
    //console.log('계산되나요?',inputPay * 10)      
    }   
    return (
        <View style={styles.allContainers}>
            <View style={styles.calContainers}>
                {/* 여행지 돈 */}
                <TouchableOpacity style={styles.calTouch}>
                    <Text style={styles.calMoneyText}>
                        {/* 최초값은 0, 버튼을 누르면 해당 값을 출력 */}
                        {inputPay === '' ? '0' : inputPay}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calTouch}>
                    <Text style={styles.calInfoText}>{fromCountry}</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={styles.calTouch} onPress={() => {
                        var temp = toCountry
                        setToCountry(fromCountry)
                        setFromCountry(temp)
                        setCurrency(1/currency)
                        }}>
                        <Icon style={styles.changeText}>⇆</Icon>
                    </TouchableOpacity>
                     
                </View>
                <TouchableOpacity style={styles.calTouch}>
                    <Text style={styles.calMoneyText}>
                        {(inputPay * currency).toFixed(2)}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calTouch}>
                    <Text style={styles.calInfoText}>{toCountry}</Text>
                </TouchableOpacity>
            </View>
            {/* state 변경 함수 props로 보내기 */}
            <ReactCalculator CgFunc={payChange}></ReactCalculator>
        </View>
    )
}


const styles = StyleSheet.create({

    allContainers: {
        flex: 1,
        backgroundColor: 'white',
    },

    calContainers: {
        flex: 1,
        backgroundColor: '#625296',
        alignItems: 'center',
        justifyContent: 'center',
    },

    calTouch: {
        margin: 10,
        alignItems: 'center',
    },

    calMoneyText: {
        color: 'white',
        fontSize: 30,
    },

    calInfoText: {
        color: '#EFA8B0',
    },

    changeText: {
        color: 'white',
        fontSize: 30,
        padding: 10,
      },    


});

export default Calculator;