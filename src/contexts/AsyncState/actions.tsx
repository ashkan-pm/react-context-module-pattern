import { debounce } from 'lodash';
import { AsyncActionTypes, AsyncDispatch } from './types';

let debouncedAsyncExecute: (options: ExecuteOptions<any, any>) => void | undefined;

type ExecuteOptions<DataType, RequestType> = {
  dispatch: AsyncDispatch<DataType>;
  promise: (request: RequestType) => Promise<DataType>;
  request: RequestType;
};

export async function execute<DataType, RequestType>({
  dispatch,
  ...args
}: ExecuteOptions<DataType, RequestType>) {
  dispatch({
    type: AsyncActionTypes.ASYNC_PENDING
  });
  asyncExecute({ dispatch, ...args });
}

export async function debouncedExecute<DataType, RequestType>(
  debounceInterval: number,
  { dispatch, promise, request }: ExecuteOptions<DataType, RequestType>
) {
  let typedDebouncedAsyncExecute = debouncedAsyncExecute as (
    options: ExecuteOptions<DataType, RequestType>
  ) => void;
  if (!debouncedAsyncExecute) {
    debouncedAsyncExecute = debounce<(options: ExecuteOptions<DataType, RequestType>) => void>(
      asyncExecute,
      debounceInterval
    );
    typedDebouncedAsyncExecute = debouncedAsyncExecute;
  }

  dispatch({
    type: AsyncActionTypes.ASYNC_PENDING
  });
  typedDebouncedAsyncExecute({ dispatch, promise, request });
}

async function asyncExecute<DataType, RequestType>({
  dispatch,
  promise,
  request
}: ExecuteOptions<DataType, RequestType>) {
  try {
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
}
