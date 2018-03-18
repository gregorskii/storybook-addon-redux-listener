'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxListenerMiddleware = require('redux-listener-middleware');

var _reduxListenerMiddleware2 = _interopRequireDefault(_reduxListenerMiddleware);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var reduxListener = (0, _reduxListenerMiddleware2.default)();
  var channel = _addons2.default.getChannel();

  var storybookListener = function storybookListener(action) {
    channel.emit('addon/redux-listener/actionTriggered', action);
  };

  reduxListener.createListener(storybookListener).addRule(/.*/);

  return reduxListener;
};