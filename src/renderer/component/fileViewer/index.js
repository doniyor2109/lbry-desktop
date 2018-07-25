import { connect } from 'react-redux';
import * as settings from 'constants/settings';
import { doChangeVolume } from 'redux/actions/app';
import { selectVolume } from 'redux/selectors/app';
import { doPlayUri, doSetPlayingUri } from 'redux/actions/content';
import { savePosition } from 'redux/actions/media';
import {
  makeSelectMetadataForUri,
  makeSelectContentTypeForUri,
  makeSelectCostInfoForUri,
  makeSelectClaimForUri,
  makeSelectFileInfoForUri,
  makeSelectLoadingForUri,
  makeSelectDownloadingForUri,
  selectSearchBarFocused,
} from 'lbry-redux';
import { makeSelectClientSetting, selectShowNsfw } from 'redux/selectors/settings';
import { makeSelectMediaPositionForUri } from 'redux/selectors/media';
import { selectPlayingUri } from 'redux/selectors/content';
import { selectFileInfoErrors } from 'redux/selectors/file_info';
import FileViewer from './view';

const select = (state, props) => ({
  claim: makeSelectClaimForUri(props.uri)(state),
  costInfo: makeSelectCostInfoForUri(props.uri)(state),
  fileInfo: makeSelectFileInfoForUri(props.uri)(state),
  metadata: makeSelectMetadataForUri(props.uri)(state),
  obscureNsfw: !selectShowNsfw(state),
  isLoading: makeSelectLoadingForUri(props.uri)(state),
  isDownloading: makeSelectDownloadingForUri(props.uri)(state),
  playingUri: selectPlayingUri(state),
  contentType: makeSelectContentTypeForUri(props.uri)(state),
  volume: selectVolume(state),
  mediaPosition: makeSelectMediaPositionForUri(props.uri)(state),
  autoplay: makeSelectClientSetting(settings.AUTOPLAY)(state),
  searchBarFocused: selectSearchBarFocused(state),
  fileInfoErrors: selectFileInfoErrors(state),
});

const perform = dispatch => ({
  play: uri => dispatch(doPlayUri(uri)),
  cancelPlay: () => dispatch(doSetPlayingUri(null)),
  changeVolume: volume => dispatch(doChangeVolume(volume)),
  savePosition: (claimId, position) => dispatch(savePosition(claimId, position)),
});

export default connect(
  select,
  perform
)(FileViewer);
