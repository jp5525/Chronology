import { createStore, applyMiddleware } from 'redux';
import {HomeReducer, defaultState} from "./Reducers/reducers";


import {removeJobs, removeEntries, allEntry} from "./Actions/actions"


async function test (){console.log( await allEntry())}
test()
export default createStore(HomeReducer);