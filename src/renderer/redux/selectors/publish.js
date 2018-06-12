import { createSelector } from 'reselect';
import { parseURI, selectClaimsById, selectMyClaims } from 'lbry-redux';

const selectState = state => state.publish || {};

export const selectPendingPublishes = createSelector(
  selectState,
  state => state.pendingPublishes.map(pendingClaim => ({ ...pendingClaim, pending: true })) || []
);

export const selectPublishFormValues = createSelector(selectState, state => {
  const { pendingPublish, ...formValues } = state;
  return formValues;
});

export const selectPendingPublish = uri =>
  createSelector(selectPendingPublishes, pendingPublishes => {
    const { claimName, contentName } = parseURI(uri);

    if (!pendingPublishes.length) {
      return null;
    }

    return pendingPublishes.filter(
      publish => (publish.name === claimName || publish.name === contentName) && !publish.isEdit
    )[0];
  });

// Is the current uri the same as the uri they clicked "edit" on
export const selectIsStillEditing = createSelector(selectPublishFormValues, publishState => {
  const { editingURI, uri } = publishState;

  const { isChannel: currentIsChannel, claimName: currentClaimName, contentName: currentContentName } = parseURI(uri);
  const { isChannel: editIsChannel, claimName: editClaimName, contentName: editContentName } = parseURI(editingURI);
  
  // Depending on the previous/current use of a channel, we need to compare different things
  // ex: going from a channel to anonymous, the new uri won't return contentName, so we need to use claimName
  if (!currentIsChannel && editIsChannel) {
    return currentClaimName === editContentName;
  } else if (currentIsChannel && !editIsChannel) {
    return currentContentName === editClaimName;
  } else if (!currentIsChannel && !editIsChannel) {
    return currentClaimName === editClaimName;
  } else {
    return currentContentName === editContentName;
  }
});

export const selectMyClaimForUri = createSelector(
  selectPublishFormValues,
  selectIsStillEditing,
  selectClaimsById,
  selectMyClaims,
  ({ editingURI, uri }, isStillEditing, claimsById, myClaims) => {
    const {  contentName: currentContentName } = parseURI(uri);
    const { claimId: editClaimId } = parseURI(editingURI);
    let myClaimForUri;

    if (isStillEditing) {
      // They clicked "edit" from the file page
      // They haven't changed the channel/name after clicking edit
      // Get the claim so they can edit without re-uploading a new file
      myClaimForUri = claimsById[editClaimId];
    } else {
      // Check if they have a previous claim based on the channel/name
      myClaimForUri = myClaims.find(
        claim => claim.name === currentContentName
      );
    }

    return myClaimForUri;
  }
);