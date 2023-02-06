import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuery from 'hooks/useQuery';
import { useAsync, AsyncStatusEnum } from 'hooks/useAsync2';
import accountService from 'services/account.service';
import PageNonexistent from 'components/PageNonexistent/PageNonexistent';
import Loader from 'components/Loader/Loader';
import AuthResult from 'components/AuthResult/AuthResult';

const VerifyEmailPage = () => {
  const cachedToken = useRef<string | null>(null);
  const navigate = useNavigate();
  const { run, status } = useAsync();
  const query = useQuery();
  console.log('status: ', status);

  cachedToken.current = query.get('token') || '';

  useEffect(() => {
    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });

    // don't request server on obviously wrong tokens
    if (!cachedToken.current || cachedToken.current.length !== 80) return;

    run(accountService.verifyEmail(cachedToken.current));
  }, []);

  if (status === AsyncStatusEnum.Pending) {
    return <Loader />;
  }

  if (status === AsyncStatusEnum.Resolved) {
    return <AuthResult text={verifyEmailText.success} />;
  }

  if (status === AsyncStatusEnum.Rejected) {
    return <AuthResult text={verifyEmailText.fail} />;
  }

  return <PageNonexistent />;
};

const verifyEmailText = {
  success: 'Email verified, you can login now.',
  fail: 'There was an error verifying the account, please try again.',
};

export default VerifyEmailPage;
