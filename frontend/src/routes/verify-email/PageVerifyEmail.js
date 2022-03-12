import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared hooks
import useQuery from '../../hooks/useQuery';
import { useAsync } from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

const PageVerifyEmail = () => {
  const navigate = useNavigate();
  const {
    data: receivedData,
    error,
    status,
    run,
  } = useAsync({
    status: 'idle',
  });
  const query = useQuery();

  const token = query.get('token');

  useEffect(() => {
    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });

    // don't request server on obviously wrong tokens
    if (!token || token.length !== 80) return;

    run(accountService.verifyEmail(token));
  }, []);

  return (
    <div>
      token={token}
      <div>
        <p>Status: {status}</p>
        <p>Reponse: {JSON.stringify(receivedData)}</p>
        <p>Error: {JSON.stringify(error?.response.data.message)}</p>
      </div>
    </div>
  );
};
export default PageVerifyEmail;
