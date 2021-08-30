export enum AsyncStatus {
  Idle,
  Pending,
  Resolved,
  Rejected
}
export type AsyncState<DataType> = {
  status: AsyncStatus;
  data?: DataType;
  error?: Error;
};
export enum AsyncActionTypes {
  ASYNC_PENDING = 'ASYNC_PENDING',
  ASYNC_RESOLVED = 'ASYNC_RESOLVED',
  ASYNC_REJECTED = 'ASYNC_REJECTED',
  ASYNC_RESET = 'ASYNC_RESET'
}
export type AsyncAction<DataType> =
  | {
      type: AsyncActionTypes.ASYNC_PENDING;
    }
  | {
      type: AsyncActionTypes.ASYNC_RESOLVED;
      payload: { data: DataType };
    }
  | { type: AsyncActionTypes.ASYNC_REJECTED; payload: { error: Error } }
  | { type: AsyncActionTypes.ASYNC_RESET };
export type AsyncContext<DataType> = {
  asyncState: AsyncState<DataType>;
  dispatch: (action: AsyncAction<DataType>) => void;
};
