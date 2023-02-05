import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAsync, AsyncStatusEnum } from 'hooks/useAsync2';
import accountService from 'services/account.service';
import FormAuth from 'components/FormAuth/FormAuth';
import InputAuth from 'components/InputAuth/InputAuth';
import BtnSubmit from 'components/BtnSubmit/BtnSubmit';
import { IForgotPasswordResponse } from 'routes/forgot-password/Interfaces/IForgotPasswordResponse';
import Styles from 'routes/forgot-password/ForgotPasswordPage.module.scss';
import { isDefined } from 'utils/GeneralTypeUtils';

const ForgotPasswordPage = () => {
  const { run, status, data: receivedData } = useAsync<IForgotPasswordResponse>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataFromForm = new FormData(event.currentTarget);
    run(accountService.forgotPassword(dataFromForm.get('email')));
  };

  if (isDefined(receivedData)) {
    return (
      <main className={Styles.messageWrapper}>
        <p>An email with instructions has been sent.</p>
        <p>In case there's no email, check your spam section as well.</p>
      </main>
    );
  }

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
        <BtnSubmit disabled={status === AsyncStatusEnum.Pending}>Recover</BtnSubmit>
      </FormAuth>
    </main>
  );
};

export default ForgotPasswordPage;
