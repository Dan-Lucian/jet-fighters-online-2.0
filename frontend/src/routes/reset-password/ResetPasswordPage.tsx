import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuery from 'hooks/useQuery';
import { AsyncStatusEnum, useAsync } from 'hooks/useAsync2';
import accountService from 'services/account.service';
import FormAuth from 'components/FormAuth/FormAuth';
import InputAuth from 'components/InputAuth/InputAuth';
import BtnSubmit from 'components/BtnSubmit/BtnSubmit';
import Styles from 'routes/reset-password/ResetPasswordPage.module.scss';
import { isDefined } from 'utils/GeneralTypeUtils';
import PageNonexistent from 'components/PageNonexistent/PageNonexistent';
import Loader from 'components/Loader/Loader';

// TODO: URGENT make reset password logic work
const ResetPasswordPage = () => {
  const cachedToken = useRef<string>();
  const query = useQuery();
  const navigate = useNavigate();
  const { run, status } = useAsync();

  useEffect(() => {
    const token = query.get('token') || '';

    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });

    // don't request server on obviously wrong tokens
    if (!token || token.length !== 80) {
      return;
    }

    cachedToken.current = token;
  }, []);

  if (!isDefined(cachedToken.current) || cachedToken.current.length !== 80 || status === AsyncStatusEnum.Rejected) {
    return <PageNonexistent />;
  }

  if (status === AsyncStatusEnum.Pending) {
    return <Loader />;
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

  // TODO: add links under inputs
  // TODO: make reset page inaccessible
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
        <BtnSubmit>Reset password</BtnSubmit>
      </FormAuth>
    </main>
  );
};

export default ResetPasswordPage;
