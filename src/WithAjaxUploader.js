import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDisplayName } from './utils';
import { getUploadsByState } from './selector';
import { upload, deleteUpload, loadUploads, unloadUploads } from './actions';

export const withAjaxUploader = (WrappedComponent, apiClient) => {
  class WithAjaxUploader extends Component {
    static propTypes = {
      stateName: PropTypes.string.isRequired,
      uploadUrl: PropTypes.string.isRequired,
      deleteUploadUrl: PropTypes.string.isRequired,
      uploadsMaxLimit: PropTypes.number,
      uploadsMinLimit: PropTypes.number,
      uploading: PropTypes.bool,
      error: PropTypes.string,
      uploads: PropTypes.array,
      destroyOnUnmount: PropTypes.bool,
      onUpload: PropTypes.func.isRequired,
      onDeleteUpload: PropTypes.func.isRequired,
      loadUploads: PropTypes.func.isRequired,
      unloadUploads: PropTypes.func.isRequired,
      formFieldName: PropTypes.string,
      maxUploadSize: PropTypes.number.isRequired
    }

    static defaultProps = {
      uploadsMaxLimit: 3,
      uploadsMinLimit: 0,
      uploading: false,
      uploads: [],
      destroyOnUnmount: true
    }

    constructor(props) {
      super(props);
      this.onUpload = this.onUpload.bind(this);
    }

    componentWillMount() {
      this.props.loadUploads(this.props.uploads);
    }

    componentWillUnmount() {
      if (this.props.destroyOnUnmount) {
        this.props.unloadUploads();
      }
    }

    onUpload(acceptedFiles, rejectedFiles) {
      const { uploading, uploads, uploadsMaxLimit, onUpload } = this.props;
      if (uploading || uploads.length >= uploadsMaxLimit) {
        return false;
      }

      onUpload(acceptedFiles, rejectedFiles);
    }

    render() {
      const {
        uploadsMinLimit,
        uploads
      } = this.props;

      const deleteEnabled = uploadsMinLimit < 1 || (uploadsMinLimit > 0 && uploads && uploads.length > uploadsMinLimit);

      return (
        <WrappedComponent { ...this.props } onUpload={this.onUpload} deleteEnabled={deleteEnabled} />
      );
    }
  }

  WithAjaxUploader.displayName = `WithAjaxUploader(${getDisplayName(WrappedComponent)})`;

  return connect(
    (state, ownProps) => {
      const { stateName } = ownProps;
      if (state.ajaxUploads[stateName]) {
        const stateSlice = state.ajaxUploads[stateName];
        return {
          uploading: stateSlice.uploading,
          error: stateSlice.error,
          uploads: getUploadsByState(state, stateName)
        };
      }
      return {};
    },
    (dispatch, ownProps) => {
      const {
        uploadUrl,
        deleteUploadUrl,
        stateName,
        formFieldName
      } = ownProps;

      return {
        onUpload: (acceptedFiles, rejectedFiles) => {
          dispatch(upload(
            apiClient,
            uploadUrl,
            stateName,
            formFieldName,
            ownProps.maxUploadSize,
            acceptedFiles,
            rejectedFiles
          ));
        },
        onDeleteUpload: (id) => {
          dispatch(deleteUpload(apiClient, deleteUploadUrl, stateName, formFieldName, id));
        },
        loadUploads: (uploads) => {
          dispatch(loadUploads(stateName, uploads));
        },
        unloadUploads: () => {
          dispatch(unloadUploads(stateName));
        }
      };
    }
  )(WithAjaxUploader);
};
