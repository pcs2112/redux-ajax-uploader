'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unloadUploads = exports.loadUploads = exports.deleteUpload = exports.upload = exports.UNLOAD_UPLOADS = exports.LOAD_UPLOADS = exports.DELETE_UPLOAD_FAIL = exports.DELETE_UPLOAD_SUCCESS = exports.DELETE_UPLOAD_BEGIN = exports.UPLOAD_FAIL = exports.UPLOAD_SUCCESS = exports.UPLOAD_BEGIN = undefined;

var _reduxForm = require('redux-form');

var _utils = require('./utils');

var UPLOAD_BEGIN = exports.UPLOAD_BEGIN = 'redux-ajax-uploader/UPLOAD_BEGIN';
var UPLOAD_SUCCESS = exports.UPLOAD_SUCCESS = 'redux-ajax-uploader/UPLOAD_SUCCESS';
var UPLOAD_FAIL = exports.UPLOAD_FAIL = 'redux-ajax-uploader/UPLOAD_FAIL';
var DELETE_UPLOAD_BEGIN = exports.DELETE_UPLOAD_BEGIN = 'redux-ajax-uploader/DELETE_UPLOAD_BEGIN';
var DELETE_UPLOAD_SUCCESS = exports.DELETE_UPLOAD_SUCCESS = 'redux-ajax-uploader/DELETE_UPLOAD_SUCCESS';
var DELETE_UPLOAD_FAIL = exports.DELETE_UPLOAD_FAIL = 'redux-ajax-uploader/DELETE_UPLOAD_FAIL';
var LOAD_UPLOADS = exports.LOAD_UPLOADS = 'redux-ajax-uploader/LOAD_UPLOADS';
var UNLOAD_UPLOADS = exports.UNLOAD_UPLOADS = 'redux-ajax-uploader/UNLOAD_UPLOADS';

var triggerError = function triggerError(type, stateName, message) {
  return {
    type: type,
    stateName: stateName,
    error: {
      message: message
    }
  };
};

/**
 * Action used to update the redux-form field.
 * @param {String} stateName
 * @param {String} formFieldName
 */
var updateFormField = function updateFormField(stateName, formFieldName) {
  return function (dispatch, getState) {
    var state = getState().ajaxUploads[stateName];
    var ids = state.uploads.map(function (item) {
      return item.id;
    });
    dispatch((0, _reduxForm.change)(stateName, formFieldName, ids));
  };
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
var upload = exports.upload = function upload(apiClient, uploadUrl, stateName, formFieldName, maxUploadSize, acceptedFiles, rejectedFiles) {
  return function (dispatch) {
    if (rejectedFiles.length > 0) {
      dispatch(triggerError(UPLOAD_FAIL, stateName, 'Make sure to upload images only that are under ' + (0, _utils.formatBytes)(maxUploadSize) + '.'));
    } else {
      var formData = new FormData();
      acceptedFiles.forEach(function (acceptedFile) {
        formData.append('file', acceptedFile);
      });

      dispatch({
        type: UPLOAD_BEGIN,
        stateName: stateName
      });

      apiClient.post(uploadUrl, {
        data: formData
      }).then(function (result) {
        dispatch({
          type: UPLOAD_SUCCESS,
          stateName: stateName,
          upload: result
        });

        if (formFieldName) {
          dispatch(updateFormField(stateName, formFieldName));
        }
      }).catch(function (err) {
        dispatch(triggerError(UPLOAD_FAIL, stateName, err.message));
      });
    }
  };
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
var deleteUpload = exports.deleteUpload = function deleteUpload(apiClient, deleteUploadUrl, stateName, formFieldName, uploadId) {
  return function (dispatch) {
    dispatch({
      type: DELETE_UPLOAD_BEGIN,
      stateName: stateName,
      id: uploadId
    });

    dispatch({
      type: DELETE_UPLOAD_SUCCESS,
      stateName: stateName,
      id: uploadId
    });

    if (formFieldName) {
      dispatch(updateFormField(stateName, formFieldName));
    }

    /* apiClient.post(`${deleteUploadUrl}/${uploadId}`)
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
      }); */
  };
};

/**
 * Action used to load the specified uploads state slice.
 *
 * @param {String} stateName
 * @param {Array} uploads
 */
var loadUploads = exports.loadUploads = function loadUploads(stateName, uploads) {
  return {
    type: LOAD_UPLOADS,
    stateName: stateName,
    uploads: uploads
  };
};

/**
 * Action used to unload the specified uploads state slice.
 *
 * @param {String} stateName
 */
var unloadUploads = exports.unloadUploads = function unloadUploads(stateName) {
  return {
    type: UNLOAD_UPLOADS,
    stateName: stateName
  };
};