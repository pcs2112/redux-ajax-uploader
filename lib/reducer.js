"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _actions = require("./actions");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  uploading: false,
  upload: null,
  error: null
};

var addUpload = function addUpload(uploads, upload) {
  var newUploads = Array.isArray(uploads) ? uploads.slice(0) : [];
  newUploads.push(upload);
  return newUploads;
};

var filterUploads = function filterUploads(uploads, id) {
  return Array.isArray(uploads) ? uploads.filter(function (upload) {
    return upload.id !== id;
  }) : [];
};

var uploadReducer = function uploadReducer(state, action) {
  switch (action.type) {
    case _actions.UPLOAD_BEGIN:
      return _objectSpread({}, state, {
        uploading: true,
        error: null
      });

    case _actions.UPLOAD_SUCCESS:
      return _objectSpread({}, state, {
        uploading: false,
        uploads: addUpload(state.uploads, action.upload)
      });

    case _actions.UPLOAD_FAIL:
      return _objectSpread({}, state, {
        uploading: false,
        error: action.error.message
      });

    case _actions.DELETE_UPLOAD_BEGIN:
      return _objectSpread({}, state, {
        uploads: filterUploads(state.uploads, action.id),
        error: null
      });

    case _actions.DELETE_UPLOAD_SUCCESS:
      return state;

    case _actions.DELETE_UPLOAD_FAIL:
      return _objectSpread({}, state, {
        error: action.error.message
      });

    default:
      return state;
  }
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actions.UPLOAD_BEGIN:
    case _actions.UPLOAD_SUCCESS:
    case _actions.UPLOAD_FAIL:
    case _actions.DELETE_UPLOAD_BEGIN:
    case _actions.DELETE_UPLOAD_SUCCESS:
    case _actions.DELETE_UPLOAD_FAIL:
      return _objectSpread({}, state, _defineProperty({}, action.stateName, uploadReducer(state[action.stateName], action)));

    case _actions.LOAD_UPLOADS:
      return _objectSpread({}, state, _defineProperty({}, action.stateName, _objectSpread({}, initialState, {
        uploads: action.uploads || []
      })));

    case _actions.UNLOAD_UPLOADS:
      {
        var newState = _objectSpread({}, state, _defineProperty({}, action.stateName, null));

        delete newState[action.stateName];
        return newState;
      }

    default:
      return state;
  }
};

exports.default = _default;
module.exports = exports.default;