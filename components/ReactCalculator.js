import React, { Component, useState } from 'react';
import { View, Text, Switch, AppRegistry, StyleSheet } from 'react-native';

import InputButton from './InputButton';


// 계산기 페이지(Calculator.js)의 버튼을 만드는 코드
const inputButtons = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0, '.', '<']
];
const ReactCalculator = (props) => {

    
    const CgFunc = (value) => {
        props.CgFunc(value)
    }

    const renderInputButtons = () => {
        let views = [];

       //views에 접근해서 < 누를때마다 pop 2개씩 ( < 랑 지울값)

        for (var r = 0; r < inputButtons.length; r++) {
            let row = inputButtons[r];

            // 버튼생성
            let inputRow = [];
            for (var i = 0; i < row.length; i++) {
                let input = row[i];

                inputRow.push(
                    <InputButton
                        value={input}
                        onPress={()=>CgFunc(input)}
                        key={r + "-" + i}
                    />
                );
            }

            // 버튼눌렀을 때 숫자표시하기
            // function _onInputButtonPressed(input) {

            //     console.log('input >> ',input)

            //     let inputValue = (inputVal * 10) + input;

            //     setInputVal(inputValue)
            // }



            views.push(<View style={styles.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }

    return (
        <View style={styles.rootContainer}>
            {/* <View style={styles.displayContainer}>
                <Text style={styles.displayText}>{inputVal}</Text>
            </View> */}
            <View style={styles.inputContainer}>
                {renderInputButtons()}
            </View>
        </View>
    )


    /**
     * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
     */
    // _renderInputButtons() {
    //     let views = [];

    //     for (var r = 0; r < inputButtons.length; r++) {
    //         let row = inputButtons[r];

    //         // 버튼생성
    //         let inputRow = [];
    //         for (var i = 0; i < row.length; i++) {
    //             let input = row[i];

    //             inputRow.push(
    //                 <InputButton
    //                     value={input}
    //                     onPress={_onInputButtonPressed.bind(this, input)}
    //                     key={r + "-" + i}
    //                 />
    //             );
    //         }

    //         // 버튼눌렀을 때 숫자표시하기
    //         function _onInputButtonPressed(input) {

    //             let inputValue = (this.state.inputValue * 10) + input;

    //             this.setState({
    //                 inputValue: inputValue
    //             })
    //         }



    //         views.push(<View style={styles.inputRow} key={"row-" + r}>{inputRow}</View>)
    //     }

    //     return views;
    // }
}

// class ReactCalculator extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             inputValue: 0
//         }
//     }

//     render() {
//         return (
//             <View style={styles.rootContainer}>
//                 <View style={styles.displayContainer}>
//                     <Text style={styles.displayText}>{this.state.inputValue}</Text>
//                 </View>
//                 <View style={styles.inputContainer}>
//                     {this._renderInputButtons()}
//                 </View>
//             </View>
//         )
//     }

//     /**
//      * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
//      */
//     _renderInputButtons() {
//         let views = [];

//         for (var r = 0; r < inputButtons.length; r ++) {
//             let row = inputButtons[r];

//             // 버튼생성
//             let inputRow = [];
//             for (var i = 0; i < row.length; i ++) {
//                 let input = row[i];

//                 inputRow.push(
//                     <InputButton
//                         value={input}
//                         onPress={_onInputButtonPressed.bind(this, input)}
//                         key={r + "-" + i}
//                     />
//                 );
//             }

//             // 버튼눌렀을 때 숫자표시하기
//             function _onInputButtonPressed(input) {

//                 let inputValue = (this.state.inputValue * 10) + input;

//                 this.setState({
//                     inputValue: inputValue
//                 })
//             }



//             views.push(<View style={styles.inputRow} key={"row-" + r}>{inputRow}</View>)
//         }

//         return views;
//     }
// }

//AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#3E606F'
    },
    inputRow: {
        flex: 1,
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 8,
        backgroundColor: '#3E606F'
    },
    displayContainer: {
        flex: 2,
        backgroundColor: '#193441',
        justifyContent: 'center'
    },

    displayText: {
        color: 'white',
        fontSize: 38,
        textAlign: 'right',
        padding: 20
    },
});

export default ReactCalculator;

