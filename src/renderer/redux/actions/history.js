// @flow
import * as actions from 'constants/action_types';
import type { Dispatch } from 'redux/reducers/history';

export const doSetHistoryPosition = (claimId: String, position: Number) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.SET_HISTORY_POSITION,
    data: {
      claimId,
      position,
    },
  });

export const doSetHistoryLastViewed = (claimId: String) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.SET_HISTORY_LAST_VIEWED,
    data: {
      claimId,
      lastViewed: Date.now(),
    },
  });

export const doClearHistoryClaim = (claimId: String) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.CLEAR_HISTORY_CLAIM,
    data: { claimId },
  });

export const doClearHistoryAll = () => (dispatch: Dispatch) =>
  dispatch({
    type: actions.CLEAR_HISTORY_ALL,
  });
