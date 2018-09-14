import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { changeState, clockOut, fetchEntries } from '../Actions/actions';

export default class Toolbar extends React.Component {
  
    constructor(props){
        super(props)
        this.state = {
            started: false,
            onBreak: false
        }
        this.change = this.change.bind(this)
    }

    async change(c){
        this.props.callback(changeState(c))
        if(c=="Stop"){
            this.props.callback(await this.props.buttons.right.action(this.props.start, this.props.job))
            this.props.callback(await fetchEntries(this.props.job._id))
        } 
        else if(c=="Break"){
            console.log("ABOUT to BREAK=====>", this.props.job)
            this.props.callback( this.props.buttons.left.action(this.props.job))
        }
        else if(c=="Start"){
            this.props.callback( this.props.buttons.left.action())
        }
        else if(c=="Resume"){
            this.props.callback( this.props.buttons.left.action())
        }
        else if(c=="New"){
            this.props.new()
        }
    }
  

    render() {
        const buttons = this.props.buttons;
        
        return (
            <View style={styles.toolbar}>
                <View style={styles.inputs}>
                    <TouchableOpacity 
                        hitSlop={{top:10, left: 10, right:10, bottom: 10}}
                        onPress={()=>{
                            this.change(buttons.left.title)
                            //this.props.callback(buttons.left.action())
                        }}
                    >
                        <Text style={styles.buttonText}>
                            <Icon 
                                name={buttons.left.icon}
                                size={35} 
                                color="#33A454"
                            />
                        </Text>
                        <Text style={styles.buttonText}>{buttons.left.title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        hitSlop={{top:10, left: 10, right:10, bottom: 10}}
                        onPress={()=>{
                            this.change(buttons.right.title)
                        }}
                    >
                        <Text style={styles.buttonText}>
                            <Icon 
                                name={buttons.right.icon}
                                size={35} 
                                color="#33A454"
                            />
                        </Text>
                        <Text style={styles.buttonText}>{buttons.right.title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: "#fff",
        width: "100%"
    },
    buttonText:{
        textAlign:"center",
        color:"#33A454",
        fontSize: 20
    },
    inputs:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 15,
        marginHorizontal: 25
    },
    lightText:{
        textAlign:"center",
        color:"lightgrey",
        fontSize: 12
    }
});