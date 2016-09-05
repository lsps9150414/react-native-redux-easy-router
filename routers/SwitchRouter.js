import React, {
  // PropTypes,
} from 'react';
import { connect } from 'react-redux';

import ErrorScene from '../components/ErrorScene';
import { handleNavigation, NAVIGATION_ACTIONS } from '../actions';
import { switchPropTypes, routingTargetPropTypes } from '../propTypes';

class Switch extends React.Component {
  getSwitchingTargetCarrier = switchingKey => {
    if (Array.isArray(this.props.children)) {
      return this.props.children.find(child => switchingKey === child.props.routeKey);
    }
    return switchingKey === this.props.children.props.routeKey ? this.props.children : null;
  }

  // TODO: Modularize this.
  navigate = {
    pop: (targetRouterKey) => {
      this.props.handleNavigation(NAVIGATION_ACTIONS.POP, targetRouterKey);
    },
    push: (targetRouterKey, route) => {
      this.props.handleNavigation(NAVIGATION_ACTIONS.PUSH, targetRouterKey, route);
    },
    replace: (targetRouterKey, route, key) => {
      this.props.handleNavigation(NAVIGATION_ACTIONS.REPLACE, targetRouterKey, route, key);
    },
    selectTab: (targetRouterKey, index = 0) => {
      this.props.handleNavigation(
        NAVIGATION_ACTIONS.SELECT_TAB, targetRouterKey, null, null, index
      );
    },
  }

  renderSwitchingTarget = switchingKey => {
    const switchingTargetCarrier = this.getSwitchingTargetCarrier(switchingKey);
    if (!switchingTargetCarrier) {
      return (<ErrorScene sceneKey={switchingKey} />);
    }
    const propsToPass = {
      ...switchingTargetCarrier.props,
      navigate: this.navigate,
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
  ...switchPropTypes,
  ...routingTargetPropTypes,
};

Switch.defaultProps = {};

const mapStateToProps = (/*state, props*/) => ({
});

const mapDispatchToProps = (dispatch) => ({
  handleNavigation: (navAction, targetRouter, route, key, index) => {
    dispatch(handleNavigation(navAction, targetRouter, route, key, index));
  },
});

const SwitchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Switch);

export default SwitchContainer;
