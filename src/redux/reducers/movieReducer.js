import {
    FETCHING_MOVIES_REQUEST,
    FETCHING_MOVIES_SUCCESS,
    FETCHING_MOVIES_FALIURE,
    FETCHING_FILTER_MOVIES
} from '../actions/types';


const initialState = {
    isFetching: false,
    errorMessage: '',
    movies: [], 
    query: ''
};

const movieReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCHING_MOVIES_REQUEST:
            return { ...state, isFetching: true };
        case FETCHING_MOVIES_FALIURE:
            return { ...state, isFetching: false, errorMessage: action.payload };
        case FETCHING_MOVIES_SUCCESS:
            return { ...state, isFetching: false, movies: action.payload };
        case FETCHING_FILTER_MOVIES:
            return { ...state, isFetching: false, movies: action.payload, searchQuery: action.searchQuery};
        default:
            return state;
    }

}

export default movieReducer;