import {ReactNode} from 'react';

// styles
import styles from './Heading.module.scss';

interface IProps {
  children: ReactNode;
}

const Heading = ({ children }: IProps) => (
  <h2 className={styles.heading}>{children}</h2>
);

export default Heading;
