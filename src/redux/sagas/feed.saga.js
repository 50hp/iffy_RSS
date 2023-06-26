import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchFeed(action) {
    try{
        let results = axios.get(`/${action.payload}`);        
        yield put({type:"SET_FEED", action:results});
    }
    catch {
        console.log('Error with fetching feed:', error);
    }
}


function* feedSaga() {
    yield takeLatest("FETCH_FEED", fetchFeed);

}

export default feedSaga;







