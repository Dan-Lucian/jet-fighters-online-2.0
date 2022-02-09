/* eslint-disable no-use-before-define */

// local components
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import Jet from './Jet';

import styles from './Carousel.module.scss';

const Carousel = () => (
  <div className={styles.carousel}>
    <ArrowLeft />
    <div className={styles.containerJets}>
      {jets.map((jet, idx) => (
        <Jet stats={jet} key={idx} />
      ))}
    </div>
    <ArrowRight />
  </div>
);

const jets = [
  { type: 'speedster' },
  { type: 'trickster' },
  { type: 'tank' },
  { type: 'balanced' },
  { type: 'balanced' },
  { type: 'balanced' },
  { type: 'balanced' },
  { type: 'balanced' },
  { type: 'balanced' },
];

export default Carousel;
