import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchFeed() {
    console.log('in fetchFeed');
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
    console.log('insetread', action)
    try {
        yield axios.put(`/api/rss/read/${action.payload.id}`, action.payload.state)
        console.log('success');
    }
    catch {
        console.log('error with updating read');
    }
} 

function* setSave(action) {
    console.log('insetsave', action);
    try {
        yield axios.put(`/api/rss/save/${action.payload.id}`, action.payload.state);
        console.log('success');
    }
    catch {
        console.log('error with updating save');
    }
}

function* feedSaga() {
    yield takeLatest("FETCH_FEED", fetchFeed);
    yield takeLatest("SET_READ", setRead);
    yield takeLatest("SET_SAVE", setSave);

}

export default feedSaga;







