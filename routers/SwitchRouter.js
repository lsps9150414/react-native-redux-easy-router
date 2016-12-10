import React, {
  // PropTypes,
} from 'react';
import { connect } from 'react-redux';

import ErrorScene from '../components/ErrorScene';
import { routingTargetPropTypes, switchRouterPropTypes } from '../propTypes';

class Switch extends React.Component {
  getSwitchingTargetCarrier = switchingKey => {
    if (React.Children.count(this.props.children) !== 1) {
      return this.props.children.find(child => switchingKey === child.props.routeKey);
    }
    return switchingKey === this.props.children.props.routeKey ? this.props.children : null;
  }

  renderSwitchingTarget = switchingKey => {
    const switchingTargetCarrier = this.getSwitchingTargetCarrier(switchingKey);
    if (!switchingTargetCarrier) {
      return (<ErrorScene sceneKey={switchingKey} />);
    }
    const propsToPass = {
      ...switchingTargetCarrier.props,
    };
    const Container = switchingTargetCarrier.props.container;
    const Component = switchingTargetCarrier.props.component;
    if (Container) {
      propsToPass.component = Component;
      return (<Container {...propsToPass} />);
    }
    return (<Component {...propsToPass} />);
  }

  render() {
    return this.renderSwitchingTarget(this.props.switchingKey);
  }
}

Switch.propTypes = {
  ...switchRouterPropTypes,
  ...routingTargetPropTypes,
};

Switch.defaultProps = {};

const mapStateToProps = (/*state, props*/) => ({
});

const mapDispatchToProps = (/*dispatch*/) => ({
});

const SwitchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Switch);

export default SwitchContainer;
