import React, {
  PropTypes,
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import TabIcon from './TabIcon';
import { navigate } from '../../actions';

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
  handleTabSelection = tabIndex => {
    const focusSelectedTab = () => {
      navigate.selectTab(this.props.navStateName, tabIndex);
    };
    if (this.props.tabSelectionHandlers[tabIndex]) {
      this.props.tabSelectionHandlers[tabIndex](focusSelectedTab);
    } else {
      focusSelectedTab();
    }
  }
  renderTabIcons = tabProps => (
    tabProps.map((tab, index) => (
      <TabIcon
        key={`TABS_${index}`}
        tabIndex={index}
        tabKey={tabProps[index].tabKey}
        selected={this.props.navigationState.index === index}
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
  tabSelectionHandlers: PropTypes.arrayOf(
    PropTypes.func,
  ).isRequired,
  style: View.propTypes.style,
};

TabBar.defaultProps = {};
