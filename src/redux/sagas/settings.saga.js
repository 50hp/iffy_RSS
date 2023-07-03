import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchSettings() {
    console.log('infetchsettings');
    try {
        const results = yield axios.get('/api/settings/sources');
        console.log(results.data);
        yield put({type:"SET_SETTINGS", payload: {sources: results.data}});
    
    }

    catch {
        console.log('error with fetching settings');
    }
}

function* postSettings(action) {
    console.log('inpoostsettings');
    console.log(action);
    try {
        yield axios.post('/api/settings', action.payload);
        console.log('success');
    }

    catch {
        console.log('error with fetching settings');
    }
}

function* sourceDelete(action) {
    console.log('insourcedelete');
    console.log(action);
    try {
        yield axios.delete(`/api/rss/${action.payload}`);
        console.log('success');
    }

    catch {
        console.log('error with deleting source');
    }
}

function* sourceMute(action) {
    console.log('insourceMute');
    console.log(action);
    try {
        yield axios.put(`/api/settings/${action.payload.rss_id}`, action.payload);
        console.log('success');
    }

    catch {
        console.log('error with muting source');
    }
}


function* settingsSaga() {
    yield takeLatest('FETCH_SETTINGS', fetchSettings);
    yield takeLatest("POST_SOURCE", postSettings);
    yield takeLatest("DELETE_SOURCE", sourceDelete);
    yield takeLatest("MUTE_SOURCE", sourceMute);
    
}

export default settingsSaga;
