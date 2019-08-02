import { FETCHING_MOVIES_REQUEST,
         FETCHING_MOVIES_SUCCESS,
         FETCHING_MOVIES_FALIURE,
         FETCHING_FILTER_MOVIES } from './types';

export const fetchingMovieRequest = () => ({ type: FETCHING_MOVIES_REQUEST });

export const fetchingMovieSuccess = json => ({
    type: FETCHING_MOVIES_SUCCESS,
    payload: json
});

export const fetchingMovieFaliure = error => ({
    type: FETCHING_MOVIES_FALIURE,
    payload: error
});

export const fetchingFilterMovies = (json, query) => ({
    type: FETCHING_FILTER_MOVIES,
    payload:json,
    searchQuery: query
});

let movies = [] ;
export const fetchMovies = () => {
    return async dispatch => {
        dispatch(fetchingMovieRequest());
        try {
            let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=55957fcf3ba81b137f8fc01ac5a31fb5&language=en-US&page=undefined');
            let json = await response.json();
            movies = await json.results ;
            dispatch(fetchingMovieSuccess(json.results));
        } catch (error) {
            dispatch(fetchingMovieFaliure(error));
        }

    }
}

export const updateSearch = search => {
        const newData = movies.filter(item => {
            const itemData = `${item.title.toUpperCase()} ${item.original_title.toUpperCase()}`;
            const textData = search.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
      
          return async dispatch => {
              dispatch(fetchingFilterMovies(newData, search));
          }
  };
