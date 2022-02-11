/* eslint-disable no-use-before-define */

// local components
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import Jet from './Jet';

// local hooks
import { useJet } from './ProviderJet';

import styles from './Carousel.module.scss';

const Carousel = () => {
  const [, setJet] = useJet();

  return (
    <div className={styles.carousel}>
      <ArrowLeft />
      <div className={styles.containerJets}>
        {jets.map((jet, idx) => (
          <Jet onClick={() => setJet(jet)} key={idx} />
        ))}
      </div>
      <ArrowRight />
    </div>
  );
};

const jets = [
  { type: 'speedster' },
  { type: 'trickster' },
  { type: 'tank' },
  { type: '4' },
  { type: '5' },
  { type: '6' },
  { type: '7' },
  { type: '8' },
  { type: '9' },
];

export default Carousel;
