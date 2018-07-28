import React from 'react';
import { connect } from 'react-redux';
import { selectHistory, selectHistoryLastViewedAll } from 'redux/selectors/history';
import { doClearHistoryClaim } from 'redux/actions/history';
import { doNavigate } from 'redux/actions/navigation';
import UserHistoryPage from './view';

const select = state => ({
  history: selectHistory(state),
  history2: selectHistoryLastViewedAll(state),
});

const perform = dispatch => ({
  navigate: path => dispatch(doNavigate(path)),
  clearItem: uri => dispatch(doUserHistoryClearItem(uri)),
});

export default connect(
  select,
  perform
)(UserHistoryPage);
