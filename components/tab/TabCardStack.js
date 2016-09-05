import React, {
  PropTypes,
} from 'react';
import {
  View,
} from 'react-native';

import TabIcon from './TabIcon';

export default class TabCardStack extends React.Component {
  handleTabSelection = tabIndex => {
    const focusSelectedTab = () => {
      this.props.navigate.selectTab(this.props.navStateName, tabIndex);
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
          style={{
            position: 'absolute',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderTopWidth: 0.5,
            borderColor: 'gray',
            bottom: 0, left: 0, right: 0,
            height: 60,
          }}
        >
          {this.renderTabIcons(tabIcons, tabKeys)}
        </View>
      </View>
    );
  }
}

TabCardStack.propTypes = {
  navigate: PropTypes.object.isRequired,
  navigationState: PropTypes.object.isRequired,
  navStateName: PropTypes.string.isRequired,
  renderScene: PropTypes.func.isRequired,
  getTabProps: PropTypes.func.isRequired,
  getTabSelectionHandlers: PropTypes.func.isRequired,
};

TabCardStack.defaultProps = {};
