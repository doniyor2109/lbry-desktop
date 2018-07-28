// @flow
import * as actions from 'constants/action_types';
import { handleActions } from 'util/redux-utils';

export type HistoryState = {
  [string]: {
    position: number,
    lastViewed: number,
  },
};

export type Action = any;
export type Dispatch = (action: Action) => any;

const defaultState = {};

export default handleActions(
  {
    [actions.SET_HISTORY_POSITION]: (state: HistoryState, action: Action) => {
      const { uri, position } = action.data;
      return { ...state, [uri]: { ...state[uri], position } };
    },

    [actions.SET_HISTORY_LAST_VIEWED]: (state: HistoryState, action: Action) => {
      const { uri, lastViewed } = action.data;
      return { ...state, [uri]: { ...state[uri], lastViewed } };
    },

    [actions.CLEAR_HISTORY_CLAIM]: (state: HistoryState, action: Action) => {
      const newState = state;
      delete newState[action.data.uri];
      return { ...newState };
    },

    [actions.CLEAR_HISTORY_ALL]: () => ({}),
  },
  defaultState
);
