import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Display from 'components/Display';
import LanguageDisplay from 'components/LanguageDisplay';
import AsyncErrorFallback from 'components/AsyncErrorFallback';
import LanguageDetectorForm from 'components/LanguageDetectorForm';
import { AsyncStateProvider } from 'contexts/AsyncState';

function LanguageDetector() {
  const [query, setQuery] = useState('');

  function handleReset() {
    setQuery('');
  }

  return (
    <div>
      <LanguageDetectorForm
        query={query}
        onQueryChange={setQuery}
        style={{ marginBottom: '32px' }}
      />
      <ErrorBoundary
        FallbackComponent={AsyncErrorFallback}
        onReset={handleReset}
        resetKeys={[query]}
      >
        <AsyncStateProvider>
          <Display>
            <LanguageDisplay query={query} />
          </Display>
        </AsyncStateProvider>
      </ErrorBoundary>
    </div>
  );
}

export default LanguageDetector;
