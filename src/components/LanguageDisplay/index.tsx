import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { AsyncStatus, useAsync } from 'hooks/useAsync';
import { DetectedLanguage, detectLanguage } from 'api/detectLanguage';
import { ReactComponent as LoadingIcon } from 'assets/loading.svg';
import AsyncResponse from 'components/AsyncResponse';
import LanguageDataView from './LanguageDataView';

type Props = {
  query?: string;
};
function LanguageDisplay({ query }: Props) {
  const { asyncState, run, reset } = useAsync<string, DetectedLanguage>(detectLanguage, {
    debounceInterval: 1000
  });
  const { data, status, error } = asyncState;
  useErrorHandler(error);

  useEffect(() => {
    if (!query) {
      reset();
      return;
    }

    run(query);
  }, [query, run, reset]);

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
