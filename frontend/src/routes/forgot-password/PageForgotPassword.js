import { Link } from 'react-router-dom';

// shared hooks
import { useAsync } from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

// shared components
import FormAuth from '../../components/FormAuth';
import InputAuth from '../../components/InputAuth';
import BtnSubmit from '../../components/BtnSubmit';

// styles
import styles from './PageForgotPassword.module.scss';

const PageForgotPassword = () => {
  const {
    data: receivedData,
    error,
    status,
    run,
  } = useAsync({
    status: 'idle',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataFromForm = new FormData(event.target);

    run(accountService.forgotPassword(dataFromForm.get('email')));
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Recovery</h1>

      <FormAuth onSubmit={handleSubmit}>
        <InputAuth id="email" label="Email" type="email" name="email" />
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
