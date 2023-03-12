import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAsync, AsyncStatusEnum } from 'hooks/useAsync2';
import AuthForm from 'modules/Auth/components/AuthForm/AuthForm';
import AuthInput from 'modules/Auth/components/AuthInput/AuthInput';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import { IForgotPasswordResponse } from 'routes/forgot-password/Interfaces/IForgotPasswordResponse';
import { isDefined } from 'utils/generalTypeUtils';
import Loader from 'components/Loader/Loader';
import AuthResult from 'modules/Auth/components/AuthResult/AuthResult';
import { InputTypeEnum } from 'modules/Auth/enums/InputTypeEnum';
import Styles from 'routes/forgot-password/ForgotPasswordPage.module.scss';
import { AccountService } from 'modules/Auth/services/AccountService';
import { ForgotPasswordFormInputNameEnum } from './enums/ForgotPasswordFormInputNameEnum';

const ForgotPasswordPage = () => {
  const { run, status, data: receivedData } = useAsync<IForgotPasswordResponse>();

  if (status === AsyncStatusEnum.Pending) {
    return <Loader />;
  }

  if (status === AsyncStatusEnum.Rejected) {
    return <AuthResult text={forgotPasswordText.fail} />;
  }

  if (isDefined(receivedData) && status === AsyncStatusEnum.Resolved) {
    return <AuthResult text={forgotPasswordText.success} />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get(ForgotPasswordFormInputNameEnum.Email));

    run(AccountService.forgotPassword(email));
  };

  return (
    <main className={Styles.wrapper}>
      <h1 className={Styles.heading}>Recovery</h1>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          id="email"
          label="Email"
          type={InputTypeEnum.Email}
          name={ForgotPasswordFormInputNameEnum.Email}
          autocomplete="email"
        />
        <div className={Styles.linksWrapper}>
          <Link to="/login" className={Styles.link}>
            Login
          </Link>
          <Link to="/register" className={Styles.link}>
            Register
          </Link>
        </div>
        <SubmitButton>Recover</SubmitButton>
      </AuthForm>
    </main>
  );
};

const forgotPasswordText = {
  success: 'An email with the next steps has been sent to the aforementioned email address.',
  fail: 'There was an error, please try reseting the password again.',
};

export default ForgotPasswordPage;
