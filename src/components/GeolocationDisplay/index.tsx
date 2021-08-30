import { useErrorHandler } from 'react-error-boundary';
import { AsyncStatus } from 'hooks/useAsync';
import { ReactComponent as LoadingIcon } from 'assets/loading.svg';
import AsyncResponse from 'components/AsyncResponse';
import { Geolocation } from 'api/geolocation';
import { AsyncState } from 'contexts/AsyncState/types';
import GeolocationDataView from './GeolocationDataView';

type Props = {
  state: AsyncState<Geolocation>;
};
function GeolocationDisplay({ state: { status, data, error } }: Props) {
  useErrorHandler(error);

  return (
    <>
      <AsyncResponse status={status}>
        <GeolocationDataView geolocation={data} />
      </AsyncResponse>
      <span className={['loading', status === AsyncStatus.Pending ? 'active' : null].join(' ')}>
        <LoadingIcon />
      </span>
    </>
  );
}

export default GeolocationDisplay;
