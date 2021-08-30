import { useCallback } from 'react';
import { useAsyncState } from 'contexts/AsyncState';
import { AsyncContext } from 'contexts/AsyncState/types';
import { debouncedExecute, execute } from 'contexts/AsyncState/actions';

export enum AsyncStatus {
  Idle,
  Pending,
  Resolved,
  Rejected
}
enum AsyncActionTypes {
  ASYNC_PENDING = 'ASYNC_PENDING',
  ASYNC_RESOLVED = 'ASYNC_RESOLVED',
  ASYNC_REJECTED = 'ASYNC_REJECTED',
  ASYNC_RESET = 'ASYNC_RESET'
}

type Options = {
  debounceInterval?: number;
};
export function useAsync<RequestType, DataType>(
  promise: (request: RequestType) => Promise<DataType>,
  { debounceInterval = 0 }: Options = {}
) {
  const { asyncState, dispatch } = useAsyncState<DataType>() as unknown as AsyncContext<DataType>;

  const run = useCallback(
    (request: RequestType) =>
      debounceInterval
        ? debouncedExecute(debounceInterval, { dispatch, promise, request })
        : execute({ dispatch, promise, request }),
    [dispatch, promise, debounceInterval]
  );

  const reset = useCallback(
    () =>
      dispatch({
        type: AsyncActionTypes.ASYNC_RESET
      }),
    [dispatch]
  );

  return { asyncState, run, reset };
}
