import React from 'react';
import {  Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Button extends React.Component {
    render() {
        return (
           
            <TouchableOpacity 
                hitSlop={{top:10, left: 10, right:10, bottom: 10}}
                onPress={()=>{this.props.onPress()}}
            >
                <Text >
                    <Icon 
                        name={this.props.icon}
                        size={this.props.size} 
                        color="#D8D8D8"
                    />
                </Text>
            </TouchableOpacity>
                
        );
    }
}