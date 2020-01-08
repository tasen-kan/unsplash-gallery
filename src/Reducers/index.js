import { getPhotos } from "./photos"
import { addToHistory } from "./history"

const initialState = {}

const reducer = (state = initialState, action) => {
    return {
        photos: getPhotos(state, action).photos,
        photo: getPhotos(state, action).photo,
        likedPhotos: getPhotos(state, action).likedPhotos,
        searchedPhotos: getPhotos(state, action).searchedPhotos,
        relativePhotos: getPhotos(state, action).relativePhotos,
        history: addToHistory(state, action).history
    }
}

export default reducer
