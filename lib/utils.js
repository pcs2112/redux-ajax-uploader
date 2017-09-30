'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Converts a file size in bytes to a readable human format.
 *
 * @param {Number} bytes
 * @param {Number} decimals
 * @returns {String}
 */
var formatBytes = exports.formatBytes = function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (bytes === 0) {
    return '0 Bytes';
  }

  var k = 1000;
  var dm = decimals + 1 || 3;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Returns the display name of a React components.
 * @param {Object} WrappedComponent
 * @returns {String}
 */
var getDisplayName = exports.getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};