// @flow
import * as actions from 'constants/action_types';
import type { Dispatch } from 'redux/reducers/history';

export function saveHistoryPosition(claimId: String, position: Number) {
  return (dispatch: Dispatch, getState: Function) => {
    const state = getState();
    const claim = state.claims.byId[claimId];
    const outpoint = `${claim.txid}:${claim.nout}`;
    dispatch({
      type: actions.HISTORY_SET_POSITION,
      data: {
        outpoint,
        position,
      },
    });
  };
}
