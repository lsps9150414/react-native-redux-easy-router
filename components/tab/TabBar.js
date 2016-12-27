import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import TabIcon from './TabIcon';
import { navigate } from '../../actions';
import { tabBarPropTypes } from '../../propTypes/tab';

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    height: 60,
  },
});

export default class TabBar extends React.Component {
  // TODO: tabIndex => tabKey
  handleTabSelection = (tabKey) => {
    const focusSelectedTab = () => {
      navigate.selectTab(this.props.navStateName, tabKey);
    };
    if (this.props.tabSelectionHandlers[tabKey]) {
      this.props.tabSelectionHandlers[tabKey](focusSelectedTab);
    } else {
      focusSelectedTab();
    }
  }
  renderTabIcons = tabProps => (
    tabProps.map((tab, index) => (
      <TabIcon
        key={`TABS_${index}`}
        tabKey={tabProps[index].tabKey}
        selected={this.props.navigationState.key === tabProps[index].tabKey}
        tabIcon={tabProps[index].tabIcon}
        onPress={this.handleTabSelection}
      />
    ))
  )
  render() {
    return (
      <View
        style={[
          styles.tabBar,
          this.props.style,
        ]}
      >
        {this.renderTabIcons(this.props.tabProps)}
      </View>
    );
  }
}

TabBar.propTypes = {
  ...tabBarPropTypes,
  style: View.propTypes.style,
};

TabBar.defaultProps = {};
