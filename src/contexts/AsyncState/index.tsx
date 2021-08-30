import { Reducer, useReducer, ReactNode, useContext, createContext, Context } from 'react';
import { AsyncStatus } from 'hooks/useAsync';
import { AsyncContext, AsyncAction, AsyncState } from './types';
import { asyncReducer } from './reducer';
import { execute, debouncedExecute } from './actions';

const AsyncStateContext = createContext<AsyncContext<any> | undefined>(undefined);
AsyncStateContext.displayName = 'AsyncStateContext';

type Props<DataType> = {
  initialState?: AsyncState<DataType>;
  initializer?: (initialState: AsyncState<DataType>) => AsyncState<DataType>;
  children?: ReactNode;
};
export function AsyncStateProvider<DataType>({
  initialState = { status: AsyncStatus.Idle },
  initializer = (state) => state,
  children
}: Props<DataType> = {}) {
  const TypedAsyncStateContext = AsyncStateContext as Context<AsyncContext<DataType>>;
  const [asyncState, dispatch] = useReducer<
    Reducer<AsyncState<DataType>, AsyncAction<DataType>>,
    AsyncState<DataType>
  >(asyncReducer, initialState, initializer);

  return (
    <TypedAsyncStateContext.Provider value={{ asyncState, dispatch }}>
      {children}
    </TypedAsyncStateContext.Provider>
  );
}

export function useAsyncState<DataType>() {
  let value = useContext(AsyncStateContext as Context<AsyncContext<DataType> | undefined>);
  if (value === undefined) {
    throw new Error('useAsyncState must be used within a AsyncStateProvider');
  }

  return value;
}

export type { AsyncContext };
export { debouncedExecute, execute };
