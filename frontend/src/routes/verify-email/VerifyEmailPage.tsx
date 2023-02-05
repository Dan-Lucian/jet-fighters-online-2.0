import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useQuery from 'hooks/useQuery';
import { useAsync, AsyncStatusEnum } from 'hooks/useAsync2';
import accountService from 'services/account.service';
import PageNonexistent from 'components/PageNonexistent/PageNonexistent';
import Loader from 'components/Loader/Loader';
import Styles from 'routes/verify-email/VerifyEmailPage.module.scss';
import { isDefined } from 'utils/GeneralTypeUtils';

const VerifyEmailPage = () => {
  const cachedToken = useRef<string>();
  const navigate = useNavigate();
  const { run, status } = useAsync();
  const query = useQuery();

  cachedToken.current = query.get('token') || '';

  useEffect(() => {
    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });

    // don't request server on obviously wrong tokens
    // if (!tokenSaved.current || tokenSaved.current.length !== 80) return;

    run(accountService.verifyEmail(cachedToken.current));
  }, []);

  if (!isDefined(cachedToken.current) || cachedToken.current.length !== 80 || status === AsyncStatusEnum.Rejected) {
    return <PageNonexistent />;
  }

  if (status === AsyncStatusEnum.Pending) {
    return <Loader />;
  }

  return (
    <main className={Styles.wrapper}>
      <div className={Styles.innerWrapper}>
        Email verified, you can now{' '}
        <Link to="/login" className={Styles.link}>
          login
        </Link>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
