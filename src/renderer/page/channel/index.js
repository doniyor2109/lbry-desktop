import { connect } from 'react-redux';
import { doFetchClaimsByChannel, doFetchClaimCountByChannel } from 'redux/actions/content';
import { doSetHistoryLastViewed } from 'redux/actions/history';
import {
  makeSelectClaimForUri,
  makeSelectClaimsInChannelForCurrentPage,
  makeSelectFetchingChannelClaims,
  makeSelectCurrentParam,
  makeSelectClaimIsMine,
  selectCurrentParams,
} from 'lbry-redux';
import { doNavigate } from 'redux/actions/navigation';
import { makeSelectTotalPagesForChannel } from 'redux/selectors/content';
import ChannelPage from './view';

const select = (state, props) => ({
  claim: makeSelectClaimForUri(props.uri)(state),
  claimsInChannel: makeSelectClaimsInChannelForCurrentPage(props.uri)(state),
  fetching: makeSelectFetchingChannelClaims(props.uri)(state),
  page: makeSelectCurrentParam('page')(state),
  params: selectCurrentParams(state),
  totalPages: makeSelectTotalPagesForChannel(props.uri)(state),
  channelIsMine: makeSelectClaimIsMine(props.uri)(state),
});

const perform = dispatch => ({
  fetchClaims: (uri, page) => dispatch(doFetchClaimsByChannel(uri, page)),
  fetchClaimCount: uri => dispatch(doFetchClaimCountByChannel(uri)),
  navigate: (path, params) => dispatch(doNavigate(path, params)),
  setLastViewed: claimId => dispatch(doSetHistoryLastViewed(claimId)),
});

export default connect(
  select,
  perform
)(ChannelPage);
