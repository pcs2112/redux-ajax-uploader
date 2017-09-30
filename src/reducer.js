import {
  UPLOAD_BEGIN,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  DELETE_UPLOAD_BEGIN,
  DELETE_UPLOAD_SUCCESS,
  DELETE_UPLOAD_FAIL,
  LOAD_UPLOADS,
  UNLOAD_UPLOADS
} from './actions';

const initialState = {
  uploading: false,
  upload: null,
  error: null
};

const addUpload = (uploads, upload) => {
  const newUploads = Array.isArray(uploads) ? uploads.slice(0) : [];
  newUploads.push(upload);
  return newUploads;
};

const filterUploads = (uploads, id) => {
  return Array.isArray(uploads) ? uploads.filter((upload) => upload.id !== id) : [];
};

const uploadReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_BEGIN:
      return {
        ...state,
        uploading: true,
        error: null
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploads: addUpload(state.uploads, action.upload)
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        error: action.error.message
      };
    case DELETE_UPLOAD_BEGIN:
      return {
        ...state,
        uploads: filterUploads(state.uploads, action.id),
        error: null
      };
    case DELETE_UPLOAD_SUCCESS:
      return state;
    case DELETE_UPLOAD_FAIL:
      return {
        ...state,
        error: action.error.message
      };
    default:
      return state;
  }
};

export default (state = {}, action = {}) => {
  switch (action.type) {
    case UPLOAD_BEGIN:
    case UPLOAD_SUCCESS:
    case UPLOAD_FAIL:
    case DELETE_UPLOAD_BEGIN:
    case DELETE_UPLOAD_SUCCESS:
    case DELETE_UPLOAD_FAIL:
      return {
        ...state,
        [action.stateName]: uploadReducer(state[action.stateName], action)
      };
    case LOAD_UPLOADS:
      return {
        ...state,
        [action.stateName]: {
          ...initialState,
          uploads: action.uploads || []
        }
      };
    case UNLOAD_UPLOADS:
      const newState = { ...state, [action.stateName]: null };
      delete(newState[action.stateName]);
      return newState;
    default:
      return state;
  }
};
