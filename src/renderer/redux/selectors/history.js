import { createSelector } from 'reselect';
import { makeSelectClaimForUri } from 'lbry-redux';

export const selectHistory = state => state.history || {};

export const makeSelectHistoryForUri = uri =>
  createSelector(
    selectHistory,
    makeSelectClaimForUri(uri),
    (history, claim) => (history[claim.claim_id] ? history[claim.claim_id] : {})
  );

export const makeSelectHistoryPositionForUri = uri =>
  createSelector(makeSelectHistoryForUri(uri), history => history.position || null);

export const makeSelectHistoryLastViewedForUri = uri =>
  createSelector(makeSelectHistoryForUri(uri), history => history.lastViewed || null);

export const selectHistoryLastViewedAll = createSelector(selectHistory, history =>
  Object.keys(history)
    .reduce(
      (acc, key) => [
        ...acc,
        {
          uri: key,
          lastViewed: history[key].lastViewed,
        },
      ],
      []
    )
    .sort((a, b) => a.lastViewed - b.lastViewed)
    .reverse()
);

// Object.keys(history).map(key => ({ [key]: history[key].lastViewed }))
