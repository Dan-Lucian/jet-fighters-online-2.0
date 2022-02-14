/* eslint-disable no-use-before-define */
import { useRef } from 'react';

// local components
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import Jet from './Jet';

// local hooks
import { useSettings } from '../../../providers/ProviderSettings';

import styles from './Carousel.module.scss';

const Carousel = () => {
  const [, setSettings] = useSettings();
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
        {jets.map((jet, idx) => (
          <Jet
            onClick={() => setSettings((prev) => ({ ...prev, ...jet }))}
            key={idx}
          />
        ))}
      </div>
      <ArrowRight onClick={handleArrowRight} />
    </div>
  );
};

const jets = [
  { typeJet: 'speedster' },
  { typeJet: 'trickster' },
  { typeJet: 'tank' },
  { typeJet: '4' },
  { typeJet: '5' },
  { typeJet: '6' },
  { typeJet: '7' },
  { typeJet: '8' },
  { typeJet: '9' },
];

export default Carousel;
