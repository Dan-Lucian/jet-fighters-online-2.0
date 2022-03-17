/* eslint-disable no-use-before-define */
import { useRef } from 'react';

// config
import { typesJet } from '../../../config/typesJet';

// shared components
import Jet from '../../../components/Jet';

// local components
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

// local hooks
import { useContextSettings } from '../../../providers/ProviderSettings';

// styles
import styles from './Carousel.module.scss';

const Carousel = () => {
  const [, setSettings] = useContextSettings();
  const refWrapperInner = useRef();

  const handleArrowLeft = () => {
    refWrapperInner.current.scrollBy({
      left: -150,
      behavior: 'smooth',
    });
  };

  const handleArrowRight = () => {
    refWrapperInner.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <div className={styles.carousel}>
      <ArrowLeft onClick={handleArrowLeft} />
      <div ref={refWrapperInner} className={styles.wrapperJets}>
        {Object.values(typesJet).map((jet, idx) => (
          <Jet
            imgJet={jet.imgJet}
            onClick={() => setSettings((prev) => ({ ...prev, ...jet }))}
            key={idx}
          />
        ))}
      </div>
      <ArrowRight onClick={handleArrowRight} />
    </div>
  );
};

export default Carousel;
