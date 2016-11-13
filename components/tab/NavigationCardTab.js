import React, {
  PropTypes,
} from 'react';

import {
  View,
} from 'react-native';
import { tabBarPropTypes } from '../../propTypes/tab';

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
  ...tabBarPropTypes,
  renderScene: PropTypes.func.isRequired,
  renderTabBar: PropTypes.func.isRequired,
};

NavigationCardTab.defaultProps = {};
