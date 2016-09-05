import { NavigationExperimental } from 'react-native';
import { handleActions } from 'redux-actions';

import { NAVIGATION_ACTIONS } from '../actions';
const { StateUtils } = NavigationExperimental;

export const createNavigationReducer = initialState => handleActions(
  {
    [NAVIGATION_ACTIONS.POP]: (state, action) => ({
      ...state,
      ...{ [action.targetRouterKey]: StateUtils.pop(state[action.targetRouterKey]) },
    }),
    [NAVIGATION_ACTIONS.PUSH]: (state, action) => ({
      ...state,
      ...{ [action.targetRouterKey]: StateUtils.push(state[action.targetRouterKey], action.route) },
    }),
    [NAVIGATION_ACTIONS.REPLACE]: (state, action) => ({
      ...state,
      ...{
        [action.targetRouterKey]: StateUtils.replaceAt(
          state[action.targetRouterKey],
          action.key,
          action.route
        ),
      },
    }),
    [NAVIGATION_ACTIONS.SELECT_TAB]: (state, action) => ({
      ...state,
      [action.targetRouterKey]: { ...state[action.targetRouterKey], index: action.index },
    }),
  },
  initialState
);
