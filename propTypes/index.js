import { PropTypes } from 'react';
import { View, Text } from 'react-native';

const basicRouterPropTypes = {
  children: PropTypes.node.isRequired,
};

export const routerPropTypes = {
  ...basicRouterPropTypes,
  navStateName: PropTypes.string.isRequired,
  navigationState: PropTypes.object.isRequired,
};

export const stackRouterPropTypes = {
  ...routerPropTypes,
  hideNavBar: PropTypes.bool,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  navBarStyle: View.propTypes.style,
  titleStyle: Text.propTypes.style,
  // TODO: navBar side element styles
};

export const tabRouterPropTypes = {
  ...routerPropTypes,
  hideTabBar: PropTypes.bool,
  tabBarStyle: View.propTypes.style,
};

export const switchRouterPropTypes = {
  ...basicRouterPropTypes,
  switchingKey: PropTypes.string.isRequired,
};

export const routingTargetPropTypes = {
  routeKey: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,

  // For StackRouter
  hideParentNavBar: PropTypes.bool,
  hideParentTabBar: PropTypes.bool,
  // TODO: ParentNavBarStyle: View.propTypes.style,
  // TODO: ParentNabBarStyle: View.propTypes.style,

  title: PropTypes.string,
  titleStyle: Text.propTypes.style,

  leftComponent: PropTypes.func,
  leftTitle: PropTypes.string,
  leftOnPress: PropTypes.func,
  leftStyle: View.propTypes.style,
  leftTitleStyle: Text.propTypes.style,

  rightComponent: PropTypes.func,
  rightTitle: PropTypes.string,
  rightOnPress: PropTypes.func,
  rightStyle: View.propTypes.style,
  rightTitleStyle: Text.propTypes.style,

  // For TabRouter
  tabIcon: PropTypes.func,
  handleTabSelection: PropTypes.func,
};
