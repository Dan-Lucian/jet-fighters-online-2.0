import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// shared hooks
import useQuery from '../../hooks/useQuery';
import { useAsync, EnumStatus } from 'hooks/useAsync2';

// services
import accountService from '../../services/account.service';

// shared components
import PageNonexistent from '../../components/PageNonexistent/PageNonexistent';
import Loader from '../../components/Loader/Loader';

// styles
import styles from './PageVerifyEmail.module.scss';

const PageVerifyEmail = () => {
  const tokenSaved = useRef<string>();
  const navigate = useNavigate();
  const { run, status } = useAsync();
  const query = useQuery();

  tokenSaved.current = query.get('token') || '';

  useEffect(() => {
    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });

    // don't request server on obviously wrong tokens
    // if (!tokenSaved.current || tokenSaved.current.length !== 80) return;

    run(accountService.verifyEmail(tokenSaved.current));
  }, []);

  if (
    !tokenSaved.current ||
    tokenSaved.current.length !== 80 ||
    status === EnumStatus.Rejected
  )
    return <PageNonexistent />;
  if (status === EnumStatus.Pending) return <Loader />;

  return (
    <main className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        Email verified, you can now{' '}
        <Link to="/login" className={styles.link}>
          login
        </Link>
      </div>
    </main>
  );
};

export default PageVerifyEmail;
