import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// styles
import styles from './PageRegister.module.scss';

// shared hooks
import { useAsync, EnumStatus } from 'hooks/useAsync2';
import { useContextAuth } from '../../providers/ProviderAuth';
import { useContextGlobal } from '../../providers/ProviderGlobal';

// services
import accountService from '../../services/account.service';

// shared components
import FormAuth from '../../components/FormAuth/FormAuth';
import InputAuth from '../../components/InputAuth/InputAuth';
import BtnSubmit from '../../components/BtnSubmit/BtnSubmit';
import ProfilePage from '../profile/ProfilePage';
import Loader from '../../components/Loader/Loader';

// local
import { FixMeLater } from 'types/FixMeLater';

const PageRegister = () => {
  const { account } = useContextAuth();
  const [, setGlobal] = useContextGlobal();
  const { error, status, run } = useAsync();

  console.log('error: ', error);

  // TODO: somehow extract message from error
  // either by changing the error type or making the message from server
  // an actual error
  useEffect(() => {
    if (error)
      setGlobal((prev: FixMeLater) => ({
        ...prev,
        msgPopup: error,
        // msgPopup: error?.response.data.message,
      }));
  }, [error]);

  const handleSubmit = (event: FixMeLater) => {
    event.preventDefault();

    const dataFromForm = new FormData(event.target);
    const credentials = {
      email: dataFromForm.get('email'),
      userName: dataFromForm.get('userName'),
      password: dataFromForm.get('password'),
      passwordConfirm: dataFromForm.get('passwordConfirm'),
    };

    run(accountService.register(credentials));
  };

  if (account) return <ProfilePage />;
  if (status === EnumStatus.Pending) return <Loader />;
  if (status === EnumStatus.Resolved)
    return (
      <main className={styles.wrapper}>
        <div className={styles.wrapperInner}>
          <p>Account created.</p>
          <p>We've sent an activation link to the specified email.</p>
          <p>If the email does not appear even after 5 minutes then check the spam section as well.</p>
        </div>
      </main>
    );

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Registration</h1>
      <FormAuth onSubmit={handleSubmit}>
        <InputAuth id="email" label="Email" type="email" name="email" autocomplete="email" />
        <InputAuth
          id="username"
          label="Username"
          type="text"
          undertext="* 3-15 characters"
          pattern="^.{3,15}$"
          name="userName"
          autocomplete="username"
        />
        <InputAuth
          id="password"
          label="Password"
          type="password"
          undertext="* 8-25 characters"
          pattern="^.{8,25}$"
          name="password"
          autocomplete="new-password"
        />
        <InputAuth
          id="password-confirm"
          label="Confirm the password"
          type="password"
          pattern="^.{8,25}$"
          name="passwordConfirm"
          autocomplete="new-password"
        />
        <div className={styles.wrapperLinks}>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
          <Link to="/forgot-password" className={styles.link}>
            Forgot password
          </Link>
        </div>
        <BtnSubmit>Register</BtnSubmit>
      </FormAuth>
    </main>
  );
};

export default PageRegister;
