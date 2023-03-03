import { FormEvent, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContextAuth } from 'providers/ProviderAuth';
import { useContextGlobal } from 'providers/ProviderGlobal';
import AuthForm from 'components/AuthForm/AuthForm';
import AuthInput from 'components/AuthInput/AuthInput';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import Loader from 'components/Loader/Loader';
import { FixMeLater } from 'types/FixMeLater';
import { InputTypeEnum } from 'components/AuthInput/enums/InputTypeEnum';
import Styles from 'routes/login/LoginPage.module.scss';

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataFromForm = new FormData(event.currentTarget);
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
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput id="email" label="Email" type={InputTypeEnum.Email} name="email" autocomplete="email" />
        <AuthInput
          id="password"
          label="Password"
          type={InputTypeEnum.Password}
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
        <SubmitButton>Login</SubmitButton>
      </AuthForm>
    </main>
  );
};

export default LoginPage;
