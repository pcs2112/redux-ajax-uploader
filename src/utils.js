/**
 * Converts a file size in bytes to a readable human format.
 *
 * @param {Number} bytes
 * @param {Number} decimals
 * @returns {String}
 */
export const formatBytes = (bytes, decimals = 0) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1000;
  const dm = decimals + 1 || 3;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Returns the display name of a React components.
 * @param {Object} WrappedComponent
 * @returns {String}
 */
export const getDisplayName = (WrappedComponent) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';
