import { createSelector } from 'reselect';
import { makeSelectClaimForUri } from 'lbry-redux';

const selectState = state => state.history || {};

export const makeSelectHistoryForUri = uri =>
  createSelector(
    selectState,
    makeSelectClaimForUri(uri),
    (history, claim) => (history[claim.claim_id] ? history[claim.claim_id] : {})
  );

export const makeSelectHistoryPositionForUri = uri =>
  createSelector(makeSelectHistoryForUri(uri), history => history.position || null);

export const makeSelectHistoryLastViewedForUri = uri =>
  createSelector(makeSelectHistoryForUri(uri), history => history.lastViewed || null);

export const selectHistoryLastViewedAll = createSelector(selectState, history =>
  Object.keys(history).map(key => ({ [key]: history[key].lastViewed }))
);
