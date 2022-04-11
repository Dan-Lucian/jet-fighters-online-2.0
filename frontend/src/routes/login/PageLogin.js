import { useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// shared hooks
import { useContextAuth } from '../../providers/ProviderAuth';
import { useContextGlobal } from '../../providers/ProviderGlobal';

// shared components
import FormAuth from '../../components/FormAuth/FormAuth';
import InputAuth from '../../components/InputAuth/InputAuth';
import BtnSubmit from '../../components/BtnSubmit/BtnSubmit';
import Loader from '../../components/Loader/Loader';

// styles
import styles from './PageLogin.module.scss';

const PageLogin = () => {
  const navigate = useNavigate();
  const { account, login, loading, error } = useContextAuth();
  const [{ pathBeforeLogin }, setGlobal] = useContextGlobal();

  useLayoutEffect(() => {
    if (account) navigate(pathBeforeLogin || `/profile/${account.userName}`);
  }, [account, navigate]);

  useEffect(() => {
    if (error)
      setGlobal((prev) => ({
        ...prev,
        msgPopup: error?.response.data.message,
      }));
  }, [error, setGlobal]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataFromForm = new FormData(event.target);
    const credentials = {
      email: dataFromForm.get('email'),
      password: dataFromForm.get('password'),
    };

    login(credentials);
  };

  if (loading) return <Loader />;

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Login</h1>
      <FormAuth onSubmit={handleSubmit}>
        <InputAuth id="email" label="Email" type="email" name="email" />
        <InputAuth
          id="password"
          label="Password"
          type="password"
          undertext="* 8-25 characters"
          pattern="^.{8,25}$"
          name="password"
        />
        <div className={styles.wrapperLinks}>
          <Link to="/register" className={styles.link}>
            Register
          </Link>
          <Link to="/forgot-password" className={styles.link}>
            Forgot password
          </Link>
        </div>
        <BtnSubmit>Login</BtnSubmit>
      </FormAuth>
    </main>
  );
};

export default PageLogin;
