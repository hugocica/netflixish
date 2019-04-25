import {
    FETCH_SHOWS,
    REQUEST_LOADING_SHOWS,
    REQUEST_REJECTED_SHOWS
} from '../actions/shows/action';

const INITIAL_STATE = {
    showInfos: [],
    fetchingShow: false,
    fetched: false,
    error: null,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_LOADING_SHOWS:
            return {
                ...state,
                fetchingShow: true,
                fetched: INITIAL_STATE.fetched
            };
        case REQUEST_REJECTED_SHOWS:
            return {
                ...state,
                fetchingShow: INITIAL_STATE.fetching,
                fetched: INITIAL_STATE.fetched,
                error: action.payload
            };
        case FETCH_SHOWS:
            return {
                ...state,
                showInfos: action.payload,
                fetchingShow: INITIAL_STATE.fetching,
                fetched: true
            };
        default:
            return state;
    }
}
