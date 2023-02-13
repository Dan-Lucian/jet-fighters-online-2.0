import Carousel from 'routes/index/components/Carousel/Carousel';
import JetStats from 'routes/index/components/JetStats/JetStats';
import Styles from 'routes/index/components/JetSelectionMenu/JetSelectionMenu.module.scss';

interface IJetSelectionMenuProps {
  isOpen: boolean;
  toggleIsOpen: (forceValue?: boolean) => void;
}

const JetSelectionMenu = ({ isOpen, toggleIsOpen }: IJetSelectionMenuProps) => {
  return (
    <aside className={`${Styles.mainWrapper} ${isOpen && Styles.isOpen}`}>
      <div className={Styles.innerWrapper}>
        <Carousel />
        <JetStats toggleIsOpen={toggleIsOpen} />
      </div>
    </aside>
  );
};

export default JetSelectionMenu;
