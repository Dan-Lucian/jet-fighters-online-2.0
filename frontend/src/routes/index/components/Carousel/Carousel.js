import { useRef } from 'react';

// config
import { jetTypesConfig } from '../../../../config/jetTypesConfig';

// shared components
import Jet from '../../../../components/Jet/Jet';

// local components
import ArrowLeft from '../ArrowLeft/ArrowLeft';
import ArrowRight from '../ArrowRight/ArrowRight';

// local hooks
import { useContextSettings } from '../../../../providers/ProviderSettings';

// styles
import styles from './Carousel.module.scss';

const Carousel = () => {
  const [, setSettings] = useContextSettings();
  const refWrapperInner = useRef();

  const handleClickArrowLeft = () => {
    refWrapperInner.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const handleClickArrowRight = () => {
    refWrapperInner.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <div className={styles.carousel}>
      <ArrowLeft onClick={handleClickArrowLeft} />
      <div ref={refWrapperInner} className={styles.wrapperJets}>
        {Object.values(jetTypesConfig).map((jet, idx) => (
          <Jet imgJet={jet.imgJet} onClick={() => setSettings((prev) => ({ ...prev, ...jet }))} key={idx} />
        ))}
      </div>
      <ArrowRight onClick={handleClickArrowRight} />
    </div>
  );
};

export default Carousel;
