// @flow
import * as actions from 'constants/action_types';
import type { Dispatch } from 'redux/reducers/history';

export const doSetHistoryPosition = (uri: String, position: Number) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.SET_HISTORY_POSITION,
    data: {
      uri,
      position,
    },
  });

export const doSetHistoryLastViewed = (uri: String) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.SET_HISTORY_LAST_VIEWED,
    data: {
      uri,
      lastViewed: Date.now(),
    },
  });

export const doClearHistoryClaim = (uri: String) => (dispatch: Dispatch) => {
  console.log('doClearHistoryClaim uri:', uri);
  dispatch({
    type: actions.CLEAR_HISTORY_CLAIM,
    data: { uri },
  });
};

export const doClearHistoryAll = () => (dispatch: Dispatch) =>
  dispatch({
    type: actions.CLEAR_HISTORY_ALL,
  });
