import { debounce, DebouncedFunc } from 'lodash';
import { AsyncActionTypes, AsyncDispatch } from './types';

export type DebouncedAsyncExecute<DataType, RequestType> = DebouncedFunc<
  (options: ExecuteOptions<DataType, RequestType>) => void
>;
let debouncedAsyncExecute: DebouncedAsyncExecute<any, any>;

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

export function debouncedExecute<DataType, RequestType>(
  debounceInterval: number,
  { dispatch, promise, request }: ExecuteOptions<DataType, RequestType>
): DebouncedAsyncExecute<DataType, RequestType> {
  let typedDebouncedAsyncExecute = debouncedAsyncExecute as DebouncedAsyncExecute<
    DataType,
    RequestType
  >;
  if (!debouncedAsyncExecute) {
    debouncedAsyncExecute = debounce(asyncExecute, debounceInterval);
    typedDebouncedAsyncExecute = debouncedAsyncExecute;
  }

  dispatch({
    type: AsyncActionTypes.ASYNC_PENDING
  });
  typedDebouncedAsyncExecute({ dispatch, promise, request });
  return typedDebouncedAsyncExecute;
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
