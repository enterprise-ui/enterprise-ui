import 'isomorphic-fetch';

import {call, put, takeEvery} from 'redux-saga/effects';

import config from '../config';

import {FETCH_ARTICLES_BEGIN, FETCH_ARTICLES_FAILURE, FETCH_ARTICLES_SUCCESS} from './consts';

export const fetchArticles = (source: string) => {
    let url;

    if (source) {
        url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${config.apikey}`;
    } else {
        url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apikey}`;
    }

    return fetch(url).then((response) => response.json().then((json) => json));
};

function* getArticles(action: any) {
    try {
        const data = yield call(fetchArticles, action.payload);

        yield put({type: FETCH_ARTICLES_SUCCESS, payload: data.articles});
    } catch (e) {
        yield put({type: FETCH_ARTICLES_FAILURE, payload: e});
    }
}

function* rootSaga() {
    yield takeEvery(FETCH_ARTICLES_BEGIN, getArticles);
}

console.log('Saga is initialized');

export {rootSaga};
