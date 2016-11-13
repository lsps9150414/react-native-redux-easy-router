import React, {
  PropTypes,
} from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

export default class TabIcon extends React.Component {
  handleOnPress = () => {
    this.props.onPress(this.props.tabIndex);
  }
  render() {
    const themeColor = this.props.selected ? 'red' : 'gray';
    const CustomTabIcon = this.props.tabIcon;
    const defaultIcon = CustomTabIcon ? (
      <CustomTabIcon tabKey={this.props.tabKey} selected={this.props.selected} />
    ) : (
      <Text style={{ color: themeColor, fontSize: 12 }}>
        {`Tab ${this.props.tabIndex + 1}`}
      </Text>
    );
    return (
      <TouchableOpacity
        onPress={this.handleOnPress}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {defaultIcon}
      </TouchableOpacity>
    );
  }
}

TabIcon.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  tabKey: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  tabIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  onPress: PropTypes.func.isRequired,
};

TabIcon.defaultProps = {};
