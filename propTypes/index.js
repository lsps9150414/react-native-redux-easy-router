import { PropTypes } from 'react';
import { View, Text } from 'react-native';

const basicRouterPropTypes = {
  children: PropTypes.node.isRequired,
  hideNavBar: PropTypes.bool,
  hideTabBar: PropTypes.bool,
  handleNavigation: PropTypes.func.isRequired,
};

export const routerPropTypes = {
  ...basicRouterPropTypes,
  navStateName: PropTypes.string.isRequired,
  navigationState: PropTypes.object.isRequired,
};

export const switchPropTypes = {
  ...basicRouterPropTypes,
  switchingKey: PropTypes.string.isRequired,
};

export const routingTargetPropTypes = {
  routeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  component: PropTypes.func.isRequired,
  navigate: PropTypes.object,
  // For StackRouter
  hideParentNavBar: PropTypes.bool,
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
  handleTabSelection: PropTypes.func,
  tabIcon: PropTypes.func,
};
