import { useEffect } from 'react';

// styles
import styles from './PageRegister.module.scss';

// shared hooks
import { useAsync } from '../../hooks/useAsync';
import { useContextAuth } from '../../providers/ProviderAuth';
import { useContextGlobal } from '../../providers/ProviderGlobal';

// services
import accountService from '../../services/account.service';

// shared components
import FormAuth from '../../components/FormAuth';
import InputAuth from '../../components/InputAuth';
import BtnSubmit from '../../components/BtnSubmit';

const PageRegister = () => {
  const { account } = useContextAuth();
  const [, setGlobal] = useContextGlobal();
  const {
    data: receivedData,
    error,
    status,
    run,
  } = useAsync({
    status: 'idle',
  });

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
      userName: dataFromForm.get('userName'),
      password: dataFromForm.get('password'),
      passwordConfirm: dataFromForm.get('passwordConfirm'),
    };

    run(accountService.register(credentials));
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Registration</h1>

      <FormAuth onSubmit={handleSubmit}>
        <InputAuth id="email" label="Email" type="email" name="email" />
        <InputAuth
          id="username"
          label="Username"
          type="text"
          undertext="* 3-15 characters"
          pattern="^.{3,15}$"
          name="userName"
        />
        <InputAuth
          id="password"
          label="Password"
          type="password"
          undertext="* 8-25 characters"
          pattern="^.{8,25}$"
          name="password"
        />
        <InputAuth
          id="password-confirm"
          label="Confirm the password"
          type="password"
          pattern="^.{8,25}$"
          name="passwordConfirm"
        />
        <BtnSubmit disabled={status === 'pending'}>Register</BtnSubmit>
      </FormAuth>
    </main>
  );
};
export default PageRegister;
