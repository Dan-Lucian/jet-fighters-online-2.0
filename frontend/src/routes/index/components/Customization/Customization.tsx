import Title from 'routes/index/components/Title/Title';
import Settings from 'routes/index/components/Settings/Settings';
import JetSelected from 'routes/index/components/JetSelected/JetSelected';
import Styles from 'routes/index/components/Customization/Customization.module.scss';

const Customization = () => (
  <div className={Styles.mainWrapper}>
    <div className={Styles.mediumWrapper}>
      <Title>Customize your game</Title>
      <div className={Styles.innerWrapper}>
        <Settings />
        <JetSelected />
      </div>
    </div>
  </div>
);

export default Customization;
