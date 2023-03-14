import { FormEvent, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'modules/Auth/providers/AuthProvider';
import { useContextGlobal } from 'providers/ProviderGlobal';
import AuthForm from 'modules/Auth/components/AuthForm/AuthForm';
import AuthInput from 'modules/Auth/components/AuthInput/AuthInput';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import Loader from 'components/Loader/Loader';
import { FixMeLater } from 'types/FixMeLater';
import { InputTypeEnum } from 'modules/Auth/enums/InputTypeEnum';
import Styles from 'modules/Auth/components/LoginPage/LoginPage.module.scss';
import { LoginFormInputNameEnum } from './enums/LoginFormInputNameEnum';

// TODO: test login page works
const LoginPage = () => {
  const navigate = useNavigate();
  const { account, login, loading, error } = useAuthContext();
  const [{ pathBeforeLogin }, setGlobal]: FixMeLater = useContextGlobal();

  useLayoutEffect(() => {
    if (account) navigate(pathBeforeLogin || `/profile/${account.userName}`);
  }, [account, navigate]);

  useEffect(() => {
    if (error)
      setGlobal((prev: FixMeLater) => ({
        ...prev,
        msgPopup: error.message,
      }));
  }, [error, setGlobal]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const credentials = {
      email: String(formData.get(LoginFormInputNameEnum.Email)),
      password: String(formData.get(LoginFormInputNameEnum.Password)),
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
        <AuthInput
          id="email"
          label="Email"
          type={InputTypeEnum.Email}
          name={LoginFormInputNameEnum.Email}
          autocomplete="email"
        />
        <AuthInput
          id="password"
          label="Password"
          type={InputTypeEnum.Password}
          undertext="* 8-25 characters"
          pattern="^.{8,25}$"
          name={LoginFormInputNameEnum.Password}
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
