# storybook-addon-redux-listener

Storybook addon that allows you to listen to Redux events fired by components in the Storybook UI.

# Getting Started

Install the project as a dev dependency:

```
npm install storybook-addon-redux-listener --save-dev
```

Then, configure it as an addon by adding it to your `addons.js` file (located in the Storybook config directory).

```
//  Import addons you needed before (eg. actions and links)
import '@storybook/addon-***/register';
//  And also add new Redux addon
import 'storybook-addon-redux-listener/register'
```

Create a custom Redux middleware through the helper provided in the project on your store.

```
import createStorybookListener from 'storybook-addon-redux-listener';

const middlewares = [];

// OPTIONAL: attach when Storybook is active
if (process.env.NODE_ENV === 'storybook') {
  const reduxListener = createStorybookListener();
  middlewares.push(reduxListener);
}

const createStoreWithMiddleware = (reducers) => {
  return createStore(reducers, applyMiddleware(...middlewares));
};

const store = createStoreWithMiddleware(Reducers);

// Use store
```
On a Storybook config file wrap the component with a Provider decorator and the store.

```
import store from 'store';

stories.addDecorator(getStory => (
  <Provider store={store}>
    { getStory() }
  </Provider>
));
```

To make this middleware load only when Storybook is active change you start script for Storybook in your `package.json`.

```
"scripts": {
  "storybook": "NODE_ENV=storybook start-storybook -p 9001",
}
```

# Custom Middleware

You can optionally manage the middleware of this plugin by creating your own middleware. This package uses [redux-listener-middleware](https://www.npmjs.com/package/redux-listener-middleware).

Setup a new listener and bind its events to the Storybook API channel:

```
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
```

When creating your own listener you can control the rules used to fire the events, and attach other events as needed to the middleware.
