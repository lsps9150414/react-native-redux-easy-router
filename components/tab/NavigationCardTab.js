import React, {
  PropTypes,
} from 'react';
import {
  View,
} from 'react-native';

export default class NavigationCardTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.renderScene(this.props.navigationState)}
        {this.props.renderTabBar(
          this.props.tabProps,
          this.props.navStateName,
          this.props.navigationState,
          this.props.tabSelectionHandlers
        )}
      </View>
    );
  }
}

NavigationCardTab.propTypes = {
  navStateName: PropTypes.string.isRequired,
  navigationState: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
  tabProps: PropTypes.arrayOf(
    PropTypes.shape({
      tabKey: PropTypes.string,
      tabIcon: PropTypes.func,
    })
  ).isRequired,
  renderScene: PropTypes.func.isRequired,
  renderTabBar: PropTypes.func.isRequired,
  tabSelectionHandlers: PropTypes.arrayOf(
    PropTypes.func,
  ).isRequired,
};

NavigationCardTab.defaultProps = {};
