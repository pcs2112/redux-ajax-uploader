'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAjaxUploader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _utils = require('./utils');

var _selector = require('./selector');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withAjaxUploader = exports.withAjaxUploader = function withAjaxUploader(WrappedComponent, apiClient) {
  var WithAjaxUploader = function (_Component) {
    _inherits(WithAjaxUploader, _Component);

    function WithAjaxUploader(props) {
      _classCallCheck(this, WithAjaxUploader);

      var _this = _possibleConstructorReturn(this, (WithAjaxUploader.__proto__ || Object.getPrototypeOf(WithAjaxUploader)).call(this, props));

      _this.onUpload = _this.onUpload.bind(_this);
      return _this;
    }

    _createClass(WithAjaxUploader, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.props.loadUploads(this.props.uploads);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.props.destroyOnUnmount) {
          this.props.unloadUploads();
        }
      }
    }, {
      key: 'onUpload',
      value: function onUpload(acceptedFiles, rejectedFiles) {
        // eslint-disable-line
        var _props = this.props,
            uploading = _props.uploading,
            uploads = _props.uploads,
            uploadsMaxLimit = _props.uploadsMaxLimit,
            onUpload = _props.onUpload;

        if (uploading || uploads.length >= uploadsMaxLimit) {
          return false;
        }

        onUpload(acceptedFiles, rejectedFiles);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            uploadsMinLimit = _props2.uploadsMinLimit,
            uploads = _props2.uploads;


        var deleteEnabled = uploadsMinLimit < 1 || uploadsMinLimit > 0 && uploads && uploads.length > uploadsMinLimit;

        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, { onUpload: this.onUpload, deleteEnabled: deleteEnabled }));
      }
    }]);

    return WithAjaxUploader;
  }(_react.Component);

  WithAjaxUploader.propTypes = {
    stateName: _propTypes2.default.string.isRequired,
    uploadUrl: _propTypes2.default.string.isRequired,
    deleteUploadUrl: _propTypes2.default.string.isRequired,
    uploadsMaxLimit: _propTypes2.default.number,
    uploadsMinLimit: _propTypes2.default.number,
    uploading: _propTypes2.default.bool,
    error: _propTypes2.default.string,
    uploads: _propTypes2.default.array,
    destroyOnUnmount: _propTypes2.default.bool,
    onUpload: _propTypes2.default.func.isRequired,
    onDeleteUpload: _propTypes2.default.func.isRequired,
    loadUploads: _propTypes2.default.func.isRequired,
    unloadUploads: _propTypes2.default.func.isRequired,
    formFieldName: _propTypes2.default.string,
    maxUploadSize: _propTypes2.default.number.isRequired
  };
  WithAjaxUploader.defaultProps = {
    uploadsMaxLimit: 3,
    uploadsMinLimit: 0,
    uploading: false,
    uploads: [],
    destroyOnUnmount: true,
    formFieldName: undefined,
    error: undefined
  };


  WithAjaxUploader.displayName = 'WithAjaxUploader(' + (0, _utils.getDisplayName)(WrappedComponent) + ')';

  return (0, _reactRedux.connect)(function (state, ownProps) {
    var stateName = ownProps.stateName;

    if (state.ajaxUploads[stateName]) {
      var stateSlice = state.ajaxUploads[stateName];
      return {
        uploading: stateSlice.uploading,
        error: stateSlice.error,
        uploads: (0, _selector.getUploadsByState)(state, stateName)
      };
    }
    return {};
  }, function (dispatch, ownProps) {
    var uploadUrl = ownProps.uploadUrl,
        deleteUploadUrl = ownProps.deleteUploadUrl,
        stateName = ownProps.stateName,
        formFieldName = ownProps.formFieldName;


    return {
      onUpload: function onUpload(acceptedFiles, rejectedFiles) {
        dispatch((0, _actions.upload)(apiClient, uploadUrl, stateName, formFieldName, ownProps.maxUploadSize, acceptedFiles, rejectedFiles));
      },
      onDeleteUpload: function onDeleteUpload(id) {
        dispatch((0, _actions.deleteUpload)(apiClient, deleteUploadUrl, stateName, formFieldName, id));
      },
      loadUploads: function loadUploads(uploads) {
        dispatch((0, _actions.loadUploads)(stateName, uploads));
      },
      unloadUploads: function unloadUploads() {
        dispatch((0, _actions.unloadUploads)(stateName));
      }
    };
  })(WithAjaxUploader);
};