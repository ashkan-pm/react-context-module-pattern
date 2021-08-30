import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import LanguageDisplay from 'components/LanguageDisplay';
import LanguageErrorFallback from 'components/LanguageDisplay/LanguageErrorFallback';
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
        FallbackComponent={LanguageErrorFallback}
        onReset={handleReset}
        resetKeys={[query]}
      >
        <AsyncStateProvider>
          <LanguageDisplay query={query} />
        </AsyncStateProvider>
      </ErrorBoundary>
    </div>
  );
}

export default LanguageDetector;
