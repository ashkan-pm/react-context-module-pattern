import { AsyncStatus } from 'hooks/useAsync';

type Props = {
  status: AsyncStatus;
  children: JSX.Element;
};
function AsyncResponse({ status, children }: Props) {
  switch (status) {
    case AsyncStatus.Idle:
      return <span>Submit a query</span>;
    case AsyncStatus.Resolved:
      return children;
    default:
      return null;
  }
}

export default AsyncResponse;
