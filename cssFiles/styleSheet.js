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
            borderRadius: 8,
        },
        titleButtonText: {
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
        },
        cameraText:{
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.5,
            paddingBottom: 10,
        },
        cameraPanel: {
            margin: 30,
            flex: 8,
            width: "80%",
            justifyContent: 'center',
        },
        camera: {
            flex: 1,
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
            //backgroundColor: '#3f365f',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
        },
        priceText: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20,
            paddingTop: 3,
        },

        // UserSetting
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
        
    
    })
}