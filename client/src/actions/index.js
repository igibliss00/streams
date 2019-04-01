import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';
import streams from '../api/streams';
import history from '../history';

export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = _ => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = formValues => {
    return async (dispatch, getState) => {
        const { userId }= getState().auth;
        const response = await streams.post('/streams', { ...formValues, userId });
        dispatch({type: CREATE_STREAM, payload: response.data});
        history.push('/');
    };
}; 

export const fetchStreams = _ => {
    return async dispatch => {
        const response = await streams.get('/streams');
        dispatch({type: FETCH_STREAMS, payload: response.data});
    };
};

export const fetchStream = id => {
    return async dipatch => {
        const response = await streams.get(`/streams/${id}`);
        dipatch({type: FETCH_STREAM, payload: response.data});
    };
};

export const editStream = (id, formValue) => {
    return async dispatch => {
        const response = await streams.edit(`/streams/${id}`, formValue);
        dispatch({type: EDIT_STREAM, payload: response.data});
    };
};

export const deleteStream = id => {
    return async dispatch => {
        await streams.delete(`/streams/${id}`);
        dispatch({type: DELETE_STREAM, payload: id});
    }
}
