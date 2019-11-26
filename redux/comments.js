import * as ActionTypes from './ActionTypes';

export const comments = (
    state = {
        isLoading: true,
        errorMess: null,
        comments:[]
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_COMMENTS:
                return {...state, isLoading: false, errorMess: null, comments: action.payload};
            case ActionTypes.FAILED_FAILED:
                return {...state, isLoading: false, errorMess: action.payload, comments: []};
            case ActionTypes.ADD_COMMENT:
                var comment = action.payload;
                return { ...state, isLoading: false, errorMess: null, comments: state.comments.concat(comment) };
            default:
                return state;
        }
    }
