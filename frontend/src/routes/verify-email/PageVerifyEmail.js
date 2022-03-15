import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// shared hooks
import useQuery from '../../hooks/useQuery';
import { useAsync } from '../../hooks/useAsync';

// services
import accountService from '../../services/account.service';

// shared components
import PageNonexistent from '../../components/PageNonexistent';
import Loader from '../../components/Loader';

// styles
import styles from './PageVerifyEmail.module.scss';

const PageVerifyEmail = () => {
  const tokenSaved = useRef();
  const navigate = useNavigate();
  const { status, run } = useAsync({
    status: 'idle',
  });
  const query = useQuery();

  const token = query.get('token');
  if (token) tokenSaved.current = token;

  useEffect(() => {
    // remove token from url to prevent http referer leakage
    navigate(window.location.pathname, { replace: true });

    // don't request server on obviously wrong tokens
    if (!tokenSaved.current || tokenSaved.current.length !== 80) return;

    run(accountService.verifyEmail(tokenSaved.current));
  }, []);

  if (
    !tokenSaved.current ||
    tokenSaved.current.length !== 80 ||
    status === 'rejected'
  )
    return <PageNonexistent />;
  if (status === 'pending') return <Loader />;

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
