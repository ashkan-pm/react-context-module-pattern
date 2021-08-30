import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { AsyncStatus, useAsync } from 'hooks/useAsync';
import { DetectedLanguage, detectLanguage } from 'api/detectLanguage';
import { ReactComponent as LoadingIcon } from 'assets/loading.svg';
import LanguageResponse from './LanguageResponse';
import './styles.css';

type Props = {
  query?: string;
  style?: React.CSSProperties;
};
function LanguageDisplay({ query, style }: Props) {
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
    <div className="LanguageDisplay" style={style}>
      <LanguageResponse status={status} language={data} />
      <span className={['loading', status === AsyncStatus.Pending ? 'active' : null].join(' ')}>
        <LoadingIcon />
      </span>
    </div>
  );
}

export default LanguageDisplay;
