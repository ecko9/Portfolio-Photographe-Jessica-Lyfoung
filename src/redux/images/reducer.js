import { FETCH_IMAGES_REQUEST, FETCH_IMAGES_ERROR, GET_GALLERY_SUCCESS } from "./types";

const initialState = {
  loading: false,
  error: '',
  galleries: [
    {
      name: "Portraits et Personnes",
      description: "test description 1",
      images: []
    },
    {
      name: "Paysages et Nature",
      description: "test description 2",
      images: []
    },
    {
      name: "Photos Insolites",
      description: "test description 3",
      images: []
    }
  ]
}

const storeAGallery = (state, name, images) => {
  let galleriesTmp = state.galleries.map(gallery => {
    if (gallery.name.toLowerCase() === name.split("-").join(" "))
      gallery.images = images
    return gallery;
  })

  return {
    ...state,
    loading: false,
    galleries: galleriesTmp
  };
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

    case GET_GALLERY_SUCCESS:
      storeAGallery(state, action.name, action.images);

    default:
      return state;
  }
}

export default imagesReducer;