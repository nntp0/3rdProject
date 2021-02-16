import'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, TouchableHighlight,  StyleSheet, Text, Button, View } from 'react-native';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ title: 'Camera' }}
        />
        <Stack.Screen name="BagList" component={BagList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const delList = (itemList, itemPrice) => {
  var returnValue = itemList.slice();
  const idx = returnValue.indexOf(itemPrice);
  if (idx > -1) a.splice(idx, 1);
  return returnValue;
}


const BagList = ({ navigation, route }) => {
  const [count, setCount] = useState(route.params.priceList);
  const onPress = (itemPrice) => setCount(delList(count, itemPrice));

  var temp = []
  route.params.priceList.forEach(element => {
    temp.push({key:String(element)})
  });
  return (
    <View>
    
      <FlatList
        data={temp}
        renderItem={({item}) =>
        
          <View style={{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <Text style={styles.item}>{item.key}</Text>
          <Button 
            title={"삭제"}
            
            ></Button>
          </View>
        }
      />
    </View>
  );
};

const AnItem = (props) => {
  return (
    <View style={props.style}>
      <Text>{props.price}</Text>
      <TouchableHighlight onPress={props.setter}>
        <View style={styles.blue}>
          <Text>{"삭제"}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}


const RandomBox = (props) => {
  return (
    <View style={props.style}>
      <TouchableHighlight onPress={props.setter}>
        <View style={styles.blue}>
          <Text>{props.price}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const addList = (itemList, itemPrice) => {
  var returnValue = itemList.slice();
  returnValue.push(itemPrice);
  return returnValue;
}

const Camera = ({ navigation }) => {
  const [count, setCount] = useState([]);
  const onPress = () => setCount(addList(count, itemPrice));

  var itemPrice = Math.round(Math.random()*10000);

  return (
      <View style={{
        flex:1,
        flexDirection: 'row-reverse',
      }}>
        <View style ={{width: 50, height: 50}}>
          <Button
            title="장바구니"
            onPress={() =>
            navigation.navigate('BagList', { priceList: count })
          }
          />
        </View>
        <RandomBox
          price={itemPrice+'won'} 
          style={{
            position:'absolute',
            left: Math.random()*(90) + '%',
            top: Math.random()*(90) + '%',
          }}
          setter={onPress}/>

      </View>
  );
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: '#fff',
  },
  red: {
    backgroundColor: 'red',
  },
  blue: {
    backgroundColor: 'powderblue',
  },
});

var randomSpawn = StyleSheet.create({
  coor: {
    position:'absolute',
    left: Math.random()*(90) + '%',
    top: Math.random()*(90) + '%',
  },
  size: {
    width: 50,
    height: 50,
  },
});

export default MyStack;