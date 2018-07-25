import { createSelector } from 'reselect';
import { makeSelectClaimForUri } from 'lbry-redux';

const selectState = state => state.history || {};

export const makeSelectHistoryPositionForUri = uri =>
  createSelector(selectState, makeSelectClaimForUri(uri), (state, claim) => {
    const outpoint = `${claim.txid}:${claim.nout}`;
    return state.positions[outpoint] || null;
  });
