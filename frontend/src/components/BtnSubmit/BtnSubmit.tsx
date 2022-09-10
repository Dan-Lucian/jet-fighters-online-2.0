import { ReactNode } from 'react';

// styles
import styles from './BtnSubmit.module.scss';

interface Props {
  children: ReactNode;
  disabled?: boolean;
}

const BtnSubmit = ({ disabled, children }: Props) => (
  <button disabled={disabled} type="submit" className={styles.btn}>
    {children}
  </button>
);

export default BtnSubmit;
