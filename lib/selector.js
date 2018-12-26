"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUploadsByState = void 0;

var _reselect = require("reselect");

var uploadsSelectorByState = function uploadsSelectorByState(state, stateName) {
  return state.ajaxUploads[stateName] ? state.ajaxUploads[stateName].uploads : null;
};
/**
 * Returns an array of uploads by a state slice name.
 */


var getUploadsByState = (0, _reselect.createSelector)([uploadsSelectorByState], function (uploads) {
  return uploads || null;
});
exports.getUploadsByState = getUploadsByState;