import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchFeed() {
    try{
        const results = yield axios.get(`/api/rss`);
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
        yield axios.post(`/api/rss/save`, action.payload);
        console.log('success');
    }
    catch {
        console.log('error with updating save');
    }
}
function* fetchSaves() {
    console.log('in fetchSaves');
    try{
        const results = yield axios.get(`/api/rss/saves`);
        console.log(results.data);
        yield put({type:"SET_SAVES", payload: results.data});
    }
    catch {
        console.log('Error with fetching feed:');
    }
}
function* feedSaga() {
    yield takeLatest("FETCH_FEED", fetchFeed);
    yield takeLatest("SET_READ", setRead);
    yield takeLatest("SET_SAVE", setSave);
    yield takeLatest("FETCH_SAVES", fetchSaves);
}

export default feedSaga;







