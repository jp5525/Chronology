import React from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import {connect} from "react-redux";
import {fetchJobs, setSearch, setJob, newJob} from "../Actions/actions.js";

import JobItem from "../component/JobItem.js";
import Header from "../component/Header"
import Button from "../component/Button"
import JobModal from "../component/JobModal"


class Home extends React.Component {
  
    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: false,
            headerTintColor:'white',
            headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                height: 0,
                //marginTop: -20,
                backgroundColor: "#2CA550"
            }
        
        }
    }
    async componentWillMount(){
        let action =  await fetchJobs()
        this.props.dispatch(action)
    }
    render() {
        const { navigate } = this.props.navigation;
        let jobs = (this.props.jobs != null) && (this.props.search != null)?  
            this.props.jobs.filter((j) =>{return j.title.startsWith(this.props.search)==true})
            .map(m => {
                m.callback = ()=>{
                    this.props.dispatch(setJob(m));
                    navigate("Entries")}; 
                return m;
            }) 
            : null;

        
        return (
            <View style={styles.container}>
                {/* The Header*/}
                <Header title="Jobs" bottom={35}>
                    <TextInput 
                        style={styles.search} 
                        onChangeText={(t)=>{this.props.dispatch(setSearch(t))}}    
                    />
                    <Button
                        onPress={()=>{
                            this.setState({show: true})
                        }}
                        icon="plus"
                        size={45}
                    />
                </Header>

                {/* Jobs List*/}
                <FlatList
                    style={styles.list}
                    data={jobs}
                    renderItem={(item)=>{return <JobItem job={item.item} dispatch={(a)=>{this.props.dispatch(a);}} />}}
                    keyExtractor={(item, index) => index+""}
                />

                {/* New Job Modal*/}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.show}
                >
                    <TouchableOpacity style={styles.center} onPress={()=>{this.setState({show: false})}}  activeOpacity={1} >
                        <JobModal job={{title: "", position:"", rate: 0}} 
                                  close={()=>{this.setState({show: false})}}
                                  dispatch={(a)=>{this.props.dispatch(a)}}
                        />
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
    top: -27,
  },
  search:{
    backgroundColor: "rgba(255,255,255, .35)",
    height: 32,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    width: "80%"
},

});

const connHome = (state)=>{
    return {
        jobs: state.jobs,
        search: state.search,
        job: state.job
    }
}

export default connect(connHome)(Home)