import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// shared hooks
import { useContextAuth } from '../../providers/ProviderAuth';

// shared components
import FormAuth from '../../components/FormAuth';
import InputAuth from '../../components/InputAuth';
import BtnSubmit from '../../components/BtnSubmit';
import Loader from '../../components/Loader';

// styles
import styles from './PageLogin.module.scss';
import PageProfile from '../profile/PageProfile';
import { useContextGlobal } from '../../providers/ProviderGlobal';

const PageLogin = () => {
  const { account, login, loading, error } = useContextAuth();
  const [, setGlobal] = useContextGlobal();

  useEffect(() => {
    if (error)
      setGlobal((prev) => ({
        ...prev,
        msgPopup: error?.response.data.message,
      }));
  }, [error]);

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
  if (account) return <PageProfile />;

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
