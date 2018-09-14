import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import moment from 'moment'
import EntryModal from "../component/EntryModal"
import Swipeable from 'react-native-swipeable';
import {removeEntry, fetchEntries} from "../Actions/actions"
import {get12Hour, getEntryTime} from "../util";

export default class EntryItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        show: false
    }
  }

  
  render() {
    const e = this.props.entry;
    const j = this.props.job;
    
    return (
      <Swipeable 
          leftActionActivationDistance={200}
          leftContent={(<View></View>)} 
          onLeftActionRelease={async()=>{
            removeEntry(e);
            this.props.dispatch(await fetchEntries(e.jobId))
          }}
      >
      <View>
        <TouchableOpacity onPress={()=>this.setState({show:true})}>
          <View style={styles.container}>
            
            <View>
                <Text style={styles.text}>{moment(e.start).format("dddd, MMM Do")}</Text>
                <Text style={styles.ligthText}>{get12Hour(moment(e.start))} - {get12Hour(moment(e.end))}</Text>
                <View style={styles.tags}>
                  {e.tags.map((t, i)=>(<View key={i} style={{borderRadius: 10}}><Text style={styles.tag}>{t.length > 5? (((t).substring(0,5-3)) + '...') : t}</Text></View>)).slice(0, 8)}
                </View>
            </View>
            
            <View style={styles.rate}>
                {j.rate == 0? null : <Text style={styles.ligthText}>${(j.rate*getEntryTime(e)).toFixed(2)}</Text>}
                <Text style={styles.ligthText}>{getEntryTime(e).toFixed(2)}h</Text>
            </View>
            
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.show}
          >
            <TouchableOpacity style={styles.center} onPress={()=>{this.setState({show: false})}}  activeOpacity={1} >
                <EntryModal  job={this.props.job}
                             entry={e} 
                             dispatch={(a)=>this.props.dispatch(a)} 
                             close={()=>this.setState({show:false})}/>
            </TouchableOpacity>
          </Modal>
        </TouchableOpacity>
        
      </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  tags:{
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
    width: "85%"
  },
  tag:{
    borderRadius: 100,
    backgroundColor: "#DDDDDD",
    padding: 3,
    color: "#808080",
    width: 50,
    textAlign: "center",
    margin: 1
  },
  container: {
    marginHorizontal: 15,
    margin: 5,
    backgroundColor: "white",
    height: 110,
    borderRadius: 10,
    padding: 10,
    //paddingBottom: 50,
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
    fontWeight: "300",
    fontSize: 25
  },
  ligthText:{
    color: "#6C6969"
  }
});