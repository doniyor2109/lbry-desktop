// @flow
import * as actions from 'constants/action_types';
import type { Dispatch } from 'redux/reducers/media';

export function savePosition(claimId: String, position: Number) {
  return (dispatch: Dispatch, getState: Function) => {
    const state = getState();
    const claim = state.claims.byId[claimId];
    const outpoint = `${claim.txid}:${claim.nout}`;
    dispatch({
      type: actions.MEDIA_POSITION,
      data: {
        outpoint,
        position,
      },
    });
  };
}
