import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useQuery from 'hooks/useQuery';
import { AsyncStatusEnum, useAsync } from 'hooks/useAsync2';
import { AccountService } from 'modules/Auth/services/AccountService';
import AuthForm from 'modules/Auth/components/AuthForm/AuthForm';
import AuthInput from 'modules/Auth/components/AuthInput/AuthInput';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import { isDefined, isNull } from 'utils/generalTypeUtils';
import PageNonexistent from 'components/PageNonexistent/PageNonexistent';
import Loader from 'components/Loader/Loader';
import AuthResult from 'modules/Auth/components/AuthResult/AuthResult';
import { InputTypeEnum } from 'modules/Auth/enums/InputTypeEnum';
import Styles from 'routes/reset-password/ResetPasswordPage.module.scss';
import { ResetPasswordFormInputNameEnum } from './enums/ResetPasswordFormInputNameEnum';
import { IResetPasswordCredentials } from 'modules/Auth/interfaces/IResetPasswordCredentials';
import { RESET_TOKEN_LENGTH } from 'routes/reset-password/config/resetPasswordPageConfig';

// TODO: move auth pages to auth module
const ResetPasswordPage = () => {
  const cachedToken = useRef<string | null>(null);
  const query = useQuery();
  const navigate = useNavigate();
  const { run, status, data: receivedData } = useAsync();

  useEffect(() => {
    cachedToken.current = query.get('token') || null;

    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });
  }, []);

  if (isNull(cachedToken.current) || cachedToken.current.length !== RESET_TOKEN_LENGTH) {
    return <PageNonexistent />;
  }

  if (status === AsyncStatusEnum.Pending) {
    return <Loader />;
  }

  if (status === AsyncStatusEnum.Rejected) {
    return <AuthResult text={resetPasswordText.fail} />;
  }

  if (isDefined(receivedData) && status === AsyncStatusEnum.Resolved) {
    return <AuthResult text={resetPasswordText.success} />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isNull(cachedToken.current)) {
      const formData = new FormData(event.currentTarget);
      const credentials: IResetPasswordCredentials = {
        password: String(formData.get(ResetPasswordFormInputNameEnum.Password)),
        passwordConfirm: String(formData.get(ResetPasswordFormInputNameEnum.ConfirmPassword)),
        token: cachedToken.current,
      };

      run(AccountService.resetPassword(credentials));
    }
  };

  return (
    <main className={Styles.wrapper}>
      <h1 className={Styles.heading}>Reset</h1>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          id="password"
          label="Password"
          type={InputTypeEnum.Password}
          undertext="* 8-25 characters"
          pattern="^.{8,25}$"
          name={ResetPasswordFormInputNameEnum.Password}
        />
        <AuthInput
          id="password-confirm"
          label="Confirm the password"
          type={InputTypeEnum.Password}
          pattern="^.{8,25}$"
          name={ResetPasswordFormInputNameEnum.ConfirmPassword}
        />
        <div className={Styles.linksWrapper}>
          <Link to="/login" className={Styles.link}>
            Login
          </Link>
          <Link to="/register" className={Styles.link}>
            Register
          </Link>
        </div>
        <SubmitButton>Reset password</SubmitButton>
      </AuthForm>
    </main>
  );
};

const resetPasswordText = {
  success: 'Password successfully reset, you can login now.',
  fail: 'There was an error, please try reseting the password again.',
};

export default ResetPasswordPage;
