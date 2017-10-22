import { createSelector } from 'reselect';

const uploadsSelectorByState = (state, stateName) =>
  (state.ajaxUploads[stateName] ? state.ajaxUploads[stateName].uploads : null);

/**
 * Returns an array of uploads by a state slice name.
 */
export const getUploadsByState = createSelector(
  [uploadsSelectorByState],
  uploads => uploads || null
);
