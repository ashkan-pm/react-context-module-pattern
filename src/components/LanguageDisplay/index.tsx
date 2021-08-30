import { useErrorHandler } from 'react-error-boundary';
import { AsyncStatus } from 'hooks/useAsync';
import { ReactComponent as LoadingIcon } from 'assets/loading.svg';
import AsyncResponse from 'components/AsyncResponse';
import LanguageDataView from './LanguageDataView';
import { AsyncState } from 'contexts/AsyncState/types';
import { DetectedLanguage } from 'api/detectLanguage';

type Props = {
  asyncState: AsyncState<DetectedLanguage>;
};
function LanguageDisplay({ asyncState: { status, data, error } }: Props) {
  useErrorHandler(error);
  return (
    <>
      <AsyncResponse status={status}>
        <LanguageDataView language={data} />
      </AsyncResponse>
      <span className={['loading', status === AsyncStatus.Pending ? 'active' : null].join(' ')}>
        <LoadingIcon />
      </span>
    </>
  );
}

export default LanguageDisplay;
