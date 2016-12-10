import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class ErrorScene extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`Routing target with key: '${this.props.sceneKey}' is not provided.`}</Text>
      </View>
    );
  }
}

ErrorScene.propTypes = {
  sceneKey: PropTypes.string.isRequired,
};
