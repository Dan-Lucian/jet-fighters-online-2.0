import Styles from 'components/PageWrapper/PageWrapper.module.scss';

const PageWrapper = (props: any) => {
  return <div className={Styles.wrapper} {...props} />;
};

export default PageWrapper;
