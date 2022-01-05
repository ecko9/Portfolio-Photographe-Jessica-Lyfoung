import { FETCH_IMAGES_REQUEST, FETCH_IMAGES_ERROR, GET_IMAGES_SUCCESS } from "./types";

const initialState = {
  loading: false,
  error: '',
  images: []
}

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_IMAGES_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_IMAGES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case GET_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.images
      };

    default:
      return state;
  }
}

export default imagesReducer;