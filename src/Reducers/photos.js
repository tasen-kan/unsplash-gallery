import {
    GET_PHOTOS,
    GET_PHOTO,
    GET_LIKED_PHOTOS,
    GET_SEARCHED_PHOTOS,
    GET_RELATIVE_PHOTOS
} from "../Actions/ActionTypes"

export function getPhotos(state = [], action) {

    switch (action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                photos: action.payload
            };
        case GET_PHOTO:
            return {
                ...state,
                photo: action.payload
            };
        case GET_LIKED_PHOTOS:
            return {
                ...state,
                likedPhotos: action.payload
            };
        case GET_SEARCHED_PHOTOS:
            return {
                ...state,
                searchedPhotos: action.payload
            };
        case GET_RELATIVE_PHOTOS:
            return {
                ...state,
                relativePhotos: action.payload
            };
        default:
            return state;
    }
}
