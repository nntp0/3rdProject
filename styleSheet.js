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
            flex:0.5,
            backgroundColor: "#625296",
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleText:{
            color: "#EFA8B0",
            fontWeight: "bold",
            fontSize: 20
        },
        cameraText:{
           margin: 20,
        },
        cameraPanel: {
            flex: 5,
            width: "60%",
            
            justifyContent: 'center',
        },
        buttonPanel: {
            flex: 1,
            width: 100,
            margin: 10,
        },
        pricePanel: {
            flex: 0.5,
            margin: 2,
            backgroundColor: '#EFA8B0',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            fontSize: 20,
        },
        infoPanel: {
            flex: 0.5,
            margin: 2,  
            backgroundColor: '#A89DC8',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            fontFamily : 'NanumPenScript-Regular'
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