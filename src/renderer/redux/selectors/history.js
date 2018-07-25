import { createSelector } from 'reselect';
import { makeSelectClaimForUri } from 'lbry-redux';

const selectState = state => state.history || {};

export const makeSelectHistoryPositionForUri = uri =>
  createSelector(
    selectState,
    makeSelectClaimForUri(uri),
    (state, claim) => (state[claim.claim_id] ? state[claim.claim_id].position : null)
  );
