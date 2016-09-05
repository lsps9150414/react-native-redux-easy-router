import React, {
  PropTypes,
} from 'react';

import { routingTargetPropTypes } from '../propTypes';

export default class Scene extends React.Component {
  render() {
    return null;
  }
}

Scene.propTypes = {
  ...routingTargetPropTypes,
  container: PropTypes.func,
};
