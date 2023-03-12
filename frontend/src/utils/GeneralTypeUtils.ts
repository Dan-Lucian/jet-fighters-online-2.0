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
 * Type guard to check if a value is null.
 * @param {any} value
 * @returns {boolean} true if value is null.
 */
export function isNull(value: any): value is null {
  return value === null;
}

/**
 * Type guard to check if a value is of string type.
 * @param {T} value
 * @returns {boolean} true if value is of string type.
 */
export function isString(value: any): value is string {
  return typeof value === JavaScriptTypeEnum.String;
}

/**
 * Type guard to check if a value is of string type and has at least 1 char.
 * @param {T} value
 * @returns {boolean} true if value is of string type and has at least 1 char.
 */
export function isStringDefined(value: any): value is string {
  return isString(value) && value.length > 0;
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
 * Type guard to check if result of `new FormData()` is an object with defined props.
 * @param {any} value
 * @returns {boolean}
 */
export function isFormDataDefined(value: any): value is { [key: string]: string } {
  return Object.values(value).every((v) => isStringDefined(v));
}
