import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setSearch } from '../Actions/actions';

import Button from "./Button"

export default class Header extends React.Component {
  
    componentWillMount(){
     
    }
    render() {
        return (
            <View style={styles.header}>
                <Text style={[styles.title, {marginTop: this.props.titleVert}]}>{this.props.title}</Text>
                <View style={[styles.inputs, {marginBottom: this.props.bottom}]}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#2CA550",
        width: "100%",
    },
    title:{
        fontSize: 38,
        color: "#fff",
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 15,
        fontWeight: "bold"
    },
    inputs:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15
    },
});