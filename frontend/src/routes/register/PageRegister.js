import { useContextAuth } from '../../providers/ProviderAuth';

// shared hooks
import { useAsync } from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

const PageRegister = () => {
  const { account } = useContextAuth();
  const {
    data: receivedData,
    error,
    status,
    run,
  } = useAsync({
    status: 'idle',
  });

  console.log('ACCOUNT: ', account);
  console.log('ERROR: ', error);

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
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">username:</label>
          <input name="userName" id="userName" type="text" />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <input name="email" id="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input name="password" id="password" type="text" />
        </div>
        <div>
          <label htmlFor="passwordConfirm">passwordConfirm:</label>
          <input name="passwordConfirm" id="passwordConfirm" type="text" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>Status: {status}</p>
      <p>Reponse: {JSON.stringify(receivedData)}</p>
      <p>Error: {JSON.stringify(error?.response.data.message)}</p>
    </main>
  );
};
export default PageRegister;
