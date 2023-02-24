import Styles from 'components/Loader/Loader.module.scss';

const Loader = (props: any) => {
  return (
    <div className={Styles.wrapper} {...props}>
      <div className={Styles.loader}>Loading...</div>
    </div>
  );
};

export default Loader;
