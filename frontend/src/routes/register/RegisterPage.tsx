import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAsync, AsyncStatusEnum } from 'hooks/useAsync2';
import { useContextAuth } from 'providers/ProviderAuth';
import { useContextGlobal } from 'providers/ProviderGlobal';
import accountService from 'services/account.service';
import FormAuth from 'components/FormAuth/FormAuth';
import InputAuth from 'components/InputAuth/InputAuth';
import BtnSubmit from 'components/BtnSubmit/BtnSubmit';
import ProfilePage from 'routes/profile/ProfilePage';
import Loader from 'components/Loader/Loader';
import { FixMeLater } from 'types/FixMeLater';
import Styles from 'routes/register/RegisterPage.module.scss';

const RegisterPage = () => {
  const { account }: FixMeLater = useContextAuth();
  const [, setGlobal] = useContextGlobal();
  const { error, status, run }: FixMeLater = useAsync();

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

  if (account) {
    return <ProfilePage />;
  }

  if (status === AsyncStatusEnum.Pending) {
    return <Loader />;
  }

  if (status === AsyncStatusEnum.Resolved) {
    return (
      <main className={Styles.wrapper}>
        <div className={Styles.innerWrapper}>
          <p>Account created.</p>
          <p>We've sent an activation link to the specified email.</p>
          <p>If the email does not appear even after 5 minutes then check the spam section as well.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={Styles.wrapper}>
      <h1 className={Styles.heading}>Registration</h1>
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
        <div className={Styles.linksWrapper}>
          <Link to="/login" className={Styles.link}>
            Login
          </Link>
          <Link to="/forgot-password" className={Styles.link}>
            Forgot password
          </Link>
        </div>
        <BtnSubmit>Register</BtnSubmit>
      </FormAuth>
    </main>
  );
};

export default RegisterPage;
