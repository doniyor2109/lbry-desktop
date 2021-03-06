// @flow
import React from 'react';
import Button from 'component/button';
import * as icons from 'constants/icons';
import ToolTip from 'component/common/tooltip';

type Props = {
  uri: string,
  downloading: boolean,
  fileInfo: ?{
    written_bytes: number,
    total_bytes: number,
    outpoint: number,
    download_path: string,
    completed: boolean,
  },
  loading: boolean,
  costInfo: ?{},
  restartDownload: (string, number) => void,
  openInShell: string => void,
  purchaseUri: string => void,
  doPause: () => void,
};

class FileDownloadLink extends React.PureComponent<Props> {
  componentWillUpdate() {
    const { downloading, fileInfo, uri, restartDownload } = this.props;
    if (
      !downloading &&
      fileInfo &&
      !fileInfo.completed &&
      fileInfo.written_bytes !== false &&
      fileInfo.written_bytes < fileInfo.total_bytes
    ) {
      restartDownload(uri, fileInfo.outpoint);
    }
  }

  uri: ?string;

  render() {
    const {
      fileInfo,
      downloading,
      uri,
      openInShell,
      purchaseUri,
      costInfo,
      loading,
      doPause,
    } = this.props;

    const openFile = () => {
      if (fileInfo) {
        openInShell(fileInfo.download_path);
        doPause();
      }
    };

    if (loading || downloading) {
      const progress =
        fileInfo && fileInfo.written_bytes
          ? (fileInfo.written_bytes / fileInfo.total_bytes) * 100
          : 0;
      const label = fileInfo
        ? __('Downloading: ') + progress.toFixed(0) + __('% complete')
        : __('Connecting...');

      return <span className="file-download">{label}</span>;
    } else if (fileInfo === null && !downloading) {
      if (!costInfo) {
        return null;
      }

      return (
        <ToolTip onComponent body={__('Download')}>
          <Button
            button="alt"
            icon={icons.DOWNLOAD}
            iconColor="green"
            onClick={() => {
              purchaseUri(uri);
            }}
          />
        </ToolTip>
      );
    } else if (fileInfo && fileInfo.download_path) {
      return (
        <ToolTip onComponent body={__('Open file')}>
          <Button button="alt" iconColor="green" icon={icons.LOCAL} onClick={() => openFile()} />
        </ToolTip>
      );
    }

    return null;
  }
}

export default FileDownloadLink;
