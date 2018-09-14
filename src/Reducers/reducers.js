import {clockIn} from "../Actions/actions"
export const defaultState = {
    timeState: {
        left:{
            icon: "clock-o",
            title: "Start",
            action: clockIn
        },
        right:{
            icon: "plus",
            title: "New"
        }
    },
    jobs:null,
    job:null,
    search: "",
    entries: null,
    clockIn:null,
    break:null
}
export const HomeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCHED_JOBS':
            return { ...state, jobs: action.payload.jobs };
        case 'SET_SEARCH':
            return {...state, search: action.payload.search}
        case 'SET_JOB':
            return {...state, job: action.payload.job}
        case 'FETCHED_ENTRIES':
            return {...state, entries: action.payload.entries}
        case "CHANGED_STATE":
            return {...state, timeState: action.payload}
        case "CLOCK_IN":
            return {...state, clockIn: action.payload}
        case "CLOCK_OUT":
            return {...state, clockIn: null}
        case "ON_BREAK":
            return {...state, break: action.payload}
        case "OFF_BREAK":
            return {...state, break: null}
        default:
            return state;
    }
};

