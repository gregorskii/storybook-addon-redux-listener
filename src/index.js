import listen from 'redux-listener-middleware';
import addonAPI from '@storybook/addons';

export default () => {
  const reduxListener = listen();
  const channel = addonAPI.getChannel();

  const storybookListener = (action) => {
    channel.emit('addon/redux-listener/actionTriggered', action);
  };

  reduxListener
    .createListener(storybookListener)
    .addRule(/.*/)
  ;

  return reduxListener;
};
