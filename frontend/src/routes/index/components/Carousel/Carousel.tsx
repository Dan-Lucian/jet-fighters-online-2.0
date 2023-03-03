import { useRef } from 'react';
import { jetTypesConfig } from 'config/jetTypesConfig';
import Jet from 'components/Jet/Jet';
import { useContextSettings } from 'providers/ProviderSettings';
import { FixMeLater } from 'types/FixMeLater';
import { isNotNull } from 'utils/generalTypeUtils';
import ArrowButton from 'routes/index/components/ArrowButton/ArrowButton';
import { ArrowDirectionEnum } from 'routes/index/components/ArrowButton/enums/ArrowDirectionEnum';
import Styles from 'routes/index/components/Carousel/Carousel.module.scss';
import { IJetConfig } from 'config/interfaces/IJetConfig';

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
        {Object.values(jetTypesConfig).map((jet: IJetConfig, idx) => (
          <Jet
            jetImageSrc={jet.jetImageSrc}
            onClick={() => setSettings((prev: FixMeLater) => ({ ...prev, ...jet }))}
            key={idx}
          />
        ))}
      </div>
      <ArrowButton direction={ArrowDirectionEnum.Right} onClick={handleClickArrowRight} />
    </div>
  );
};

export default Carousel;
