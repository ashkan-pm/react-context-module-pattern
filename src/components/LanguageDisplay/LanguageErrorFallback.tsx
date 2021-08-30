import { FallbackProps } from 'react-error-boundary';

function LanguageDataView({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      There was an error:
      <br />
      {error && (
        <pre style={{ backgroundColor: '#f45656', color: 'white', padding: 12 }}>
          {error.message}
        </pre>
      )}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default LanguageDataView;
