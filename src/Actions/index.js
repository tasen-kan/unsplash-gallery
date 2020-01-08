import APImanager from '../APImanager';
import {
    GET_PHOTOS,
    GET_PHOTO,
    GET_LIKED_PHOTOS,
    GET_SEARCHED_PHOTOS,
    GET_RELATIVE_PHOTOS,
    ADD_TO_HISTORY
} from "./ActionTypes";

export const actionGetPhotos = (payload, handle) => {

    return (getPhotos) => {
        APImanager.getPhotos(payload, (response) =>{
            getPhotos({
                type: GET_PHOTOS,
                payload: response.data
            })
            handle(response.data)
        })
    }
}

export const actionGetPhoto = (payload, handle) => {

    return (getPhoto) => {
        APImanager.getPhoto(payload, (response) =>{
            getPhoto({
                type: GET_PHOTO,
                payload: response.data
            })
            handle(response.data)
        })
    }
}

export const actionGetSearchedPhotos = (payload, handle) => {

    return (getSearchedPhotos) => {
        APImanager.searchPhoto(payload, (response) =>{
            getSearchedPhotos({
                type: GET_SEARCHED_PHOTOS,
                payload: response.data
            })
            handle(response.data)
        })
    }
}

export const actionGetRelativePhotos = (payload, handle) => {

    return (getSearchedPhotos) => {
        APImanager.getRelativePhotos(payload, (response) =>{
            getSearchedPhotos({
                type: GET_RELATIVE_PHOTOS,
                payload: response.data
            })
            handle(response.data)
        })
    }
}

export const actionGetLikedPhotos = (payload, handle) => {

    return (getLikedPhoto) => {
        APImanager.getLikedPhotos(payload, (response) =>{
            getLikedPhoto({
                type: GET_LIKED_PHOTOS,
                payload: response
            })
            handle(response)
        })
    }
}

export const actionLikePhoto = (payload) => {
    APImanager.likePhoto(payload, () => {})
}

export const actionUnlikePhoto = (payload) => {
    APImanager.unLikePhoto(payload, () => {})
}

export const actionAddToHistory = (payload, handle) => {

    return (addToHistory) => {
        addToHistory({
            type: ADD_TO_HISTORY,
            payload: payload.query
        })
    }
}
