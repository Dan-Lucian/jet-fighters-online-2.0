import { useRef } from 'react';
import { jetTypesConfig } from 'config/jetTypesConfig';
import Jet from 'components/Jet/Jet';
import { useContextSettings } from 'providers/ProviderSettings';
import { FixMeLater } from 'types/FixMeLater';
import { isNotNull } from 'utils/GeneralTypeUtils';
import ArrowButton from 'routes/index/components/ArrowButton/ArrowButton';
import { ArrowDirectionEnum } from 'routes/index/components/ArrowButton/enums/ArrowDirectionEnum';
import Styles from 'routes/index/components/Carousel/Carousel.module.scss';

const Carousel = () => {
  const [, setSettings]: FixMeLater = useContextSettings();
  const refWrapperInner = useRef<HTMLDivElement>(null);

  const handleClickArrowLeft = () => {
    if (isNotNull(refWrapperInner.current)) {
      refWrapperInner.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const handleClickArrowRight = () => {
    if (isNotNull(refWrapperInner.current)) {
      refWrapperInner.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  return (
    <div className={Styles.mainWrapper}>
      <ArrowButton direction={ArrowDirectionEnum.Left} onClick={handleClickArrowLeft} />
      <div ref={refWrapperInner} className={Styles.jetsWrapper}>
        {Object.values(jetTypesConfig).map((jet, idx) => (
          <Jet imgJet={jet.imgJet} onClick={() => setSettings((prev: FixMeLater) => ({ ...prev, ...jet }))} key={idx} />
        ))}
      </div>
      <ArrowButton direction={ArrowDirectionEnum.Right} onClick={handleClickArrowRight} />
    </div>
  );
};

export default Carousel;
