import {combineReducers} from 'redux';

import {reducer} from './reducer';

const reducers = combineReducers({
    articles: reducer,
});

console.log('Reducers is initialized');

export {reducers};
