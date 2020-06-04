import {reducers} from './reducers';
import {rootSaga} from './rootSaga';
import {routes} from './routes';

console.log('News is initialized');

export {reducers as reducer, routes, rootSaga as saga};
