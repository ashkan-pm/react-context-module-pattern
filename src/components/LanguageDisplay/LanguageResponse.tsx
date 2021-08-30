import { DetectedLanguage } from 'api/detectLanguage';
import { AsyncStatus } from 'hooks/useAsync';
import LanguageDataView from './LanguageDataView';

type Props = {
  status: AsyncStatus;
  language?: DetectedLanguage;
};
function LanguageResponse({ status, language }: Props) {
  switch (status) {
    case AsyncStatus.Idle:
      return <span>Submit a query</span>;
    case AsyncStatus.Resolved:
      return <LanguageDataView language={language} />;
    default:
      return null;
  }
}

export default LanguageResponse;
