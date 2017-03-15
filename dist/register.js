'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybookAddons = require('@kadira/storybook-addons');

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _reduxListenerPanel = require('./components/redux-listener-panel');

var _reduxListenerPanel2 = _interopRequireDefault(_reduxListenerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_storybookAddons2.default.register('addon/redux-listener', function (api) {
  _storybookAddons2.default.addPanel('addon/redux-listener', {
    title: 'Redux Action Listener',
    render: function render() {
      return _react2.default.createElement(_reduxListenerPanel2.default, { channel: _storybookAddons2.default.getChannel(), api: api });
    }
  });
});