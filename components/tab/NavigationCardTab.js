import React, {
  PropTypes,
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    height: 60,
  },
});

import TabIcon from './TabIcon';
import { navigate } from '../../actions';

export default class NavigationCardTab extends React.Component {
  handleTabSelection = tabIndex => {
    const focusSelectedTab = () => {
      navigate.selectTab(this.props.navStateName, tabIndex);
    };
    const tabSelectionHandlers = this.props.getTabSelectionHandlers();
    if (tabSelectionHandlers[tabIndex]) {
      tabSelectionHandlers[tabIndex](focusSelectedTab);
    } else {
      focusSelectedTab();
    }
  }
  renderTabIcons = (tabIcons, tabKeys) => (
    tabIcons.map((tabIcon, index) => (
      <TabIcon
        key={`TABS_${index}`}
        tabIndex={index}
        tabKey={tabKeys[index]}
        selected={this.props.navigationState.index === index}
        tabIcon={tabIcon}
        onPress={this.handleTabSelection}
      />
    ))
  )
  render() {
    const tabProps = this.props.getTabProps();
    const tabIcons = tabProps.map(tab => tab.tabIcon);
    const tabKeys = tabProps.map(tab => tab.tabKey);
    return (
      <View style={{ flex: 1 }}>
        {this.props.renderScene(this.props.navigationState)}
        <View
          style={[
            styles.tabBar,
            this.props.tabBarStyle,
          ]}
        >
          {this.renderTabIcons(tabIcons, tabKeys)}
        </View>
      </View>
    );
  }
}

NavigationCardTab.propTypes = {
  navigationState: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
  navStateName: PropTypes.string.isRequired,
  renderScene: PropTypes.func.isRequired,
  getTabProps: PropTypes.func.isRequired,
  getTabSelectionHandlers: PropTypes.func.isRequired,
  tabBarStyle: View.propTypes.style,
};

NavigationCardTab.defaultProps = {};
