enum JavaScriptTypeEnum {
  Undefined = 'undefined',
  String = 'string',
  Number = 'number',
  BigInt = 'bigint',
  Symbol = 'symbol',
  Function = 'function',
  NullOrObject = 'object',
}

/**
 * Type guard to check if a value is defined.
 * @param {T} value
 * @returns {boolean} true if value is defined.
 */
export function isDefined<T>(value: T | undefined): value is T {
  return typeof value !== JavaScriptTypeEnum.Undefined;
}

/**
 * Type guard to check if a value is not null.
 * @param {T} value
 * @returns {boolean} true if value is not null.
 */
export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}
