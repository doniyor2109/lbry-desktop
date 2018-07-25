// @flow
import * as actions from 'constants/action_types';
import { handleActions } from 'util/redux-utils';

export type MediaState = {
  positions: {
    [string]: number,
  },
};

export type Action = any;
export type Dispatch = (action: Action) => any;

const defaultState = { positions: {} };

export default handleActions(
  {
    [actions.MEDIA_POSITION]: (state: MediaState, action: Action) => {
      const { outpoint, position } = action.data;
      return {
        ...state,
        positions: {
          ...state.positions,
          [outpoint]: position,
        },
      };
    },
  },
  defaultState
);
