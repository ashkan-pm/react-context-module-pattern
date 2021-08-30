import { ErrorBoundary } from 'react-error-boundary';
import Display from 'components/Display';
import GeolocationDisplay from 'components/GeolocationDisplay';
import AsyncErrorFallback from 'components/AsyncErrorFallback';
import Button from 'components/Button';
import { useAsync } from 'hooks/useAsync';
import { geolocate } from 'api/geolocation';

function Geolocation() {
  const { asyncState, run, reset } = useAsync(geolocate, { debounceInterval: 1000 });

  return (
    <div style={{ textAlign: 'center' }}>
      <Button onClick={run} style={{ marginBottom: '32px' }}>
        Get my location!
      </Button>
      <ErrorBoundary FallbackComponent={AsyncErrorFallback} onReset={reset}>
        <Display>
          <GeolocationDisplay state={asyncState} />
        </Display>
      </ErrorBoundary>
    </div>
  );
}

export default Geolocation;
