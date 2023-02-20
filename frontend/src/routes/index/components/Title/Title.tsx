import { IChildrenProp } from 'interfaces/GeneralInterfaces';
import Styles from 'routes/index/components/Title/Title.module.scss';

const Title = ({ children }: IChildrenProp) => {
  return <h1 className={Styles.header}>{children}</h1>;
};

export default Title;
