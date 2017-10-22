import { change } from 'redux-form';
import { formatBytes } from './utils';

export const UPLOAD_BEGIN = 'redux-ajax-uploader/UPLOAD_BEGIN';
export const UPLOAD_SUCCESS = 'redux-ajax-uploader/UPLOAD_SUCCESS';
export const UPLOAD_FAIL = 'redux-ajax-uploader/UPLOAD_FAIL';
export const DELETE_UPLOAD_BEGIN = 'redux-ajax-uploader/DELETE_UPLOAD_BEGIN';
export const DELETE_UPLOAD_SUCCESS = 'redux-ajax-uploader/DELETE_UPLOAD_SUCCESS';
export const DELETE_UPLOAD_FAIL = 'redux-ajax-uploader/DELETE_UPLOAD_FAIL';
export const LOAD_UPLOADS = 'redux-ajax-uploader/LOAD_UPLOADS';
export const UNLOAD_UPLOADS = 'redux-ajax-uploader/UNLOAD_UPLOADS';

const triggerError = (type, stateName, message) => ({
  type,
  stateName,
  error: {
    message
  }
});

/**
 * Action used to update the redux-form field.
 * @param {String} stateName
 * @param {String} formFieldName
 */
const updateFormField = (stateName, formFieldName) => (dispatch, getState) => {
  const state = getState().ajaxUploads[stateName];
  const ids = state.uploads.map(item => item.id);
  dispatch(change(
    stateName,
    formFieldName,
    ids
  ));
};

/**
 * Action used to upload a file.
 *
 * @param {Object} apiClient
 * @param {String} uploadUrl
 * @param {String} stateName
 * @param {String|undefined} formFieldName
 * @param {Number} maxUploadSize
 * @param {Array} acceptedFiles
 * @param {Array} rejectedFiles
 */
export const upload = (apiClient, uploadUrl, stateName, formFieldName, maxUploadSize, acceptedFiles, rejectedFiles) =>
  (dispatch) => {
    if (rejectedFiles.length > 0) {
      dispatch(triggerError(
        UPLOAD_FAIL,
        stateName,
        `Make sure to upload images only that are under ${formatBytes(maxUploadSize)}.`
      ));
    } else {
      const formData = new FormData();
      acceptedFiles.forEach((acceptedFile) => {
        formData.append('file', acceptedFile);
      });

      dispatch({
        type: UPLOAD_BEGIN,
        stateName
      });

      apiClient.post(uploadUrl, {
        data: formData
      })
        .then((result) => {
          dispatch({
            type: UPLOAD_SUCCESS,
            stateName,
            upload: result
          });

          if (formFieldName) {
            dispatch(updateFormField(stateName, formFieldName));
          }
        })
        .catch((err) => {
          dispatch(triggerError(UPLOAD_FAIL, stateName, err.message));
        });
    }
  };

/**
 * Action used to delete an uploaded file.
 *
 * @param {Object} apiClient
 * @param {String} deleteUploadUrl
 * @param {String} stateName
 * @param {String|undefined} formFieldName
 * @param {Number} uploadId
 */
export const deleteUpload = (apiClient, deleteUploadUrl, stateName, formFieldName, uploadId) =>
  (dispatch) => {
    dispatch({
      type: DELETE_UPLOAD_BEGIN,
      stateName,
      id: uploadId
    });

    apiClient.post(`${deleteUploadUrl}/${uploadId}`)
      .then(() => {
        dispatch({
          type: DELETE_UPLOAD_SUCCESS,
          stateName,
          id: uploadId
        });

        if (formFieldName) {
          dispatch(updateFormField(stateName, formFieldName));
        }
      })
      .catch((err) => {
        dispatch(triggerError(DELETE_UPLOAD_FAIL, stateName, err.message));
      });
  };

/**
 * Action used to load the specified uploads state slice.
 *
 * @param {String} stateName
 * @param {Array} uploads
 */
export const loadUploads = (stateName, uploads) => ({
  type: LOAD_UPLOADS,
  stateName,
  uploads
});

/**
 * Action used to unload the specified uploads state slice.
 *
 * @param {String} stateName
 */
export const unloadUploads = stateName => ({
  type: UNLOAD_UPLOADS,
  stateName
});
