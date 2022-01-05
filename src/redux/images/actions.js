import { FETCH_IMAGES_REQUEST, FETCH_IMAGES_ERROR, GET_IMAGES_SUCCESS } from "./types";

export const fetchImagesRequest = () => {
  return {
    type: FETCH_IMAGES_REQUEST
  }
}

export const fetchImagesError = (error) => {
  return {
    type: FETCH_IMAGES_ERROR,
    error
  }
}

export const getImagesSuccess = (images) => {
  return {
    type: GET_IMAGES_SUCCESS,
    images
  }
}