import { IChildrenProp } from 'interfaces/generalInterfaces';
import Styles from 'routes/index/components/SmallTitle/SmallTitle.module.scss';

const SmallTitle = ({ children }: IChildrenProp) => {
  return <h2 className={Styles.header}>{children}</h2>;
};

export default SmallTitle;
