import { useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContextAuth } from 'providers/ProviderAuth';
import { useContextGlobal } from 'providers/ProviderGlobal';
import FormAuth from 'components/FormAuth/FormAuth';
import InputAuth from 'components/InputAuth/InputAuth';
import BtnSubmit from 'components/BtnSubmit/BtnSubmit';
import Loader from 'components/Loader/Loader';
import Styles from 'routes/login/LoginPage.module.scss';
import { FixMeLater } from 'types/FixMeLater';

const LoginPage = () => {
  const navigate = useNavigate();
  const { account, login, loading, error }: FixMeLater = useContextAuth();
  const [{ pathBeforeLogin }, setGlobal]: FixMeLater = useContextGlobal();

  useLayoutEffect(() => {
    if (account) navigate(pathBeforeLogin || `/profile/${account.userName}`);
  }, [account, navigate]);

  useEffect(() => {
    if (error)
      setGlobal((prev: FixMeLater) => ({
        ...prev,
        msgPopup: error?.response.data.message,
      }));
  }, [error, setGlobal]);

  const handleSubmit = (event: FixMeLater) => {
    event.preventDefault();
    const dataFromForm = new FormData(event.target);
    const credentials = {
      email: dataFromForm.get('email'),
      password: dataFromForm.get('password'),
    };
    login(credentials);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={Styles.wrapper}>
      <h1 className={Styles.heading}>Login</h1>
      <FormAuth onSubmit={handleSubmit}>
        <InputAuth id="email" label="Email" type="email" name="email" autocomplete="email" />
        <InputAuth
          id="password"
          label="Password"
          type="password"
          undertext="* 8-25 characters"
          pattern="^.{8,25}$"
          name="password"
          autocomplete="current-password"
        />
        <div className={Styles.linksWrapper}>
          <Link to="/register" className={Styles.link}>
            Register
          </Link>
          <Link to="/forgot-password" className={Styles.link}>
            Forgot password
          </Link>
        </div>
        <BtnSubmit>Login</BtnSubmit>
      </FormAuth>
    </main>
  );
};

export default LoginPage;
