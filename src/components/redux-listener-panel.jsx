/* eslint-disable react/no-array-index-key */

import React, { Component, PropTypes } from 'react';

const styles = {
  reduxPanel: {
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto'
  }
};

class ReduxListenerPanel extends Component {
  static propTypes = {
    api: PropTypes.shape().isRequired,
    channel: PropTypes.shape().isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = { actions: [] };
    this.onActionTriggered = this.onActionTriggered.bind(this);
  }

  componentDidMount() {
    const { api, channel } = this.props;

    // Listen to the Redux action event and render
    channel.on(
      'addon/redux-listener/actionTriggered', this.onActionTriggered
    );

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.setState({ actions: [] });
    });
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;

    const { channel } = this.props;
    channel.removeListener(
      'addon/redux-listener/actionTriggered', this.onActionTriggered
    );
  }

  onActionTriggered(action) {
    this.setState({
      actions: [...this.state.actions, action]
    });
  }

  renderActions() {
    if (!this.state.actions.length) {
      return (
        <tr />
      );
    }

    return this.state.actions.map((action, index) => {
      return (
        <tr key={index}>
          <td>{action.type}</td>
          <td><pre>{JSON.stringify(action.payload, null, 2)}</pre></td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div style={styles.reduxPanel}>
        <table>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Payload</th>
            </tr>
            {this.renderActions()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReduxListenerPanel;
