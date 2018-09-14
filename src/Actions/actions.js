import moment from "moment"

let Datastore = require('react-native-local-mongodb')
let JobsDB  = new Datastore({ filename: 'chronologyJobs', autoload: true });
let EntriesDB  = new Datastore({ filename: 'chronologyEntries', autoload: true });
let BreaksDB  = new Datastore({ filename: 'chronologyBreak', autoload: true });

export function setSearch(s){
    return{
        type: "SET_SEARCH",
        payload: {
            search: s
        }
    }
}
export async function fetchJobs(){
    
    let jobs =  await JobsDB.findAsync({})
    
    return {
        type: 'FETCHED_JOBS',
        payload:{jobs: jobs} 
    }
    
    
}
export function setJob(j){
    return{
        type: "SET_JOB",
        payload: {
            job: j
        }
    }
}
export function removeJobs(){
   JobsDB.remove({}, { multi: true })
}
export async function removeJob(id){
    JobsDB.remove({_id:id})
    EntriesDB.remove({jobId:id}, { multi: true })
    return await fetchJobs()
 }
export  function newJob(j){
     JobsDB.insert(j)
}
export function updateJob(job){
    JobsDB.update({_id:job._id}, job)
}

export function removeEntries(){
    EntriesDB.remove({}, { multi: true })
 }
export function newEntry(entry){
    EntriesDB.insert(entry)
}
export function updateEntry(entry){
    EntriesDB.update({_id: entry._id}, entry)
}
export function removeEntry(entry){
    EntriesDB.remove({_id: entry._id})
}
export async function fetchEntries(jobId){

    let entries =  await EntriesDB.findAsync({jobId:jobId})
    console.log("Entries====>", entries)
    
    return{
        type: "FETCHED_ENTRIES",
        payload: {
            entries:entries
        }
    }
}
export async function allEntry(){
    return await EntriesDB.findAsync({})
}

export function changeState(c){
    let buttons ={
        left:{
            icon: "clock-o",
            title: "Start",
            action: clockIn
        },
        right:{
            icon: "plus",
            title: "New"
        }
    }

    if(c == "Start")
        buttons = {
            left:{
                icon: "coffee",
                title: "Break",
                action: onBreak
            },
            right:{
                icon: "close",
                title: "Stop",
                action: clockOut
            }
        }
    else if(c == "Break")
        buttons = {
            left:{
                icon: "play",
                title: "Resume",
                action: offBreak
            },
            right:{
                icon: "close",
                title: "Stop",
                action: clockOut
            }
        }
    else if(c == "Resume")
        buttons = {
            left:{
                icon: "coffee",
                title: "Break",
                action: onBreak
            },
            right:{
                icon: "close",
                title: "Stop",
                action: clockOut
            }
        }
    
    return{
        type: "CHANGED_STATE",
        payload: buttons
    }
    
}   
export function clockIn(){
    return{
        type: "CLOCK_IN",
        payload: moment().format()
    }
}
export function clockOut(start, job){

    let entry = {
        start: start,
        end: moment().toISOString(),
        jobId: job["_id"]
    }
    EntriesDB.insert(entry)
    return {type:"CLOCK_OUT"}
   
}
export function offBreak(entry, start){
   /* let b = {
        jobId: entry.jobId,
        entryId: entry._id,
        start: start,
        end: moment().toISOString(),
    };
    //BreaksDB.insert(b)*/
    return {type:"OFF_BREAK"}
   
}
export function onBreak(job){
    console.log("BREAK======>", job)
    return {
        type:"ON_BREAK",
        payload:{
            jobId: job["_id"],
            start: moment().format()
        }
    }
   
}