import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAsync, AsyncStatusEnum } from 'hooks/useAsync2';
import accountService from 'services/account.service';
import FormAuth from 'components/FormAuth/FormAuth';
import InputAuth from 'components/InputAuth/InputAuth';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import { IForgotPasswordResponse } from 'routes/forgot-password/Interfaces/IForgotPasswordResponse';
import Styles from 'routes/forgot-password/ForgotPasswordPage.module.scss';
import { isDefined } from 'utils/GeneralTypeUtils';
import Loader from 'components/Loader/Loader';
import AuthResult from 'components/AuthResult/AuthResult';

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
    const dataFromForm = new FormData(event.currentTarget);
    run(accountService.forgotPassword(dataFromForm.get('email')));
  };

  return (
    <main className={Styles.wrapper}>
      <h1 className={Styles.heading}>Recovery</h1>
      <FormAuth onSubmit={handleSubmit}>
        <InputAuth id="email" label="Email" type="email" name="email" autocomplete="email" />
        <div className={Styles.linksWrapper}>
          <Link to="/login" className={Styles.link}>
            Login
          </Link>
          <Link to="/register" className={Styles.link}>
            Register
          </Link>
        </div>
        <SubmitButton>Recover</SubmitButton>
      </FormAuth>
    </main>
  );
};

const forgotPasswordText = {
  success: 'An email with the next steps has been sent to the aforementioned email address.',
  fail: 'There was an error, please try reseting the password again.',
};

export default ForgotPasswordPage;
