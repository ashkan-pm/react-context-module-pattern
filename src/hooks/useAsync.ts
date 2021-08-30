import { useCallback, useRef } from 'react';
import {
  useAsyncState,
  debouncedExecute,
  execute,
  DebouncedAsyncExecute
} from 'contexts/AsyncState';

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
  onReset?: () => void;
};
export function useAsync<DataType, RequestType>(
  promise: (request: RequestType) => Promise<DataType>,
  { debounceInterval = 0 }: Options = {}
) {
  const { asyncState, dispatch } = useAsyncState<DataType>();
  const debouncedExecuteRef = useRef<DebouncedAsyncExecute<DataType, RequestType>>();

  const run = useCallback(
    (request: RequestType) => {
      if (debounceInterval) {
        debouncedExecuteRef.current = debouncedExecute(debounceInterval, {
          dispatch,
          promise,
          request
        });
        return;
      }

      execute({ dispatch, promise, request });
    },
    [dispatch, promise, debounceInterval]
  );

  const reset = useCallback(() => {
    if (debouncedExecuteRef.current) debouncedExecuteRef.current.cancel();
    dispatch({
      type: AsyncActionTypes.ASYNC_RESET
    });
  }, [dispatch]);

  return { asyncState, run, reset };
}
