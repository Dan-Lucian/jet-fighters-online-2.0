import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// shared hooks
import { useContextAuth } from '../../providers/ProviderAuth';

const PageLogin = () => {
  const navigate = useNavigate();
  const { account, login } = useContextAuth();

  useEffect(() => {
    if (account) navigate('/profile');
  }, []);

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
      <div>
        <Link to="/forgot-password">Forgot password</Link>
      </div>
      <div>
        <Link to="/reset-password">Reset password</Link>
      </div>
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
    </main>
  );
};
export default PageLogin;
