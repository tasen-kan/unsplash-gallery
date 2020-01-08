import {
    ADD_TO_HISTORY
} from "../Actions/ActionTypes"

export function addToHistory(state = [], action) {

    switch (action.type) {
        case ADD_TO_HISTORY:
            return {
                ...state,
                history: action.payload
            };
        default:
            return state;
    }
}
