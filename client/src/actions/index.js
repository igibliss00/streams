import { SIGN_IN, SIGN_OUT } from './types';
import streams from '../api/streams';

export const signIn = userId => {
    return {
        type: SIGN_IN,
        userId: userId
    };
};

export const signOut = _ => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = formValue => {
    return async dispatch => {
        streams.post('/streams', formValue);
    };
}; 