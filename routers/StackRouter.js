import React, {
  PropTypes,
} from 'react';
import {
  View,
  TouchableOpacity,
  NavigationExperimental,
  BackAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { navigate } from '../actions';

import ErrorScene from '../components/ErrorScene';
import { stackRouterPropTypes, routingTargetPropTypes } from '../propTypes';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
} = NavigationExperimental;

class StackRouter extends React.Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.back);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.back);
  }
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
    if (this.props.navigationState.routes.length !== 1) {
      navigate.pop(this.props.navStateName);
      return true;
    }
    return false;
  }

  renderSideComponent = (side, sceneCarrierProps) => {
    if (side !== 'left' && side !== 'right') {
      return null;
    }
    let component = null;
    const sideComponent = sceneCarrierProps[`${side}Component`];
    const sideTitle = sceneCarrierProps[`${side}Title`];
    const sideOnPress = sceneCarrierProps[`${side}OnPress`];
    const sideStyle = sceneCarrierProps[`${side}Style`];
    const sideTitleStyle = sceneCarrierProps[`${side}TitleStyle`];

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

  renderTitleComponent = (sceneProps, sceneCarrierProps) => {
    const title = sceneCarrierProps.title;
    const titleStyle = sceneCarrierProps.titleStyle;

    return (
      <NavigationHeader.Title
        textStyle={[
          { backgroundColor: 'transparent' },
          this.props.titleStyle,
          titleStyle,
        ]}
      >
        {title || sceneProps.scene.route.title || 'Title'}
      </NavigationHeader.Title>
    );
  }

  renderHeader = sceneProps => {
    // FIXME: NavBar update before scene causing glitter.
    const routingTargetCarrier = this.getRoutingTargetCarrier(sceneProps.scene.key);
    if (!routingTargetCarrier) {
      return (
        <NavigationHeader
          style={this.props.navBarStyle}
          {...sceneProps}
          renderTitleComponent={this.renderTitleComponent}
          onNavigateBack={this.back}
        />
      );
    }
    if (this.props.hideNavBar) { return null; }
    if (routingTargetCarrier.props.hideParentNavBar) { return null; }

    const renderTitleComponent =
      () => this.renderTitleComponent(sceneProps, routingTargetCarrier.props);
    const renderRightComponent =
      () => this.renderSideComponent('right', routingTargetCarrier.props);
    const renderLeftComponent =
      routingTargetCarrier.props.leftComponent || routingTargetCarrier.props.leftTitle ?
      () => this.renderSideComponent('left', routingTargetCarrier.props) : undefined;
    return (
      <NavigationHeader
        style={this.props.navBarStyle}
        {...sceneProps}
        renderTitleComponent={renderTitleComponent}
        renderLeftComponent={renderLeftComponent}
        renderRightComponent={renderRightComponent}
        onNavigateBack={this.back}
      />
    );
  }

  renderScene = sceneProps => {
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
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        direction={this.props.direction}
      />
    );
  }
}

StackRouter.propTypes = {
  ...stackRouterPropTypes,
  ...routingTargetPropTypes,
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
