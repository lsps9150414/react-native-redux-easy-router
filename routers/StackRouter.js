import React, {
  PropTypes,
} from 'react';
import {
  View,
  TouchableOpacity,
  NavigationExperimental,
} from 'react-native';
import { connect } from 'react-redux';
import { navigate } from 'actions';

import ErrorScene from '../components/ErrorScene';
import { routerPropTypes, routingTargetPropTypes } from '../propTypes';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
} = NavigationExperimental;

class StackRouter extends React.Component {
  getRoutingTargetCarrier = routingTargetKey => {
    if (Array.isArray(this.props.children)) {
      return (
        this.props.children.find(child => routingTargetKey === `scene_${child.props.routeKey}`)
      );
    }
    return (
      routingTargetKey === `scene_${this.props.children.props.routeKey}` ?
        this.props.children : null
    );
  }

  back = () => {
    navigate.pop(this.props.navStateName);
  }
  renderSideComponent = (side, sceneProps) => {
    if (side !== 'left' && side !== 'right') {
      return null;
    }
    let component = null;
    const sideComponent = sceneProps[`${side}Component`];
    const sideTitle = sceneProps[`${side}Title`];
    const sideOnPress = sceneProps[`${side}OnPress`];
    const sideStyle = sceneProps[`${side}Style`];
    const sideTitleStyle = sceneProps[`${side}TitleStyle`];

    if (sideComponent) {
      const Component = sideComponent;
      component = (
        <View
          style={[
            { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
            sideStyle,
          ]}
        >
          <Component style={{ margin: 10 }} />
        </View>
      );
    } else if (sideTitle) {
      component = (
        <NavigationHeader.Title
          textStyle={[{ color: '#007AFF' }, sideTitleStyle]}
        >
          {sideTitle}
        </NavigationHeader.Title>
      );
    }
    if (sideOnPress) {
      return (
        <TouchableOpacity style={{ flex: 1 }} onPress={sideOnPress}>
          {component}
        </TouchableOpacity>
      );
    }
    return component;
  }
  renderTitleComponent = sceneProps => (
    <NavigationHeader.Title textStyle={{ backgroundColor: 'transparent' }}>
      {sceneProps.scene.route.title || 'Title'}
    </NavigationHeader.Title>
  )
  renderOverlay = sceneProps => {
    const routingTargetCarrier = this.getRoutingTargetCarrier(sceneProps.scene.key);
    if (!routingTargetCarrier) {
      return (
        <NavigationHeader
          {...sceneProps}
          onNavigateBack={this.back}
        />
      );
    }
    if (this.props.hideNavBar) { return null; }
    // FIXME: NavBar update before scene causing glitter.
    if (routingTargetCarrier.props.hideParentNavBar) { return null; }
    const renderRightComponent =
      () => this.renderSideComponent('right', routingTargetCarrier.props);
    const renderLeftComponent =
      routingTargetCarrier.props.leftComponent || routingTargetCarrier.props.leftTitle ?
      () => this.renderSideComponent('left', routingTargetCarrier.props) : undefined;
    return (
      <NavigationHeader
        {...sceneProps}
        renderTitleComponent={this.renderTitleComponent}
        renderLeftComponent={renderLeftComponent}
        renderRightComponent={renderRightComponent}
        onNavigateBack={this.back}
      />
    );
  }

  renderRoutingTarget = sceneProps => {
    const sceneKey = sceneProps.scene.key;
    const routingTargetCarrier = this.getRoutingTargetCarrier(sceneKey);
    if (!routingTargetCarrier) {
      return (<ErrorScene sceneKey={sceneKey} />);
    }
    const propsToPass = {
      ...routingTargetCarrier.props,
      ...sceneProps.scene.route.props,
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
      <NavigationCardStack
        navigationState={this.props.navigationState}
        renderScene={this.renderRoutingTarget}
        renderOverlay={this.renderOverlay}
        direction={this.props.direction}
      />
    );
  }
}

StackRouter.propTypes = {
  ...routerPropTypes,
  ...routingTargetPropTypes,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
};

StackRouter.defaultProps = {
  direction: 'horizontal',
};

const mapStateToProps = (state, props) => ({
  navigationState: state.navigation[props.navStateName],
});

const mapDispatchToProps = (/*dispatch*/) => ({
});

const StackRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StackRouter);

export default StackRouterContainer;
