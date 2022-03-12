import { Link } from 'react-router-dom';

// shared hooks
import { useContextAuth } from '../../providers/ProviderAuth';

const PageLogin = () => {
  const { account, login, logout } = useContextAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataFromForm = new FormData(event.target);
    const credentials = {
      email: dataFromForm.get('email'),
      password: dataFromForm.get('password'),
    };

    login(credentials);
  };

  return (
    <main>
      PageLogin
      <div>
        <Link to="/register">Register</Link>
      </div>
      {account && (
        <div>
          <h2>Hello {account.userName}</h2>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {!account && (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div>
            <label htmlFor="email">email:</label>
            <input name="email" id="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">password:</label>
            <input name="password" id="password" type="text" />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </main>
  );
};
export default PageLogin;
