import { IFullProfileResponse } from 'modules/Profile/interfaces/IFullProfileResponse';
import { ISemiProfileResponse } from 'modules/Profile/interfaces/ISemiProfileResponse';

enum PropOnlyInFullProfileResponseEnum {
  Created = 'created',
  Email = 'email',
  IsVerified = 'isVerified',
  Role = 'role',
  Updated = 'updated',
}

/**
 * Type guard to check if the response is full.
 * @param {object} response
 * @returns {boolean} true if response is full.
 */
export function isFullProfileResponse(
  response: IFullProfileResponse | ISemiProfileResponse
): response is IFullProfileResponse {
  return PropOnlyInFullProfileResponseEnum.Created in response;
}
