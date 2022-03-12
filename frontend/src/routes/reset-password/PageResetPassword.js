import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import useQuery from '../../hooks/useQuery';
import { useAsync } from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

const PageResetPassword = () => {
  const tokenSaved = useRef(null);
  const query = useQuery();
  const navigate = useNavigate();
  const {
    data: dataReceived,
    error,
    status,
    run,
  } = useAsync({
    status: 'idle',
  });

  useEffect(() => {
    const token = query.get('token');

    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });

    // don't request server on obviously wrong tokens
    if (!token || token.length !== 80) return null;

    tokenSaved.current = token;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataFromForm = new FormData(event.target);

    run(
      accountService.resetPassword({
        password: dataFromForm.get('password'),
        passwordConfirm: dataFromForm.get('passwordConfirm'),
        token: tokenSaved.current,
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            pattern="^.{8,25}$"
          />
          <label htmlFor="password">New password</label>
        </div>
        <div>
          <input
            id="password-confirm"
            name="passwordConfirm"
            type="password"
            autoComplete="new-password"
            pattern="^.{8,25}$"
          />
          <label htmlFor="password-confirm">Confirm new password</label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Status: {status}</p>
        <p>Reponse: {JSON.stringify(dataReceived)}</p>
        <p>Error: {JSON.stringify(error?.response.data.message)}</p>
      </div>
    </div>
  );
};
export default PageResetPassword;
