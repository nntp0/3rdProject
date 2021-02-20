import { StyleSheet } from 'react-native'

export const getStyles = () =>{ return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            justifyContent: 'space-around'
        },
        titlePanel: {
            flex:1
        },
        cameraPanel: {
            flex: 5,
            width: "90%",
        },
        pricePanel: {
            flex: 1,
            width: 100,
            backgroundColor: 'red',
            
            
        },
        infoPanel: {
            flex: 1, 
            backgroundColor: 'blue'
        },
    
        camera: {
            flex: 1,
        },
        price: {
            flex: 1,
            justifyContent: 'center',
            borderWidth: 3,
            borderStyle: 'dashed',
            alignItems: 'center',
            width: 100,
            backgroundColor: 'white'
        }
    })
}