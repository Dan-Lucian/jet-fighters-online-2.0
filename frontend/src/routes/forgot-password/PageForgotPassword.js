// shared hooks
import { useAsync } from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

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
    <main>
      <h1>Forgot password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="text" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Status: {status}</p>
        <p>Reponse: {JSON.stringify(receivedData)}</p>
        <p>Error: {JSON.stringify(error?.response.data.message)}</p>
      </div>
    </main>
  );
};

export default PageForgotPassword;
