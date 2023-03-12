import { Link } from 'react-router-dom';
import Styles from 'modules/Auth/components/AuthResult/AuthResult.module.scss';

interface IAuthResultProps {
  text: string;
}

const AuthResult = ({ text }: IAuthResultProps) => {
  return (
    <main className={Styles.wrapper}>
      <span className={Styles.heading}>{text}</span>
      <div className={Styles.linksWrapper}>
        <Link to="/login" className={Styles.link}>
          Login
        </Link>
        <Link to="/forgot-password" className={Styles.link}>
          Forgot password
        </Link>
      </div>
    </main>
  );
};

export default AuthResult;
