import { FETCH_IMAGES_REQUEST, FETCH_IMAGES_ERROR, GET_GALLERY_SUCCESS } from "./types";

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

export const getGallerySuccess = (images, name) => {
  return {
    type: GET_GALLERY_SUCCESS,
    images,
    name
  }
}