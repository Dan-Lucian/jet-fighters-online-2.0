import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

// shared hooks
import { useAsync, EnumStatus } from 'hooks/useAsync2';

// services
import accountService from '../../services/account.service';

// shared components
import FormAuth from '../../components/FormAuth/FormAuth';
import InputAuth from '../../components/InputAuth/InputAuth';
import BtnSubmit from '../../components/BtnSubmit/BtnSubmit';

// local
import IResponseForgotPassword from './Interfaces/IResponseForgotPassword';

// styles
import styles from './PageForgotPassword.module.scss';

const PageForgotPassword = () => {
  const {
    run,
    status,
    data: receivedData,
  } = useAsync<IResponseForgotPassword>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataFromForm = new FormData(event.currentTarget);

    run(accountService.forgotPassword(dataFromForm.get('email')));
  };

  if (receivedData)
    return (
      <main className={styles.wrapperMsg}>
        <p>An email with instructions has been sent.</p>
        <p>In case there's no email, check your spam section as well.</p>
      </main>
    );

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Recovery</h1>
      <FormAuth onSubmit={handleSubmit}>
        <InputAuth
          id="email"
          label="Email"
          type="email"
          name="email"
          autocomplete="email"
        />
        <div className={styles.wrapperLinks}>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </div>
        <BtnSubmit disabled={status === EnumStatus.Pending}>Recover</BtnSubmit>
      </FormAuth>
    </main>
  );
};

export default PageForgotPassword;
