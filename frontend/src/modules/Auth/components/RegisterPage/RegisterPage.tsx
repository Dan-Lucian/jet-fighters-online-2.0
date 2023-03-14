import { FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAsync, AsyncStatusEnum } from 'hooks/useAsync2';
import { useAuthContext } from 'modules/Auth/providers/AuthProvider';
import { useContextGlobal } from 'providers/ProviderGlobal';
import { AccountService } from 'modules/Auth/services/AccountService';
import AuthForm from 'modules/Auth/components/AuthForm/AuthForm';
import AuthInput from 'modules/Auth/components/AuthInput/AuthInput';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import ProfilePage from 'routes/profile/ProfilePage';
import Loader from 'components/Loader/Loader';
import { FixMeLater } from 'types/FixMeLater';
import { InputTypeEnum } from 'modules/Auth/enums/InputTypeEnum';
import Styles from 'modules/Auth/components/RegisterPage/RegisterPage.module.scss';
import { RegisterFormInputNameEnum } from 'modules/Auth/components/RegisterPage/enums/RegisterFormInputNameEnum';
import { IRegisterCredentials } from 'modules/Auth/interfaces/IRegisterCredentials';
import { isDefined } from 'utils/generalTypeUtils';

const RegisterPage = () => {
  const { account } = useAuthContext();
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const credentials: IRegisterCredentials = {
      email: String(formData.get(RegisterFormInputNameEnum.Email)),
      userName: String(formData.get(RegisterFormInputNameEnum.UserName)),
      password: String(formData.get(RegisterFormInputNameEnum.Password)),
      passwordConfirm: String(formData.get(RegisterFormInputNameEnum.ConfirmPassword)),
    };

    run(AccountService.register(credentials));
  };

  if (isDefined(account)) {
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
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          id="email"
          label="Email"
          type={InputTypeEnum.Email}
          name={RegisterFormInputNameEnum.Email}
          autocomplete="email"
        />
        <AuthInput
          id="username"
          label="Username"
          type={InputTypeEnum.Text}
          undertext="* 3-15 characters"
          pattern="^.{3,15}$"
          name={RegisterFormInputNameEnum.UserName}
          autocomplete="username"
        />
        <AuthInput
          id="password"
          label="Password"
          type={InputTypeEnum.Password}
          undertext="* 8-25 characters"
          pattern="^.{8,25}$"
          name={RegisterFormInputNameEnum.Password}
          autocomplete="new-password"
        />
        <AuthInput
          id="password-confirm"
          label="Confirm the password"
          type={InputTypeEnum.Password}
          pattern="^.{8,25}$"
          name={RegisterFormInputNameEnum.ConfirmPassword}
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
        <SubmitButton>Register</SubmitButton>
      </AuthForm>
    </main>
  );
};

export default RegisterPage;
