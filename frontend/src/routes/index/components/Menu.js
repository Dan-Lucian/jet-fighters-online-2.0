// local components
import BtnCreate from './BtnCreate';
import BtnJoin from './BtnJoin';
import StatusWs from './StatusWs';
import FormId from './FormId';
import Customization from './Customization';

import styles from './Menu.module.scss';

const Menu = () => (
  <main className={styles.menu}>
    <BtnCreate />
    <BtnJoin />
    <StatusWs />
    <FormId />
    <Customization />
  </main>
);

export default Menu;
