import { routingTargetPropTypes, tabRouterPropTypes } from '../propTypes';

import NavigationCardTab from '../components/tab/NavigationCardTab';
import React from 'react';
import TabBar from '../components/tab/TabBar';
import { connect } from 'react-redux';

class TabRouter extends React.Component {
  componentWillMount() {
    this.tabProps = this.getTabProps();
    this.tabSelectionHandlers = this.getTabSelectionHandlers();
  }
  getTabProps = () => {
    if (React.Children.count(this.props.children) !== 1) {
      return (
        React.Children.map(this.props.children, child => ({
          tabKey: child.props.routeKey,
          tabIcon: child.props.tabIcon || false,
        }))
      );
    } else if (this.props.children) {
      return [{
        tabKey: this.props.children.props.routeKey,
        tabIcon: this.props.children.props.tabIcon || false,
      }];
    }
    return [];
  }
  getTabSelectionHandlers = () => {
    if (React.Children.count(this.props.children) !== 1) {
      return (
        React.Children.map(this.props.children, child => (child.props.handleTabSelection || null))
      );
    }
    return [this.props.children.props.handleTabSelection || null];
  }

  getRoutingTargetCarrier = (routingTargetIndex) => {
    if (React.Children.count(this.props.children) !== 1) {
      return this.props.children[routingTargetIndex];
    }
    return this.props.children;
  }

  renderScene = (navigationState) => {
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
  renderTabBar = (tabProps, navStateName, navigationState, tabSelectionHandlers) => {
    const routingTargetCarrier = this.getRoutingTargetCarrier(navigationState.index);
    if (this.props.hideTabBar) { return null; }
    if (routingTargetCarrier.props.hideParentTabBar) { return null; }
    return (
      <TabBar
        style={this.props.tabBarStyle}
        tabProps={tabProps}
        navStateName={navStateName}
        navigationState={navigationState}
        tabSelectionHandlers={tabSelectionHandlers}
      />
    );
  }
  render() {
    return (
      <NavigationCardTab
        navStateName={this.props.navStateName}
        navigationState={this.props.navigationState}
        tabProps={this.tabProps}
        tabSelectionHandlers={this.tabSelectionHandlers}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
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

const mapDispatchToProps = (/* dispatch */) => ({
});

const TabRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabRouter);

export default TabRouterContainer;
