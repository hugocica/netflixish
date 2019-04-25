import {
    FETCH_SHOWS,
    REQUEST_LOADING_SHOWS,
    REQUEST_REJECTED_SHOWS
} from './action';
import axios from '../../utils/axios';

export function requestShows(_query, _page = 1) {
    return dispatch => {
        dispatch(requestLoading());

        return axios
            .get('tv-shows/SHOW123.json')
            .then(response => dispatch(fetchShows(response.data)))
            .catch(error => dispatch(requestRejected(error.message)));
    }
}

export function requestLoading() {
    return {
        type: REQUEST_LOADING_SHOWS
    };
}

export function requestRejected(response) {
    return {
        type: REQUEST_REJECTED_SHOWS,
        payload: response
    };
}

function fetchShows(response) {
    return {
        type: FETCH_SHOWS,
        payload: response
    };
}
