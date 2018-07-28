import React from 'react';
import FileCard from 'component/fileCard';
import Page from 'component/page';
import moment from 'moment';
import { Claim } from 'types/claim';

type Props = {
  history: Array<{ string: number }>,
  navigate: string => void,
  clear: string => void,
};

class UserHistoryPage extends React.PureComponent<Props> {
  render() {
    const { history, history2, navigate, clearItem } = this.props;
    // const uris = Object.keys(history);

    console.log('history', history);

    return (
      <Page>
        <div className="card__list">
          {history2 && history2.length ? (
            history2.map(item => <FileCard key={item.uri} uri={item.uri} history={item} />)
          ) : (
            <p className="card__subtitle">
              {__('You have no saved history. Go')}{' '}
              <Button button="link" label={__('explore')} onClick={() => navigate('/discover')} />{' '}
              {__('the content available on LBRY!')}
            </p>
          )}
        </div>
      </Page>
    );
  }
}
export default UserHistoryPage;
