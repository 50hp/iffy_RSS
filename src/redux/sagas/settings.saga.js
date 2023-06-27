import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchSettings(){
    console.log('infetchsettings');
    try {
        const results = yield axios.get('/api/settings/sources');
        console.log(results.data);
        yield put({type:"SET_SETTINGS", payload: results.data});
    
    }

    catch {
        console.log('error with fetching settings');
    }
}








function* settingsSaga() {
    yield takeLatest('FETCH_SETTINGS', fetchSettings);



}

export default settingsSaga;
