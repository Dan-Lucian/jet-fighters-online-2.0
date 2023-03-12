import { FormEvent, ReactNode } from 'react';
import Styles from 'modules/Auth/components/AuthForm/AuthForm.module.scss';

interface IAuthFormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({ onSubmit, children }: IAuthFormProps) => (
  <form onSubmit={onSubmit} className={Styles.form}>
    {children}
  </form>
);

export default AuthForm;
