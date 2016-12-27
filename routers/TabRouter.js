import React from 'react';
import { connect } from 'react-redux';

import ErrorScene from '../components/ErrorScene';
import NavigationCardTab from '../components/tab/NavigationCardTab';
import TabBar from '../components/tab/TabBar';
import { routingTargetPropTypes, tabRouterPropTypes } from '../propTypes';

class TabRouter extends React.Component {
  componentWillMount() {
    this.tabProps = this.getTabProps();
    this.tabSelectionHandlers = this.getTabSelectionHandlers();
  }
  getTabProps = () => {
    if (React.Children.count(this.props.children) >= 1) {
      const childCarriers = this.props.children.filter(child => React.isValidElement(child));
      console.log(childCarriers);
      return (
        React.Children.map(childCarriers, child => ({
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
    const childCarriers = this.props.children.filter(child => React.isValidElement(child));
    console.log('getTabSelectionHandlers =', childCarriers);
    if (React.Children.count(childCarriers) >= 1) {
      const tabSelectionHandlersDictionary = {};
      React.Children.forEach(childCarriers, (child) => {
        tabSelectionHandlersDictionary[child.props.routeKey] =
          (child.props.handleTabSelection || false);
      });
      return tabSelectionHandlersDictionary;
    }
    return [this.props.children.props.handleTabSelection || false];
  }

  getRoutingTargetCarrier = (routingTargetKey) => {
    if (React.Children.count(this.props.children) >= 1) {
      return this.props.children.find(
        child => React.isValidElement(child) && (child.props.routeKey === routingTargetKey)
      );
    }
    if (React.isValidElement(this.props.children)) {
      return this.props.children;
    }
    return false;
  }

  renderScene = (navigationState) => {
    const routingTargetCarrier = this.getRoutingTargetCarrier(navigationState.key);
    if (!routingTargetCarrier) {
      return (<ErrorScene sceneKey={navigationState.key} />);
    }
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
    const routingTargetCarrier = this.getRoutingTargetCarrier(navigationState.key);
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
