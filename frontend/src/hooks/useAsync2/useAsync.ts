import { useCallback, useReducer } from 'react';
import useSafeDispatch from 'hooks/useSafeDispatch';
import { AsyncStatusEnum } from 'hooks/useAsync2/Enums/AsyncStatusEnum';

type State<T> = {
  status: AsyncStatusEnum;
  data?: T;
  error?: Error;
};

type Action<T> =
  | { type: AsyncStatusEnum.Pending }
  | { type: AsyncStatusEnum.Resolved; data: T }
  | { type: AsyncStatusEnum.Rejected; error: Error };

const asyncReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case AsyncStatusEnum.Pending: {
      return { status: AsyncStatusEnum.Pending };
    }

    case AsyncStatusEnum.Resolved: {
      return { status: AsyncStatusEnum.Resolved, data: action.data };
    }

    case AsyncStatusEnum.Rejected: {
      return { status: AsyncStatusEnum.Rejected, error: action.error };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

/**
 * Monitors an async promise. Pass your promise to the 'run'
 * returned function.
 *
 * @param {{status, ?data, ?error}} initialState object with initial status and data.
 *
 * @returns {object} {run, status, data, error, setData, setError}.
 * @returns status can be 'idle', 'pending', 'resolved', 'rejected'.
 */
export const useAsync = <T = undefined>(initialState?: State<T>) => {
  const typedReducer = (arg1: any, arg2: any) => asyncReducer<T>(arg1, arg2);
  const [state, unsafeDispatch] = useReducer(typedReducer, {
    status: AsyncStatusEnum.Idle,
    ...initialState,
  });

  const dispatch = useSafeDispatch<Action<T>>(unsafeDispatch);

  const { data, error, status } = state;

  const run = useCallback(
    (promise: Promise<T>) => {
      dispatch({ type: AsyncStatusEnum.Pending });
      promise.then(
        (dataReceived: T) => {
          dispatch({
            type: AsyncStatusEnum.Resolved,
            data: dataReceived,
          });
        },
        (error: Error) => {
          dispatch({ type: AsyncStatusEnum.Rejected, error });
        }
      );
    },
    [dispatch]
  );

  const setData = useCallback((data: T) => dispatch({ type: AsyncStatusEnum.Resolved, data }), [dispatch]);

  const setError = useCallback((error: Error) => dispatch({ type: AsyncStatusEnum.Rejected, error }), [dispatch]);

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  };
};
