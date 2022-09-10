/* eslint-disable no-shadow */
import { useCallback, useReducer } from 'react';

import useSafeDispatch from '../useSafeDispatch';
import EnumStatus from './EnumStatus';

type State<T> = {
  status: EnumStatus;
  data?: T;
  error?: Error;
};

type Action<T> =
  | { type: EnumStatus.Pending }
  | { type: EnumStatus.Resolved; data: T }
  | { type: EnumStatus.Rejected; error: Error };

const asyncReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case EnumStatus.Pending: {
      return { status: EnumStatus.Pending };
    }

    case EnumStatus.Resolved: {
      return { status: EnumStatus.Resolved, data: action.data };
    }

    case EnumStatus.Rejected: {
      return { status: EnumStatus.Rejected, error: action.error };
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
const useAsync = <T = undefined>(initialState?: State<T>) => {
  const typedReducer = (arg1: any, arg2: any) => asyncReducer<T>(arg1, arg2);
  const [state, unsafeDispatch] = useReducer(typedReducer, {
    status: EnumStatus.Idle,
    ...initialState,
  });

  const dispatch = useSafeDispatch<Action<T>>(unsafeDispatch);

  const { data, error, status } = state;

  const run = useCallback(
    (promise: Promise<T>) => {
      dispatch({ type: EnumStatus.Pending });
      promise.then(
        (dataReceived: T) => {
          dispatch({
            type: EnumStatus.Resolved,
            data: dataReceived,
          });
        },
        (error: Error) => {
          dispatch({ type: EnumStatus.Rejected, error });
        }
      );
    },
    [dispatch]
  );

  const setData = useCallback(
    (data: T) => dispatch({ type: EnumStatus.Resolved, data }),
    [dispatch]
  );

  const setError = useCallback(
    (error: Error) => dispatch({ type: EnumStatus.Rejected, error }),
    [dispatch]
  );

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  };
};

export default useAsync;
