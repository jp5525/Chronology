import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";

import {hocSmallNavHeader} from "../util"
import Home from '../Home/Home';
import Entries from '../Entries/Entries';

const connHomeEntries = (state)=>{
    return {
        job: state.job,
    }
}
let homeEntries =  hocSmallNavHeader(connect(connHomeEntries)((props)=>(<Entries job={props.job} />)))
 const home = createStackNavigator(
    {
        Home:Home,
        Entries: homeEntries
        
    }
)

const tasks = createStackNavigator(
    {
        Entries: hocSmallNavHeader(()=>(<Entries job={{title: "Tasks", position:"", rate: 0, _id: 0}} />))
    }
)

let bar = createBottomTabNavigator(
    {
        Home:home,
        Misc: tasks,
        //Report: Home
    },
    {   swipeEnabled:true,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
              iconName = "home";
            } 
            else if (routeName === 'Misc') {
              iconName = "list-ul"
            }
            else if (routeName === 'Report') {
                iconName = "bar-chart"
            }
            return <Icon name={iconName} size={30} color={tintColor} />;
          },
          swipeEnabled:true
        }),
        tabBarOptions: {
          activeTintColor: '#2CA550',
          inactiveTintColor: 'gray',
        }
    }
)

const connNav = (state)=>{
    return{job: state.job}
}
export default connect(connNav)(bar)