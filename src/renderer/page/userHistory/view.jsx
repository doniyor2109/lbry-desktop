import React from 'react';
import FileTile from 'component/fileTile';
import Page from 'component/page';
import moment from 'moment';
import { Claim } from 'types/claim';

type Props = {
  history: Array<{ string: number }>,
  claimsById: Array<{ string: Claim }>,
  navigate: string => void,
  clear: string => void,
};

class UserHistoryPage extends React.PureComponent<Props> {
  render() {
    const { history, navigate, clear, claimsById } = this.props;

    console.log('claimsById', claimsById);
    console.log('history', history);

    return (
      <Page>
        {history.map(item => (
          <FileTile
            uri={`lbry://${claimsById[item.id] ? claimsById[item.id].name : 'wat'}#{item.id}`}
          />
        ))}
      </Page>
    );
  }
}
export default UserHistoryPage;
