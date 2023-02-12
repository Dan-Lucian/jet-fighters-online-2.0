/**
 * Returns a promise which resolves after a configurable amount of time.
 * @param {number} ms time in miliseconds.
 * @returns {Promise} promise.
 */
export function delay(ms: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Capitalizes a string.
 * @param {string} string
 * @returns {string} capitalized string.
 */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// -----------------------------------------------------------------------------
// Error utils
type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

/**
 * Extracts the error message.
 * @param {unknown} error the error.
 * @returns {string} the error message.
 */
export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message;
}
