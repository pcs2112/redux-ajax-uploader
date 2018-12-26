"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAjaxUploader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _utils = require("./utils");

var _selector = require("./selector");

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withAjaxUploader = function withAjaxUploader(WrappedComponent, apiClient) {
  var WithAjaxUploader =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithAjaxUploader, _Component);

    function WithAjaxUploader(props) {
      var _this;

      _classCallCheck(this, WithAjaxUploader);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WithAjaxUploader).call(this, props));
      _this.onUpload = _this.onUpload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    _createClass(WithAjaxUploader, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.props.loadUploads(this.props.uploads);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.props.destroyOnUnmount) {
          this.props.unloadUploads();
        }
      }
    }, {
      key: "onUpload",
      value: function onUpload(acceptedFiles, rejectedFiles) {
        // eslint-disable-line
        var _this$props = this.props,
            uploading = _this$props.uploading,
            uploads = _this$props.uploads,
            uploadsMaxLimit = _this$props.uploadsMaxLimit,
            onUpload = _this$props.onUpload;

        if (uploading || uploads.length >= uploadsMaxLimit) {
          return false;
        }

        onUpload(acceptedFiles, rejectedFiles);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            uploadsMinLimit = _this$props2.uploadsMinLimit,
            uploads = _this$props2.uploads;
        var deleteEnabled = uploadsMinLimit < 1 || uploadsMinLimit > 0 && uploads && uploads.length > uploadsMinLimit;
        return _react.default.createElement(WrappedComponent, _extends({}, this.props, {
          onUpload: this.onUpload,
          deleteEnabled: deleteEnabled
        }));
      }
    }]);

    return WithAjaxUploader;
  }(_react.Component);

  _defineProperty(WithAjaxUploader, "propTypes", {
    stateName: _propTypes.default.string.isRequired,
    uploadUrl: _propTypes.default.string.isRequired,
    deleteUploadUrl: _propTypes.default.string.isRequired,
    uploadsMaxLimit: _propTypes.default.number,
    uploadsMinLimit: _propTypes.default.number,
    uploading: _propTypes.default.bool,
    error: _propTypes.default.string,
    uploads: _propTypes.default.array,
    destroyOnUnmount: _propTypes.default.bool,
    onUpload: _propTypes.default.func.isRequired,
    onDeleteUpload: _propTypes.default.func.isRequired,
    loadUploads: _propTypes.default.func.isRequired,
    unloadUploads: _propTypes.default.func.isRequired,
    formFieldName: _propTypes.default.string,
    maxUploadSize: _propTypes.default.number.isRequired
  });

  _defineProperty(WithAjaxUploader, "defaultProps", {
    uploadsMaxLimit: 3,
    uploadsMinLimit: 0,
    uploading: false,
    uploads: [],
    destroyOnUnmount: true,
    formFieldName: undefined,
    error: undefined
  });

  WithAjaxUploader.displayName = "WithAjaxUploader(".concat((0, _utils.getDisplayName)(WrappedComponent), ")");
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

exports.withAjaxUploader = withAjaxUploader;