import {combineReducers} from 'redux';

import {reducer} from './reducer';

const reducers = combineReducers({
    articles: reducer,
});

export {reducers};
