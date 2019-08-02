import {
    FETCHING_MOVIES_DETAILS_SUCCESS,
    FETCHING_MOVIES_DETAILS_REQUEST,
    FETCHING_MOVIES_DETAILS_FALIURE,
} from '../actions/types';


const initialState = {
    loading: false,
    errorMessage: '',
    details: {}
};

const movieDetailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCHING_MOVIES_DETAILS_REQUEST:
            return { ...state, loading: true };
        case FETCHING_MOVIES_DETAILS_FALIURE:
            return { ...state, loading: false, errorMessage: action.payload };
        case FETCHING_MOVIES_DETAILS_SUCCESS:
            return { ...state, loading: false, details: action.payload };
        default:
            return state;
    }

}

export default movieDetailsReducer;