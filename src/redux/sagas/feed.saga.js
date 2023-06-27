import { put, takeLatest } from 'redux-saga/effects';
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


function* feedSaga() {
    yield takeLatest("FETCH_FEED", fetchFeed);

}

export default feedSaga;







