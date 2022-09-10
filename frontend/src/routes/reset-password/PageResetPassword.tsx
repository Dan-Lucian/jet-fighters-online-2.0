import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import useQuery from '../../hooks/useQuery';
import useAsync from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

// shared components
import FormAuth from '../../components/FormAuth/FormAuth';
import InputAuth from '../../components/InputAuth/InputAuth';
import BtnSubmit from '../../components/BtnSubmit/BtnSubmit';

// styles
import styles from './PageResetPassword.module.scss';
import { FixMeLater } from 'types/FixMeLater';

const PageResetPassword = () => {
  const tokenSaved = useRef(null);
  const query = useQuery();
  const navigate = useNavigate();
  const { run }: FixMeLater = useAsync({
    status: 'idle',
    data: [],
  });

  useEffect(() => {
    const token: FixMeLater = query.get('token');

    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });

    // don't request server on obviously wrong tokens
    if (!token || token.length !== 80) return;

    tokenSaved.current = token;
  }, []);

  const handleSubmit = (event: FixMeLater) => {
    event.preventDefault();

    const dataFromForm = new FormData(event.target);

    run(
      accountService.resetPassword({
        password: dataFromForm.get('password'),
        passwordConfirm: dataFromForm.get('passwordConfirm'),
        token: tokenSaved.current,
      })
    );
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Reset</h1>
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

export default PageResetPassword;
