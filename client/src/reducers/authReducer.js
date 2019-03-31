import { SIGN_IN, SIGN_OUT } from '../actions/types';

<<<<<<< HEAD

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null }
=======
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN: 
            return {...state, isSignedIn: true, userId : action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null}
>>>>>>> StreamReducer
        default:
            return state;
    };
};