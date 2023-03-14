import Styles from 'modules/Game/components/Header/Header.module.scss';

interface IHeaderProps {
  text: string;
}

const Header = ({ text }: IHeaderProps) => {
  return <h2 className={Styles.header}>{text}</h2>;
};

export default Header;
