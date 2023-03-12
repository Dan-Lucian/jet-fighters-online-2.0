import { IJwtTokenContent } from "interfaces/generalInterfaces";

export function authorize(jwtToken?: string) {
  return jwtToken
    ? {
        headers: {
          authorization: `bearer ${jwtToken}`,
        },
      }
    : undefined;
}

export function decodeJwtToken(jwtToken: string): IJwtTokenContent {
  return JSON.parse(atob(jwtToken.split('.')[1])) as IJwtTokenContent;
}