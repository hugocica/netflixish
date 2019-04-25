import {
    FETCH_EPISODES,
    REQUEST_LOADING_EPISODES,
    REQUEST_REJECTED_EPISODES
} from '../actions/episodes/action';

const INITIAL_STATE = {
    episodesInfos: [],
    fetchingEpisodes: false,
    fetched: false,
    error: null,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_LOADING_EPISODES:
            return {
                ...state,
                fetchingEpisodes: true,
                fetched: INITIAL_STATE.fetched
            };
        case REQUEST_REJECTED_EPISODES:
            return {
                ...state,
                fetchingEpisodes: INITIAL_STATE.fetching,
                fetched: INITIAL_STATE.fetched,
                error: action.payload
            };
        case FETCH_EPISODES:
            return {
                ...state,
                episodesInfos: action.payload,
                fetchingEpisodes: INITIAL_STATE.fetching,
                fetched: true
            };
        default:
            return state;
    }
}
