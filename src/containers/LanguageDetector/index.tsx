import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Display from 'components/Display';
import LanguageDisplay from 'components/LanguageDisplay';
import AsyncErrorFallback from 'components/AsyncErrorFallback';
import LanguageDetectorForm from 'components/LanguageDetectorForm';
import { useAsync } from 'hooks/useAsync';
import { detectLanguage } from 'api/detectLanguage';

function LanguageDetector() {
  const [query, setQuery] = useState('');
  const { asyncState, run, reset } = useAsync(detectLanguage, {
    debounceInterval: 5000
  });

  useEffect(() => {
    if (!query) {
      reset();
      return;
    }

    run(query);
  }, [query, run, reset]);

  return (
    <div>
      <LanguageDetectorForm
        onQueryChange={setQuery}
        resetState={reset}
        style={{ marginBottom: '32px' }}
      />
      <ErrorBoundary FallbackComponent={AsyncErrorFallback} onReset={reset} resetKeys={[query]}>
        <Display>
          <LanguageDisplay asyncState={asyncState} />
        </Display>
      </ErrorBoundary>
    </div>
  );
}

export default LanguageDetector;
