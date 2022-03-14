// shared hooks
import { useNavigate } from 'react-router-dom';
import { useContextAuth } from '../../providers/ProviderAuth';

// shared components
import PageNonexistent from '../../components/PageNonexistent';

const PageProfile = () => {
  const navigate = useNavigate();
  const { account, logout } = useContextAuth();

  if (!account) return <PageNonexistent />;

  const handleClick = () => {
    navigate('/');
    logout();
  };

  return (
    <main>
      <h1>Hello {account.userName}</h1>
      <button onClick={handleClick} type="button">
        Log out
      </button>
    </main>
  );
};

export default PageProfile;
