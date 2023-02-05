import { ReactNode } from 'react';
import Styles from './Heading.module.scss';

interface IHeadingProps {
  children: ReactNode;
}

const Heading = ({ children }: IHeadingProps) => <h2 className={Styles.heading}>{children}</h2>;

export default Heading;
