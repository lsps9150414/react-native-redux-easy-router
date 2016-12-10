import React from 'react';

import { routingTargetPropTypes } from '../propTypes';

export default class Router extends React.Component {
  render() {
    if (this.props.routeKey === 'ROOT' || this.props.routeKey === 'root') {
      const Component = this.props.component;
      return (
        <Component {...this.props} />
      );
    }
    return null;
  }
}

Router.propTypes = {
  ...routingTargetPropTypes,
};

Router.defaultProps = {};
