import React from 'react';
import { StyleSheet, Text, View, FlatList, Modal,TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import { setSearch, fetchEntries} from "../Actions/actions.js";

import EntryItem from "../component/EntryItem";
import Header from "../component/Header"
import Toolbar from "../component/Toolbar"
import EntryModal from "../component/EntryModal"
import {getEntryTime} from "../util"


class Entries extends React.Component {
  
    constructor(props){
        super(props)
        this.state = {
            show: false,
            clock:{
                duration: "0.00",
                intervalId: null
            },
            break:{
                duration: "0.00",
                intervalId: null
            }
        }
        this.setTimerClock = this.setTimerClock.bind(this)
        this.setTimerBreak = this.setTimerBreak.bind(this)
        
    }
    async  componentWillMount(){
        this.props.dispatch( await fetchEntries(this.props.job._id))
    }
    componentDidUpdate(){
        this.setTimerClock(this.props.clockIn)
        this.setTimerBreak(this.props.break==null?null:this.props.break.start)
    }
    setTimerClock(time){
        if(time != null && this.state.clock.intervalId == null){
            let id = setInterval(
                ()=>{
                    let d = getEntryTime({start:time, end: new Date()}).toFixed(2)
                    this.setState({clock: {...this.state.clock, duration: d}})
                    console.log("CLOCK=====>", d)
                }, 
                1000*60*3)
            this.setState({clock:{...this.state.clock, intervalId: id}})
        }
        else if(time == null && this.state.clock.intervalId != null){
            clearInterval(this.state.clock.intervalId)
            this.setState({clock:{intervalId: null, duration: "0.00"}})
        }
    }
    setTimerBreak(time){
        if(time != null && this.state.break.intervalId == null){
            let id = setInterval(
                ()=>{
                    let d = getEntryTime({start:time, end: new Date()}).toFixed(2)
                    this.setState({break: {...this.state.break, duration: d}})
                    console.log("Break=====>", d)
                }, 
                1000*60*3)
            this.setState({break:{...this.state.break, intervalId: id}})
        }
        else if(time == null && this.state.break.intervalId != null){
            clearInterval(this.state.break.intervalId)
            this.setState({break:{intervalId: null, duration: "0.00"}})
        }
    }
    getDuration(){
        let duration = 0.00;
        if(this.props.clockIn != null){
            if(this.props.break != null){
                duration = this.state.break.duration
            }
            else{
                duration = this.state.clock.duration
            }
        }
        else if(this.props.entries != null){
            duration = this.props.entries.reduce(
                (a, c)=>{return a+=getEntryTime(c)}
                , 0).toFixed(2)
        }

        return (<Text style={styles.duration}>{duration}h</Text>)
    }

    render() {
        const job = this.props.job //!= null? this.props.job : {title: "Tasks", position:"", rate: 0, jobId: 0}
        console.log("====>>", job)
        return (
            <View style={styles.container}>
                <Header 
                    title={job.title} 
                    bottom={0} 
                    setSearch={(t)=>{this.props.dispatch(setSearch(t))}}
                    titleVert={25}
                >
                    {this.getDuration()}
                </Header>
                <Toolbar 
                        buttons={this.props.timeState} 
                        callback={(a)=>{this.props.dispatch(a)}}
                        job={job}
                        start={this.props.clockIn}
                        new={()=>{this.setState({show: true})}}
                />
                <FlatList
                    contentContainerStyle={{ marginTop: 15}}
                    style={styles.list}
                    data={this.props.entries}
                    renderItem={(item)=>{return <EntryItem entry={item.item} job={job} dispatch={(a)=>this.props.dispatch(a)} />}}
                    keyExtractor={(item, index) => index+""}
                />

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.show}
                >
                    <TouchableOpacity style={styles.center} onPress={()=>{this.setState({show: false})}}  activeOpacity={1} >
                        <EntryModal  
                            job={job} 
                            entry={{start:null, end: null}}
                            dispatch={(a)=>this.props.dispatch(a)} 
                            close={()=>this.setState({show:false})}/>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  list:{
    width: "100%",
    position: 'relative',
    backgroundColor:"#F4F4F4",
    
  },
  duration:{
      fontSize: 16,
      color: "white",
      position: "relative",
      top: -20,
      fontWeight: "600"
  }

});

const connEntries = (state)=>{
    return {
        jobs: state.jobs,
        search: state.search,
        entries: state.entries,
        timeState: state.timeState,
        clockIn: state.clockIn,
        break: state.break
    }
}

export default connect(connEntries)(Entries)