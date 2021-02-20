// InputButton.js

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

// 계산기(ReactCalculator.js) 버튼 만들때 활용하는 커스텀 버튼
export default class InputButton extends Component {
    
    render() {
        return (
            <TouchableOpacity 
                style={styles.inputButton}
                onPress={this.props.onPress}>
                <Text style={styles.inputButtonText}>{this.props.value}</Text>
            </TouchableOpacity>
        )
    }
    
}

const styles = StyleSheet.create({ 
    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D',
        backgroundColor: 'white'
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#027965'
    }
});