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

/**
 * Type guard to check if a value is of string type.
 * @param {T} value
 * @returns {boolean} true if value is of string type.
 */
export function isString<T>(value: T | undefined): value is T {
  return typeof value !== JavaScriptTypeEnum.String;
}

/**
 * Type guard to check if an object has a certain key.
 * @param {T} object
 * @param {PropertyKey} key
 * @returns {boolean} true if object has the key.
 */
export function hasObjectKey<T>(object: T, key: PropertyKey): key is keyof T {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * Type guard to check if a value is an array with at least one value.
 * @param {any} value
 * @returns {boolean} true if value is a non-empty array.
 */
export function isDefinedArray<T>(value: any): value is T[] {
  return Array.isArray(value) && value.length > 0;
}