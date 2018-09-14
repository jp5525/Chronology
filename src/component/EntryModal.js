import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import {newEntry, updateEntry,fetchEntries} from "../Actions/actions"
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment"
import Tags from "react-native-tags";


export default class EntryModal extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        text:"",
        tags: this.props.entry.tags,
        start: new Date(this.props.entry.start),
        end: new Date(this.props.entry.end),
        showStart: false,
        showEnd: false
      }
    }

    showDateTimePicker = () => this.setState({ show: true });
    hideDateTimePicker = () => this.setState({ show: false });
    handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({start: date})
        this.hideDateTimePicker();
      };
  
    render() {
        console.log("MODAL===>", this.props.job)
        return(
            <TouchableWithoutFeedback style={styles.innerModal}>
                <View style={styles.innerModal}>
                  
                  <View style={styles.frmRow}>
                    <TouchableOpacity onPress={()=>this.setState({showStart: true})} style={[styles.frmStartEnd, {marginRight: 10}]}>
                        <View style={styles.frmText} >
                            <Text style={styles.frmTitle}>Start</Text>
                            <DateTimePicker
                                isVisible={this.state.showStart}
                                onConfirm={(d)=>{
                                    this.setState({start: d})
                                    this.setState({showStart: false})
                                }}
                                
                                onCancel={()=>this.setState({showStart: false})}
                                mode="datetime"
                                //date={this.state.start == null? Date().now : this.state.start}
                            />
                            <Text style={styles.frmInput}>{this.state.start == null? "start time" : moment(this.state.start).format("MMM Do - hh:mm")}</Text>
                        </View>
                    </TouchableOpacity >

                    <TouchableOpacity onPress={()=>this.setState({showEnd: true})} style={styles.frmStartEnd}>
                        <View style={styles.frmText} >
                            <Text style={styles.frmTitle}>End</Text>
                            <DateTimePicker
                                isVisible={this.state.showEnd}
                                onConfirm={(d)=>{
                                    this.setState({end: d})
                                    this.setState({showEnd: false})
                                }}
                                onCancel={()=>this.setState({showEnd: false})}
                                mode="datetime"
                                //date={this.state.end == null? Date().now : this.state.end}
                            />
                            <Text style={styles.frmInput}>{this.state.end == null? "end time" : moment(this.state.end).format("MMM Do - hh:mm")}</Text>
                        </View>
                    </TouchableOpacity >
                  </View>
                
                <View style={[styles.frmText, styles.frmInput]} >
                    <Text style={styles.frmTitle}>Tags</Text>
                            
                    <Tags
                        initialTags={this.state.tags}
                        onChangeTags={tags => this.setState({tags: tags})}
                        onTagPress={(index, tagLabel, event, deleted) =>
                            console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                        }
                        inputStyle={{ backgroundColor: "white" }}
                    />
                </View>
                  
                <TouchableOpacity 
                    title="Done" 
                    onPress={async ()=>{
                        let e = {
                            _id: this.props.entry._id,
                            start: this.state.start,
                            end: this.state.end,
                            tags: this.state.tags,
                            jobId: this.props.job._id
                        }
                        
                        let f = this.props.entry.start == null? newEntry: updateEntry;
                        f(e)

                        this.props.dispatch(await fetchEntries(this.props.job._id))
                        this.props.close()
                    }}>
                    <View style={styles.frmDone}>
                        <Text style={{color: "white", textAlign:"center"}}>Done</Text>
                    </View>
                </TouchableOpacity >

                </View>
              </TouchableWithoutFeedback>
        )
            
    }
}

const styles = StyleSheet.create({
  innerModal:{
    backgroundColor: "white", 
    marginHorizontal: 5, 
    borderRadius: 5,
    padding: 10
  },
  modalHeader:{
    backgroundColor: "#3CA34D", 
    flexDirection: "row",
    justifyContent: 'space-between',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
  modalTitle:{
    color: "white",
    fontSize: 28,
    fontWeight: "600",
    padding:30
  },
  frmText:{
    marginTop: 15,
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingTop: 25,
    paddingLeft: 10,
    borderRadius: 3
  },
  frmTitle:{
    position:"absolute",
    top: 5,
    left: 10,
    color: "#3CA34D",
    fontWeight: "400"
  },
  frmInput:{
    marginBottom: 10
  },
  frmRow:{
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10
  },
  frmStartEnd:{
    flex:1
  },
  frmPos:{
    flex: 6,
    marginRight: 15,
    justifyContent: "flex-end"
  },
  frmRate:{
    flex:2,
    justifyContent: "flex-end"
  },
  frmTextIcon:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  smallFrmText:{
   fontSize: 8
  },
  frmDone:{
    width: "100%",
    backgroundColor: "#3CA34D",
    marginBottom: 10,
    padding: 15,
    borderRadius: 5
  }
});