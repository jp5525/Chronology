import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-swipeable';
import JobModal from "./JobModal";
import {removeJob} from "../Actions/actions"


export default class JobItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        show: false
    }
  }

  
  render() {
    const j = this.props.job;
    
    return (
      
        <Swipeable 
          leftActionActivationDistance={200}
          leftContent={(<View></View>)} 
          onLeftActionRelease={async()=>{this.props.dispatch(await removeJob(j._id))}}>
      <View>
        <TouchableOpacity onPress={()=>{j.callback()}}>
          <View style={styles.container}>
            
            <View>
                <Text style={styles.text}>{j.title}</Text>
                <Text style={styles.ligthText}>{j.position}</Text>
            </View>
            
            <View style={styles.rate}>
                <Text style={styles.ligthText}>${j.rate}</Text>
            </View>
            
            <View style={styles.options}>
              <TouchableOpacity 
                hitSlop={{top:10, left: 10, right:10, bottom: 10}}
                onPress={()=>{this.setState({show: true})}}  
              >
                <Text style={styles.txt} >
                    <Icon 
                        name="ellipsis-v"
                        size={20} 
                        color="#D8D8D8"
                    />
                </Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </TouchableOpacity>
        
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.show}
        >
          <TouchableOpacity style={styles.center} onPress={()=>{this.setState({show: false})}}  activeOpacity={1} >
            <JobModal 
              job={this.props.job} 
              dispatch={this.props.dispatch}
              close={()=>this.setState({show: false})}/>
          </TouchableOpacity>
        </Modal>
      </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    margin: 5,
    backgroundColor: "white",
    height: 110,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    minWidth: 300
  },
  center:{
    flex: 1, 
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    backgroundColor: "rgba(0,0,0,.6)"
  },
  rate:{
    position: "absolute",
    right: 10,
    bottom: 10
  },
  options:{
    position: "absolute",
    right: 10,
    top: 10
  },
  text:{
    fontWeight: "600",
    fontSize: 25
  },
  ligthText:{
    color: "#6C6969"
  }
});