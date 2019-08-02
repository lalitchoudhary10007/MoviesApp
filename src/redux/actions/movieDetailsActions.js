import {
    FETCHING_MOVIES_DETAILS_SUCCESS,
    FETCHING_MOVIES_DETAILS_REQUEST,
    FETCHING_MOVIES_DETAILS_FALIURE,
} from './types';

export const getMovieDetailsRequest = () => ({ type: FETCHING_MOVIES_DETAILS_REQUEST });

export const getMovieDetailsSuccess = json => ({
    type: FETCHING_MOVIES_DETAILS_SUCCESS,
    payload: json
});

export const getMovieDetailsFaliure = error => ({
    type: FETCHING_MOVIES_DETAILS_FALIURE,
    payload: error
});


export const fetchMovieDetails = (id) => {
    return async dispatch => {
        dispatch(getMovieDetailsRequest());
        try {
            let url = await 'https://api.themoviedb.org/3/movie/' + id + '?api_key=55957fcf3ba81b137f8fc01ac5a31fb5';
            let response = await fetch(url);
            let json = await response.json();
            dispatch(getMovieDetailsSuccess(json));
        } catch (error) {
            dispatch(getMovieDetailsFaliure(error));
        }

    }
}


