import { PropTypes } from 'react';

export const tabBarPropTypes = {
  navStateName: PropTypes.string.isRequired,
  navigationState: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
  tabProps: PropTypes.arrayOf(
    PropTypes.shape({
      tabKey: PropTypes.string,
      tabIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    })
  ).isRequired,
  tabSelectionHandlers: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  ).isRequired,
};
