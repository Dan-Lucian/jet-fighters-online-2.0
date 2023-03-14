import { IChildrenProp } from 'interfaces/generalInterfaces';
import Styles from 'modules/AboutPage/components/Heading/Heading.module.scss';

const Heading = ({ children }: IChildrenProp) => {
  return <h2 className={Styles.heading}>{children}</h2>;
};

export default Heading;
