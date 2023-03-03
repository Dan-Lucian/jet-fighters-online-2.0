import Styles from 'components/ErrorRouteFallback/ErrorRouteFallback.module.scss';

interface IErrorRouteFallbackProps {
  error: Error;
}

const ErrorRouteFallback = ({ error }: IErrorRouteFallbackProps) => {
  return (
    <div className={Styles.wrapper} role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

export default ErrorRouteFallback;
