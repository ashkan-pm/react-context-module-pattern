import { useCallback } from 'react';
import { debounce } from 'lodash';
import { useAsyncState } from 'contexts/AsyncState';
import { AsyncContext } from 'contexts/AsyncState/types';

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
    async (request: RequestType) => {
      try {
        dispatch({
          type: AsyncActionTypes.ASYNC_PENDING
        });
        const data = await promise(request);
        dispatch({
          type: AsyncActionTypes.ASYNC_RESOLVED,
          payload: { data }
        });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: AsyncActionTypes.ASYNC_REJECTED,
            payload: { error }
          });
        }
      }
    },
    [promise, dispatch]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(run, debounceInterval), [
    run,
    debounceInterval,
    dispatch
  ]);
  const debouncedRun = useCallback(
    (request: RequestType) => {
      dispatch({
        type: AsyncActionTypes.ASYNC_PENDING
      });
      debouncedCallback(request);
    },
    [debouncedCallback, dispatch]
  );

  const reset = useCallback(
    () =>
      dispatch({
        type: AsyncActionTypes.ASYNC_RESET
      }),
    [dispatch]
  );

  return { asyncState, run: !debounceInterval ? run : debouncedRun, reset };
}
