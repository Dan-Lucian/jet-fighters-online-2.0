/* eslint-disable no-shadow */
import { useCallback, useReducer } from 'react';
import useSafeDispatch from './useSafeDispatch';

const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

/**
 * Monitors an async promise. Pass your promise to the 'run'
 * returned function.
 *
 * @param {{status, data}} initialState object with initial status and data.
 *
 * @returns {object} {setData, setError, error, status, data, run}.
 * @returns status can be 'idle', 'pending', 'resolved', 'rejected'.
 */
const useAsync = (initialState) => {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = useCallback(
    (promise) => {
      dispatch({ type: 'pending' });
      promise.then(
        (receivedData) => {
          dispatch({ type: 'resolved', data: receivedData });
        },
        (error) => {
          dispatch({ type: 'rejected', error });
        }
      );
    },
    [dispatch]
  );

  const setData = useCallback(
    (data) => dispatch({ type: 'resolved', data }),
    [dispatch]
  );
  const setError = useCallback(
    (error) => dispatch({ type: 'rejected', error }),
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
