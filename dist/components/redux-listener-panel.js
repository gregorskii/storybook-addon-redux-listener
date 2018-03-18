'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-array-index-key */

var styles = {
  reduxPanel: {
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto'
  }
};

var ReduxListenerPanel = function (_React$PureComponent) {
  _inherits(ReduxListenerPanel, _React$PureComponent);

  function ReduxListenerPanel() {
    var _ref;

    _classCallCheck(this, ReduxListenerPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = ReduxListenerPanel.__proto__ || Object.getPrototypeOf(ReduxListenerPanel)).call.apply(_ref, [this].concat(args)));

    _this.state = { actions: [] };
    _this.onActionTriggered = _this.onActionTriggered.bind(_this);
    return _this;
  }

  _createClass(ReduxListenerPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          api = _props.api,
          channel = _props.channel;

      // Listen to the Redux action event and render

      channel.on('addon/redux-listener/actionTriggered', this.onActionTriggered);

      // Clear the current action on every story change.
      this.stopListeningOnStory = api.onStory(function () {
        _this2.setState({ actions: [] });
      });
    }

    // This is some cleanup tasks when the actions panel is unmounting.

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.stopListeningOnStory) {
        this.stopListeningOnStory();
      }

      this.unmounted = true;

      var channel = this.props.channel;

      channel.removeListener('addon/redux-listener/actionTriggered', this.onActionTriggered);
    }
  }, {
    key: 'onActionTriggered',
    value: function onActionTriggered(action) {
      this.setState({
        actions: [].concat(_toConsumableArray(this.state.actions), [action])
      });
    }
  }, {
    key: 'renderActions',
    value: function renderActions() {
      if (!this.state.actions.length) {
        return _react2.default.createElement('tr', null);
      }

      return this.state.actions.map(function (action, index) {
        return _react2.default.createElement(
          'tr',
          { key: index },
          _react2.default.createElement(
            'td',
            null,
            action.type
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'pre',
              null,
              JSON.stringify(action.payload, null, 2)
            )
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: styles.reduxPanel },
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'tbody',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Type'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Payload'
              )
            ),
            this.renderActions()
          )
        )
      );
    }
  }]);

  return ReduxListenerPanel;
}(_react2.default.PureComponent);

ReduxListenerPanel.propTypes = {
  api: _propTypes2.default.shape({
    onStory: _propTypes2.default.func.isRequired
  }).isRequired,
  channel: _propTypes2.default.shape({
    on: _propTypes2.default.func.isRequired,
    removeListener: _propTypes2.default.func.isRequired
  }).isRequired
};
exports.default = ReduxListenerPanel;