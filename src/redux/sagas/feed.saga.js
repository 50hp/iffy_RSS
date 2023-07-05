import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchFeed() {
    try{
        const results = yield axios.get(`/api/rss/1`);
        console.log(results.data);
        yield put({type:"SET_FEED", payload: results.data});
    }
    catch {
        console.log('Error with fetching feed:');
    }
}

function* setRead(action) {
    try {
        yield axios.put(`/api/rss/read/${action.payload.id}`, {state: action.payload.state})
        console.log('success');
    }
    catch {
        console.log('error with updating read');
    }
} 

function* setSave(action) {
    try {
        yield axios.post(`/api/saves`, action.payload);
        console.log('success');
    }
    catch {
        console.log('error with updating save');
    }
}
function* fetchSaves() {
    console.log('in fetchSaves');
    try{
        const results = yield axios.get(`/api/saves`);
        console.log(results.data);
        yield put({type:"SET_SAVES", payload: results.data});
    }
    catch {
        console.log('Error with fetching feed:');
    }
}

function* setSaveRead(action) {
    console.log(action); 
    try {
        yield axios.put(`/api/saves/${action.payload.id}`, {state:action.payload.state});
    }
    catch {
        console.log('Error with archive mark read post');
    }
}

function* unSave(action) {

    try {
        yield axios.delete(`/api/saves/${action.payload}`);
        yield put({type:'FETCH_SAVES'});
    }
    catch {
        console.log('error with deleting saved post');
    }



}




function* feedSaga() {
    yield takeLatest("FETCH_FEED", fetchFeed);
    yield takeLatest("SET_READ", setRead);
    yield takeLatest("SET_SREAD", setSaveRead);
    yield takeLatest("SET_SAVE", setSave);
    yield takeLatest("FETCH_SAVES", fetchSaves);
    yield takeLatest("UNSAVE", unSave);
}

export default feedSaga;







