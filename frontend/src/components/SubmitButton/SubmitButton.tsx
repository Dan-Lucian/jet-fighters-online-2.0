import { ReactNode } from 'react';
import Styles from 'components/SubmitButton/SubmitButton.module.scss';

interface ISubmitButtonProps {
  children: ReactNode;
  disabled?: boolean;
}

const SubmitButton = ({ disabled, children }: ISubmitButtonProps) => {
  return (
    <button disabled={disabled} type="submit" className={Styles.button}>
      {children}
    </button>
  );
};

export default SubmitButton;
