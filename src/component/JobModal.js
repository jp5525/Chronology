import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, TouchableWithoutFeedback } from 'react-native';
import {newJob, updateJob, fetchJobs} from "../Actions/actions"


export default class JobModal extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        title: this.props.job.title,
        position: this.props.job.position,
        rate: this.props.job.rate
      }
    }
  
    render() {
        const job = {title: this.state.title, position: this.state.position, rate: this.state.rate} //== undefined? {title:"",position:"", rate:""}: this.props.job;
        
        return(
            <TouchableWithoutFeedback style={styles.innerModal}>
                <View style={styles.innerModal}>
                  
                  <View style={styles.frmText}>
                    <Text style={styles.frmTitle}>Title</Text>
                    <TextInput 
                          style={styles.frmInput}
                          underlineColorAndroid="rgba(0,0,0,0)"
                          value={job.title}
                          onChangeText={(t)=>{this.setState({title: t})}}
                      />
                  </View>
                  
                  <View style={styles.frmRow}> 
                    <View style={[styles.frmText, styles.frmPos]}>
                      <Text style={styles.frmTitle}>Position</Text>
                      <TextInput 
                          underlineColorAndroid="rgba(0,0,0,0)"
                          style={styles.frmInput}
                          value={job.position}
                          onChangeText={(t)=>{this.setState({position: t})}}
                      />
                    </View>

                    <View style={[styles.frmText, styles.frmRate]}>
                      <Text style={styles.frmTitle}>Rate <Text style={styles.smallFrmText}>per/hour</Text></Text>

                      <View style={styles.frmTextIcon}>
                        <Text style={styles.frmInput}>$</Text>  
                        <TextInput 
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={[styles.frmInput, {width: 60}]}
                            value={job.rate+""}
                            onChangeText={(t)=>{this.setState({rate: t})}}
                        />
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity 
                    title="Done" 
                    onPress={async ()=>{
                      const job = {title: this.state.title, position: this.state.position, rate: this.state.rate, _id: this.props.job._id}
                      let f = this.props.job._id ==undefined? newJob : updateJob
                      f(job)
                      this.props.dispatch( await fetchJobs())
                      this.props.close()
                    }}
                  >
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
    marginBottom: 10,
    
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