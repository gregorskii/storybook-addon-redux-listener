'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _reduxListenerPanel = require('./components/redux-listener-panel');

var _reduxListenerPanel2 = _interopRequireDefault(_reduxListenerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_addons2.default.register('addon/redux-listener', function (api) {
  _addons2.default.addPanel('addon/redux-listener', {
    title: 'Redux Action Listener',
    render: function render() {
      return _react2.default.createElement(_reduxListenerPanel2.default, { channel: _addons2.default.getChannel(), api: api });
    }
  });
});