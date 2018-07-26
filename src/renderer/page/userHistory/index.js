import React from 'react';
import { connect } from 'react-redux';
import { selectHistoryLastViewedAll } from 'redux/selectors/history';
import { doClearHistoryClaim } from 'redux/actions/history';
import { doNavigate } from 'redux/actions/navigation';
import { selectClaimsById } from 'lbry-redux';
import UserHistoryPage from './view';

const select = state => ({
  history: selectHistoryLastViewedAll(state),
  claimsById: selectClaimsById(state),
});

const perform = dispatch => ({
  navigate: path => dispatch(doNavigate(path)),
  clear: uri => dispatch(doUserHistoryClearItem(uri)),
});

export default connect(
  select,
  perform
)(UserHistoryPage);
