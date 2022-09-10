import { Link } from 'react-router-dom';

// shared hooks
import useAsync from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

// shared components
import FormAuth from '../../components/FormAuth/FormAuth';
import InputAuth from '../../components/InputAuth/InputAuth';
import BtnSubmit from '../../components/BtnSubmit/BtnSubmit';

// styles
import styles from './PageForgotPassword.module.scss';
import { FixMeLater } from 'types/FixMeLater';

const PageForgotPassword = () => {
  const {
    data: receivedData,
    status,
    run,
  }: FixMeLater = useAsync({ status: 'idle', data: [] });

  const handleSubmit = (event: FixMeLater) => {
    event.preventDefault();

    const dataFromForm = new FormData(event.target);

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
        <BtnSubmit disabled={status === 'pending'}>Recover</BtnSubmit>
      </FormAuth>
    </main>
  );
};

export default PageForgotPassword;
