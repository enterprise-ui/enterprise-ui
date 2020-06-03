import {FETCH_ARTICLES_SUCCESS} from '../consts';

const reducer = (state = [], action: any) => {
    switch (action.type) {
        case FETCH_ARTICLES_SUCCESS:
            return action.payload;

        default:
            return state;
    }
};

export {reducer};
