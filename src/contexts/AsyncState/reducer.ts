import { AsyncStatus } from 'hooks/useAsync';
import { AsyncAction, AsyncActionTypes, AsyncState } from './types';

export function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>
): AsyncState<DataType> {
  switch (action.type) {
    case AsyncActionTypes.ASYNC_PENDING:
      return { status: AsyncStatus.Pending };
    case AsyncActionTypes.ASYNC_RESOLVED:
      const { data } = action.payload;
      return { status: AsyncStatus.Resolved, data };
    case AsyncActionTypes.ASYNC_REJECTED:
      const { error } = action.payload;
      return { status: AsyncStatus.Rejected, error };
    case AsyncActionTypes.ASYNC_RESET:
      return { status: AsyncStatus.Idle };
    default:
      return state;
  }
}
