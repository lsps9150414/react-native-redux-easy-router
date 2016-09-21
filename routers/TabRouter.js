import React, {
  // PropTypes,
} from 'react';
import { connect } from 'react-redux';

import NavigationCardTab from '../components/tab/NavigationCardTab';
import { tabRouterPropTypes, routingTargetPropTypes } from '../propTypes';

class TabRouter extends React.Component {
  getTabProps = () => {
    if (Array.isArray(this.props.children)) {
      return (
        this.props.children.map(child => ({
          tabIcon: child.props.tabIcon || false,
          tabKey: child.props.routeKey,
        }))
      );
    } else if (this.props.children) {
      return [{
        tabIcon: this.props.children.props.tabIcon || false,
        tabKey: this.props.children.props.routeKey,
      }];
    }
    return [];
  }
  getTabSelectionHandlers = () => {
    if (Array.isArray(this.props.children)) {
      return this.props.children.map(child => (child.props.handleTabSelection || null));
    }
    return [this.props.children.props.handleTabSelection || null];
  }

  getRoutingTargetCarrier = routingTargetIndex => {
    if (Array.isArray(this.props.children)) {
      return this.props.children[routingTargetIndex];
    }
    return this.props.children;
  }

  renderScene = navigationState => {
    const routingTargetCarrier = this.getRoutingTargetCarrier(navigationState.index);
    const propsToPass = {
      ...routingTargetCarrier.props,
    };
    const Container = routingTargetCarrier.props.container;
    const Component = routingTargetCarrier.props.component;
    if (Container) {
      propsToPass.component = Component;
      return (<Container {...propsToPass} />);
    }
    return (<Component {...propsToPass} />);
  }

  render() {
    return (
      <NavigationCardTab
        navStateName={this.props.navStateName}
        navigationState={this.props.navigationState}
        renderScene={this.renderScene}
        getTabProps={this.getTabProps}
        getTabSelectionHandlers={this.getTabSelectionHandlers}
        tabBarStyle={this.props.tabBarStyle}
      />
    );
  }
}

TabRouter.propTypes = {
  ...tabRouterPropTypes,
  ...routingTargetPropTypes,
};

TabRouter.defaultProps = {};

const mapStateToProps = (state, props) => ({
  navigationState: state.navigation[props.navStateName],
});

const mapDispatchToProps = (/*dispatch*/) => ({
});

const TabRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabRouter);

export default TabRouterContainer;
