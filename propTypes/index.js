import { PropTypes } from 'react';
import { View, Text } from 'react-native';

const basicRouterPropTypes = {
  children: PropTypes.node.isRequired,
  hideNavBar: PropTypes.bool,
  hideTabBar: PropTypes.bool,
};

export const routerPropTypes = {
  ...basicRouterPropTypes,
  navStateName: PropTypes.string.isRequired,
  navigationState: PropTypes.object.isRequired,
};

export const stackRouterPropTypes = {
  ...basicRouterPropTypes,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  navBarStyle: View.propTypes.style,
  titleStyle: Text.propTypes.style,
  // TODO: side element styles
};

export const tabRouterPropTypes = {
  ...basicRouterPropTypes,
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
  // TODO: navBarStyle: View.propTypes.style,

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
