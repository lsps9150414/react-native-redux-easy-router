import React, {
  // PropTypes,
} from 'react';
import { connect } from 'react-redux';

import TabCardStack from '../components/tab/TabCardStack';
import { handleNavigation, NAVIGATION_ACTIONS } from '../actions';
import { routerPropTypes, routingTargetPropTypes } from '../propTypes';

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

  renderRoutingTarget = navigationState => {
    const routingTargetCarrier = this.getRoutingTargetCarrier(navigationState.index);
    const propsToPass = {
      ...routingTargetCarrier.props,
      navigate: this.navigate,
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
      <TabCardStack
        navStateName={this.props.navStateName}
        navigationState={this.props.navigationState}
        renderScene={this.renderRoutingTarget}
        getTabProps={this.getTabProps}
        getTabSelectionHandlers={this.getTabSelectionHandlers}
        navigate={this.navigate}
      />
    );
  }
}

TabRouter.propTypes = {
  ...routerPropTypes,
  ...routingTargetPropTypes,
};

TabRouter.defaultProps = {};

const mapStateToProps = (state, props) => ({
  navigationState: state.navigation[props.navStateName],
});

const mapDispatchToProps = (dispatch) => ({
  handleNavigation: (navAction, targetRouter, route, key, index) => {
    dispatch(handleNavigation(navAction, targetRouter, route, key, index));
  },
});

const TabRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabRouter);

export default TabRouterContainer;
