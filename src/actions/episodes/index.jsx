import {
    FETCH_EPISODES,
    REQUEST_LOADING_EPISODES,
    REQUEST_REJECTED_EPISODES
} from './action';
import axios from '../../utils/axios';

export function requestEpisodes(_query, _page = 1) {
    return dispatch => {
        dispatch(requestLoading());

        return axios
            .get('episodes/SHOW123.json')
            .then(response => dispatch(fetchEpisodes(response.data)))
            .catch(error => dispatch(requestRejected(error.message)));
    }
}

export function requestLoading() {
    return {
        type: REQUEST_LOADING_EPISODES
    };
}

export function requestRejected(response) {
    return {
        type: REQUEST_REJECTED_EPISODES,
        payload: response
    };
}

function fetchEpisodes(response) {
    return {
        type: FETCH_EPISODES,
        payload: response
    };
}
