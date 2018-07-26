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
    [actions.HISTORY_SET_POSITION]: (state: HistoryState, action: Action) => {
      const { claimId, position } = action.data;
      return {
        ...state,
        [claimId]: {
          ...state[claimId],
          position,
        },
      };
    },
  },
  defaultState
);
