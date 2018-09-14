import React from 'react';

export function get12Hour(d){
    let suffix = "am";
    let hour = d.hours();
    
    if(hour > 12){
        suffix = "pm";
        hour = hour - 12;
    }
    else if(hour>11)
        suffix = "pm"
    
        let min = d.minutes();
        min = min < 10? "0"+min : min; 
        return `${hour}:${min}${suffix}`;
}

export function getEntryTime (entry){
   
    const e = new Date(entry.end).getTime();
    const s = new Date(entry.start).getTime();
    return (((e-s)) / 36e5)
}

export function hocSmallNavHeader(WrappedComponent){
    return class extends React.Component {
        static navigationOptions = ({ navigation }) => {
            return {
                headerTransparent: false,
                headerTintColor:'white',
                headerStyle: {
                    borderBottomWidth: 0,
                    elevation: 0,
                    backgroundColor: "#16B09E",
                    marginLeft: 5,
                    height: 0,
                    backgroundColor: "#2CA550"
                }
            
            }
        }
        render(){
            return (<WrappedComponent />)
        }
    }
}