import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useQuery from 'hooks/useQuery';
import { AsyncStatusEnum, useAsync } from 'hooks/useAsync2';
import accountService from 'services/account.service';
import FormAuth from 'components/FormAuth/FormAuth';
import InputAuth from 'components/InputAuth/InputAuth';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import Styles from 'routes/reset-password/ResetPasswordPage.module.scss';
import { isDefined } from 'utils/GeneralTypeUtils';
import PageNonexistent from 'components/PageNonexistent/PageNonexistent';
import Loader from 'components/Loader/Loader';
import AuthResult from 'components/AuthResult/AuthResult';

const ResetPasswordPage = () => {
  const cachedToken = useRef<string | null>(null);
  const query = useQuery();
  const navigate = useNavigate();
  const { run, status, data: receivedData } = useAsync();

  useEffect(() => {
    cachedToken.current = query.get('token') || '';

    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });
  }, []);

  if (!cachedToken.current || cachedToken.current.length !== 80) {
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
    const dataFromForm = new FormData(event.currentTarget);
    run(
      accountService.resetPassword({
        password: dataFromForm.get('password'),
        passwordConfirm: dataFromForm.get('passwordConfirm'),
        token: cachedToken.current,
      })
    );
  };

  return (
    <main className={Styles.wrapper}>
      <h1 className={Styles.heading}>Reset</h1>
      <FormAuth onSubmit={handleSubmit}>
        <InputAuth
          id="password"
          label="Password"
          type="password"
          undertext="* 8-25 characters"
          pattern="^.{8,25}$"
          name="password"
        />
        <InputAuth
          id="password-confirm"
          label="Confirm the password"
          type="password"
          pattern="^.{8,25}$"
          name="passwordConfirm"
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
      </FormAuth>
    </main>
  );
};

const resetPasswordText = {
  success: 'Password successfully reset, you can login now.',
  fail: 'There was an error, please try reseting the password again.',
};

export default ResetPasswordPage;
