import axios from 'axios';
import { ILoginCredentials } from 'modules/Auth/interfaces/ILoginCredentials';
import { IRegisterCredentials } from 'modules/Auth/interfaces/IRegisterCredentials';
import { FixMeLater } from 'types/FixMeLater';
import { authorize, decodeJwtToken } from 'utils/fetchUtils';
import { IResetPasswordCredentials } from '../interfaces/IResetPasswordCredentials';

const ACCOUNT_SERVICE_API = '/accounts';

export class AccountService {
  private _jwtToken?: string;
  private _refreshTokenTimeoutId?: ReturnType<typeof setTimeout>;

  // TODO: make async/await
  // TODO: assign return types to functions
  public static register(registerCredentials: IRegisterCredentials) {
    return axios.post(`${ACCOUNT_SERVICE_API}/register`, registerCredentials).then((response) => response.data);
  }

  public static verifyEmail(token: string) {
    return axios.post(`${ACCOUNT_SERVICE_API}/verify-email`, { token }).then((response) => response.data);
  }

  public static resetPassword({ token, password, passwordConfirm }: IResetPasswordCredentials) {
    return axios
      .post(`${ACCOUNT_SERVICE_API}/reset-password`, { token, password, passwordConfirm })
      .then((response) => response.data);
  }
  public static getManyByUserName(userName: string) {
    return axios.get(`${ACCOUNT_SERVICE_API}/many/${userName}`).then((response) => response.data);
  }

  public static sendFriendRequest(userName: string) {
    console.log(`FRIEND REQUEST SENT TO ${userName}`);
  }

  public login({ email, password }: ILoginCredentials) {
    return axios.post(`${ACCOUNT_SERVICE_API}/authenticate`, { email, password }).then((response) => {
      this._jwtToken = response.data.tokenJwt;
      this._startRefreshTokenTimer();
      return response.data;
    });
  }

  public logout() {
    return axios.post(`${ACCOUNT_SERVICE_API}/revoke-token`, {}, authorize(this._jwtToken)).then((response) => {
      this._jwtToken = undefined;
      this._stopRefreshTokenTimer();
      return response.data;
    });
  }

  public refreshToken() {
    return axios.post(`${ACCOUNT_SERVICE_API}/refresh-token`, {}).then((response) => {
      this._jwtToken = response.data.tokenJwt;
      this._startRefreshTokenTimer();
      return response.data;
    });
  }

  public static forgotPassword(email: string) {
    return axios.post(`${ACCOUNT_SERVICE_API}/forgot-password`, { email }).then((response) => response.data);
  }
  
  public update(id: string, params: FixMeLater) {
    return axios.put(`${ACCOUNT_SERVICE_API}/accounts/${id}`, params, authorize(this._jwtToken));
  }

  public getByUserName(userName: string) {
    return axios.get(`${ACCOUNT_SERVICE_API}/${userName}`, authorize(this._jwtToken)).then((response) => response.data);
  }

  private _startRefreshTokenTimer() {
    if (!this._jwtToken) {
      return;
    }
    const { exp } = decodeJwtToken(this._jwtToken);
    const expires = new Date(exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this._refreshTokenTimeoutId = setTimeout(() => this.refreshToken(), timeout);
  }

  private _stopRefreshTokenTimer() {
    clearTimeout(this._refreshTokenTimeoutId);
  }
}
