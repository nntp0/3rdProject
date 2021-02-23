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
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#625296',
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleButton:{
            margin: 20,
            padding: 5,
            backgroundColor: '#3f365f',
            borderRadius: 10,
        },
        titleButtonText: {
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
        },
        cameraText:{
            margin: 10,
            flexDirection : 'row',
            flex: 0.5,
            paddingBottom: 10,
        },
        cameraPanel: {
            flex: 8,
            width: "80%",
            justifyContent: 'center',
        },
        buttonPanel: {
            flex: 2,
            width: "80%",
            margin: 10,
            paddingTop: 10,
            flexDirection: 'row'
        },
        infoPanel: {
            flex: 1, 
            margin: 10,  
            backgroundColor: '#A89DC8',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
        },
        camera: {
            flex: 1,
        },
    })
}